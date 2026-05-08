# taffish.github.io

Static web registry for `taffish`, backed by `taffish-index`.

## Features

- English + Chinese UI (default English, one-click switch in header)
- Package search and filtering (`tool` / `flow`, dependencies only, container only)
- Package sorting (`name` / `recent`)
- Package detail pane with versions, upstream source metadata, dependencies, platform constraints, and install commands
- One-click copy for install commands, including full dependency-aware install chain
- Warnings panel (from index build warnings)
- Sync failure panel with explicit retry and last successful sync time
- Shareable URL state (`lang`, query, filters, selected package/version)
- Repository cards built from the `repositories` section in index data

## Data Source

- `https://raw.githubusercontent.com/taffish/taffish-index/main/index/index.json`

## Files

- `index.html`: app layout
- `styles.css`: responsive styles
- `app.js`: index fetch, i18n, filters, and detail rendering

## Publish on GitHub Pages

1. Create repository: `taffish/taffish.github.io`
2. Push these files to `main`
3. In repository settings, enable Pages from branch `main` (root)
