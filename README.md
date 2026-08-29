# taffish.github.io

Static web registry for `taffish`, backed by `taffish-index`.

## Features

- English + Chinese UI (default English, one-click switch in header)
- Package search and filtering (`tool` / `flow`, dependencies only, container only)
- Package sorting (`name` / recent accepted release time)
- Package detail pane with versions, app meta descriptions, upstream source metadata, dependencies, platform constraints, container digest/platform metadata, platform digests, smoke/trust metadata, and install commands
- Multi-backend smoke evidence for Docker, Podman, and Apptainer, including required/advisory policy roles, runtime versions, validation platforms, runner images, timestamps, and failure details when available
- One-click copy for install commands, including full dependency-aware install chain
- Curated [TAFFISH Flow Portal](https://taffish.github.io/flows/) for official
  flow families, route pages, example reports, and links back into the Hub
  registry
- Warnings panel (from index build warnings)
- Separate required-gate and current advisory-backend failure counts, with the
  historical count and compatibility total kept in the advisory card when the
  Index provides split counts, plus a direct link to the latest index build report
- Sync failure panel with explicit retry, last successful sync time, CDN
  fallback, and browser-cache fallback for transient GitHub/raw rate limits
- Shareable URL state (`lang`, query, filters, selected package/version)
- Repository cards built from the `repositories` section in index data

## Data Source

- Primary: `https://raw.githubusercontent.com/taffish/taffish-index/main/index/index.json`
- Fallback: `https://cdn.jsdelivr.net/gh/taffish/taffish-index@main/index/index.json`

Successful loads are cached in the browser Cache API. If a later live sync
fails, the page continues showing the last available index data and displays a
sync warning instead of rendering an empty registry.

## Files

- `index.html`: app layout
- `styles.css`: responsive styles
- `app.js`: index fetch, i18n, filters, and detail rendering
- `flows/`: static flow portal pages and curated flow-family examples

## Publish on GitHub Pages

1. Create repository: `taffish/taffish.github.io`
2. Push these files to `main`
3. In repository settings, enable Pages from branch `main` (root)

## License

The website source code is licensed under the [Apache License 2.0](LICENSE).

Original website text and documentation-like content are licensed under
[Creative Commons Attribution 4.0 International](CONTENT-LICENSE) (CC BY 4.0).

Package metadata displayed by the website is loaded from `taffish-index` and is
covered by the data license of that repository.
