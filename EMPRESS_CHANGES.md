# Empress Changes

This file summarizes the Empress-specific work added on top of Gale.

## Branding And Visual Direction

- Rebranded the app from Gale to Empress Mod Manager
- Added Empress naming, titles, and product metadata
- Shifted the interface toward a dark red-and-blue "Empress" command-deck theme
- Regenerated the desktop icon set from the Empress sigil artwork

## New Product Surface

- Added the Empress Ops Center page
- Added profile readiness scoring and status cards
- Added category and package intelligence summaries
- Added local per-profile "War Notes"

## Desktop And Rust-Side Changes

- Renamed Rust crate and binary identity to `empress-mod-manager`
- Updated internal logging and app identifiers to Empress
- Updated desktop bundle naming and metadata
- Kept legacy `gale://` deep-link support for compatibility

## Safety And Infrastructure Changes

- Disabled Gale-hosted updater behavior for this fork
- Disabled Gale-hosted sync behavior for this fork
- Changed the games-update path so Empress only uses explicitly configured endpoints

## Packaging State

- Windows release builds are working
- NSIS installer output is working
- MSI output is generated, but NSIS is the friendlier default release artifact for local installs
