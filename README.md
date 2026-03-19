# Empress Mod Manager

Empress Mod Manager is a dark red-blue Thunderstore mod manager fork built from Gale and reworked into an Empress-themed desktop app.

## What Empress Adds

- Full Empress branding across the desktop app
- A darker red-and-blue visual theme with refreshed desktop icons
- An Empress Ops Center with profile readiness scoring, package intel, and local "War Notes"
- Rust-side app identity updates for the Empress fork
- Gale-hosted updater and profile sync disabled so this fork does not depend on Gale's infrastructure

More detail lives in [EMPRESS_CHANGES.md](./EMPRESS_CHANGES.md).

## Current Status

- Windows desktop builds are working
- Legacy `gale://` deep links are still accepted for compatibility
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

## License

This project is a modified fork of Gale and is distributed under the GNU GPL v3.0.

- See [LICENSE.md](./LICENSE.md) for the license text
- See [NOTICE.md](./NOTICE.md) for fork attribution and distribution notes

## Attribution

Empress Mod Manager is based on [Gale](https://github.com/Kesomannen/gale) by Kesomannen.
