use std::{
    path::{Path, PathBuf},
    process::Command,
};

use eyre::{bail, Context, OptionExt, Result};
use tracing::{info, warn};

use crate::{
    game::{
        platform::{Platform, Steam},
        Game,
    },
    prefs::Prefs,
    util::fs::PathExt,
};

pub fn create_launch_command(
    game_dir: &Path,
    platform: Platform,
    game: Game,
    prefs: &Prefs,
) -> Result<Option<Command>> {
    match platform {
        Platform::Steam => create_steam_command(game_dir, game, prefs).map(Some),
        Platform::EpicGames => create_epic_command(game).map(Some),
        _ => Ok(None),
    }
}

#[allow(unused_variables)] // allow unused game_dir on windows
fn create_steam_command(game_dir: &Path, game: Game, prefs: &Prefs) -> Result<Command> {
    let Some(steam) = &game.platforms.steam else {
        bail!("{} is not available on Steam", game.name)
    };

    #[cfg(target_os = "linux")]
    if let Some(proxy_dll) = game.mod_loader.proxy_dll() {
        use super::linux;
        use tracing::warn;

        if linux::is_proton(game_dir).unwrap_or_else(|err| {
            warn!("failed to determine if game uses proton: {:#}", err);
            false
        }) {
            linux::ensure_wine_override(steam.id as u64, proxy_dll, game_dir).unwrap_or_else(
                |err| {
                    warn!("failed to ensure wine dll override: {:#}", err);
                },
            );
        }
    }

    let mut command = create_base_steam_command()?;
    command.arg("-applaunch").arg(steam.id.to_string());

    Ok(command)
}

#[cfg(target_os = "windows")]
fn create_base_steam_command() -> Result<Command> {
    use tracing::warn;

    let path = match read_steam_registry() {
        Ok(install_dir) => {
            let exe_path = install_dir.join("steam.exe");

            info!(
                "read steam installation path from registry: {}",
                exe_path.display()
            );

            exe_path
        }
        Err(err) => {
            warn!("failed to read steam installation path from registry: {err:#}, using fallback path");

            r"C:\Program Files (x86)\Steam\steam.exe".into()
        }
    };

    let path = path
        .exists_or_none()
        .ok_or_eyre("failed to find Steam installation, is it not installed?")?;

    Ok(Command::new(path))
}

#[cfg(target_os = "linux")]
fn create_base_steam_command() -> Result<Command> {
    use tracing::debug;

    if let Ok(path) = which::which("steam") {
        info!("found steam installation via which: {}", path.display());
        return Ok(Command::new(path));
    }

    let mut flatpak_check = Command::new("flatpak");
    flatpak_check.args(["info", "com.valvesoftware.Steam"]);

    debug!("checking for steam flatpak installation with command {flatpak_check:?}");

    if flatpak_check.status().is_ok_and(|status| status.success()) {
        info!("using flatpak steam installation");

        let mut command = Command::new("flatpak");
        command.args(["run", "com.valvesoftware.Steam"]);

        return Ok(command);
    }

    let path = PathBuf::from("/usr/bin/steam")
        .exists_or_none()
        .ok_or_eyre("failed to find Steam installation, is it not installed?")?;

    info!(
        "using steam installation at fallback path: {}",
        path.display()
    );

    Ok(Command::new(path))
}

#[cfg(target_os = "windows")]
fn read_steam_registry() -> Result<PathBuf> {
    use tracing::debug;
    use winreg::enums::*;
    use winreg::RegKey;

    let hklm = RegKey::predef(HKEY_LOCAL_MACHINE);
    let key = hklm.open_subkey(r"SOFTWARE\WOW6432Node\Valve\Steam")?;

    debug!("reading InstallPath from {key:?}");

    let path: String = key.get_value("InstallPath")?;

    Ok(PathBuf::from(path))
}

fn create_epic_command(game: Game) -> Result<Command> {
    let Some(epic) = &game.platforms.epic_games else {
        bail!("{} is not available on Epic Games", game.name)
    };

    let url = format!(
        "com.epicgames.launcher://apps/{}?action=launch&silent=true",
        epic.identifier.unwrap_or(game.name)
    );

    info!("launching from Epic Games with URL {}", url);

    open::commands(url)
        .into_iter()
        .next()
        .ok_or_eyre("open returned no commands to try")
}

pub fn locate_game_dir(platform: Option<Platform>, game: Game) -> Result<PathBuf> {
    match platform {
        Some(Platform::Steam) => steam_game_dir(game),
        #[cfg(windows)]
        Some(Platform::XboxStore) => xbox_game_dir(game),
        #[cfg(windows)]
        Some(Platform::EpicGames) => epic_game_dir(game),
        _ => bail!("game directory not found - you may need to specify it in the settings"),
    }
}

fn steam_game_dir(game: Game) -> Result<PathBuf> {
    let Some(steam) = &game.platforms.steam else {
        bail!("{} is not available on Steam", game.slug);
    };

    match steamlocate::SteamDir::locate() {
        Ok(steam_dir) => match steam_dir.find_app(steam.id)? {
            Some((app, lib)) => return Ok(lib.resolve_app_dir(&app)),
            None => warn!(
                "steamlocate did not find app {} for {}, falling back to manual library detection",
                steam.id, game.slug
            ),
        },
        Err(err) => warn!(
            "failed to find steam install via steamlocate for {}: {err:#}",
            game.slug
        ),
    }

    #[cfg(windows)]
    {
        return locate_steam_game_dir_fallback(game, steam);
    }

    #[cfg(not(windows))]
    {
        bail!("could not find app in steam library, is the game not installed?");
    }
}

#[cfg(windows)]
fn locate_steam_game_dir_fallback(game: Game, steam: &Steam<'_>) -> Result<PathBuf> {
    let mut steamapps_dirs = Vec::new();
    let mut seen = std::collections::BTreeSet::new();

    if let Ok(install_dir) = read_steam_registry() {
        push_steamapps_dir(
            &mut steamapps_dirs,
            &mut seen,
            install_dir.join("steamapps"),
        );

        for library in read_steam_library_paths(&install_dir).unwrap_or_default() {
            push_steamapps_dir(&mut steamapps_dirs, &mut seen, library.join("steamapps"));
        }
    }

    for drive in ('C'..='Z').map(|letter| PathBuf::from(format!("{letter}:\\"))) {
        if !drive.is_dir() {
            continue;
        }

        push_steamapps_dir(
            &mut steamapps_dirs,
            &mut seen,
            drive.join("SteamLibrary").join("steamapps"),
        );
        push_steamapps_dir(
            &mut steamapps_dirs,
            &mut seen,
            drive.join("Steam").join("steamapps"),
        );
        push_steamapps_dir(
            &mut steamapps_dirs,
            &mut seen,
            drive
                .join("Program Files (x86)")
                .join("Steam")
                .join("steamapps"),
        );
        push_steamapps_dir(
            &mut steamapps_dirs,
            &mut seen,
            drive.join("Program Files").join("Steam").join("steamapps"),
        );
    }

    for steamapps_dir in &steamapps_dirs {
        if let Some(path) = resolve_manifest_install_dir(steamapps_dir, steam.id) {
            info!(
                "found {} via Steam manifest fallback at {}",
                game.slug,
                path.display()
            );
            return Ok(path);
        }
    }

    for steamapps_dir in &steamapps_dirs {
        for dir_name in steam_dir_name_candidates(game, steam) {
            let candidate = steamapps_dir.join("common").join(&dir_name);
            if candidate.is_dir() {
                info!(
                    "found {} via Steam directory-name fallback at {}",
                    game.slug,
                    candidate.display()
                );
                return Ok(candidate);
            }
        }
    }

    bail!(
        "could not find app in steam library, is the game not installed? You may need to set a location override in settings"
    );
}

#[cfg(windows)]
fn push_steamapps_dir(
    dirs: &mut Vec<PathBuf>,
    seen: &mut std::collections::BTreeSet<String>,
    path: PathBuf,
) {
    if !path.join("common").is_dir() {
        return;
    }

    let key = path.to_string_lossy().to_lowercase();
    if seen.insert(key) {
        dirs.push(path);
    }
}

#[cfg(windows)]
fn read_steam_library_paths(install_dir: &Path) -> Result<Vec<PathBuf>> {
    let path = install_dir.join("steamapps").join("libraryfolders.vdf");
    let content = std::fs::read_to_string(&path)
        .with_context(|| format!("failed to read {}", path.display()))?;
    let mut libraries = Vec::new();

    for line in content.lines() {
        let fields = quoted_fields(line);
        if fields.first().copied() != Some("path") {
            continue;
        }

        let Some(raw_path) = fields.get(1) else {
            continue;
        };

        let library = PathBuf::from(raw_path.replace("\\\\", "\\"));
        if library.is_dir() {
            libraries.push(library);
        }
    }

    Ok(libraries)
}

#[cfg(windows)]
fn resolve_manifest_install_dir(steamapps_dir: &Path, app_id: u32) -> Option<PathBuf> {
    let manifest_path = steamapps_dir.join(format!("appmanifest_{app_id}.acf"));
    let content = std::fs::read_to_string(&manifest_path).ok()?;

    for line in content.lines() {
        let fields = quoted_fields(line);
        if fields.first().copied() != Some("installdir") {
            continue;
        }

        let install_dir = steamapps_dir.join("common").join(fields.get(1)?);
        if install_dir.is_dir() {
            return Some(install_dir);
        }
    }

    None
}

#[cfg(windows)]
fn steam_dir_name_candidates(game: Game, steam: &Steam<'_>) -> Vec<String> {
    let mut names: Vec<String> = Vec::new();

    for candidate in [
        steam.dir_name.as_deref(),
        Some(game.r2_dir_name.as_ref()),
        Some(game.name),
        Some(game.slug.as_ref()),
    ] {
        let Some(candidate) = candidate else {
            continue;
        };

        let trimmed = candidate.trim();
        if trimmed.is_empty() || names.iter().any(|name| name.eq_ignore_ascii_case(trimmed)) {
            continue;
        }

        names.push(trimmed.to_string());
    }

    names
}

#[cfg(windows)]
fn quoted_fields(line: &str) -> Vec<&str> {
    line.split('"').skip(1).step_by(2).collect()
}

#[cfg(windows)]
fn xbox_game_dir(game: Game) -> Result<PathBuf> {
    use std::process::Command;

    use eyre::{ensure, Context};

    let Some(xbox) = &game.platforms.xbox_store else {
        bail!("{} is not available on Xbox Store", game.name)
    };

    let name = xbox.identifier.unwrap_or(game.name);
    let mut query = Command::new("powershell.exe");
    query.args([
        "get-appxpackage",
        "-Name",
        name,
        "|",
        "select",
        "-expand",
        "InstallLocation",
    ]);

    info!("querying path for {} with command {:?}", game.slug, query);

    let out = query.output()?;

    ensure!(
        out.status.success(),
        "query returned with error code {}",
        out.status.code().unwrap_or(-1)
    );

    let str = String::from_utf8(out.stdout).context("query returned invalid UTF-8")?;

    Ok(PathBuf::from(str))
}

#[cfg(windows)]
fn epic_game_dir(game: Game) -> Result<PathBuf, eyre::Error> {
    use eyre::Context;
    use serde::Deserialize;

    use crate::util;

    let Some(epic) = &game.platforms.epic_games else {
        bail!("{} is not available on Epic Games", game.name)
    };

    let name = epic.identifier.unwrap_or(game.name);
    let dat_path: PathBuf =
        PathBuf::from("C:/ProgramData/Epic/UnrealEngineLauncher/LauncherInstalled.dat");

    #[derive(Debug, Deserialize)]
    #[serde(rename_all = "PascalCase")]
    struct ListItem {
        install_location: PathBuf,
        app_name: String,
    }

    info!(
        "reading Epic Games installations from {}",
        dat_path.display()
    );

    let list: Vec<ListItem> =
        util::fs::read_json(dat_path).context("failed to read LauncherInstalled.dat file")?;

    list.into_iter()
        .find(|item| item.app_name == name)
        .map(|item| item.install_location)
        .ok_or_eyre("could not find entry in the list of installed games")
}
