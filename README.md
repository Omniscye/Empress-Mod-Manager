# Empress Mod Manager

Empress Mod Manager is a Windows desktop Thunderstore mod manager built around a darker, more tactical workflow: Arsenal for installed mods, Recon for package hunting, and Ops for full loadout control.

## Best Features

- Empress Ops Center with readiness scoring, threat matrix, unknown package intel, War Notes, and quick command actions
- Arsenal Command with instant slices for upgrades, dormant mods, local injections, and tracked pressure points
- Recon Deck with scouting presets, install-state views, and an Intel Board for packages you want to watch before installing
- Loadout Snapshots that capture a baseline and show drift when a profile changes
- Launch Rituals for saving and replaying named launch-argument presets
- Profile Dossiers with codenames, risk posture, tags, and mission briefs
- Ops Watchlist for important installed mods you want to monitor closely

## Current Status

- Windows desktop builds are working
- `setup.exe` and `.msi` release bundles are available
- Auto-update is intentionally disabled
- Hosted sync is intentionally disabled until Empress has its own backend

## Development

Requirements:

- Node.js with Corepack
- Rust toolchain
- Tauri prerequisites
- On Windows: Visual Studio Build Tools with C++ support

Useful commands:

```bash
corepack pnpm install
corepack pnpm check
corepack pnpm build
corepack pnpm tauri build
```

## Branding

- Dark red-and-blue command-deck theme across the desktop app
- Empress logo, icons, and desktop identity
- Empress-first shell with Arsenal, Recon, Ops, Forge, and Control surfaces

## More Detail

More detail lives in [EMPRESS_CHANGES.md](./EMPRESS_CHANGES.md).

## License And Attribution

This project is distributed under the GNU GPL v3.0.

- See [LICENSE.md](./LICENSE.md) for the license text
- See [NOTICE.md](./NOTICE.md) for fork attribution and distribution notes
- Empress Mod Manager began from the GPL-licensed [Gale](https://github.com/Kesomannen/gale) codebase by Kesomannen
