# wickwatch.github.io

The project page of [wickwatch](https://github.com/wickwatch/wickwatch): one static page in English (`index.html`) and German (`de/index.html`), served by GitHub Pages. No framework, no tracking, fonts served from the site.

## Change the page
- Texts: `i18n/en.json` and `i18n/de.json` (same keys in both; English is the source).
- Markup: `src/page.html`, the header shared with the legal page in `src/header.html` (pulled in with `{{partial:header}}`). Styles: `assets/css/site.css`, built on `assets/css/tokens.css` (a copy of `design/tokens.css` from the main repo; copy it again when the tokens change).
- Build with `node build.mjs` (Node 20+, no dependencies) and commit the generated `index.html` and `de/index.html`. The build fails on a missing string or a placeholder left in the page.

## Legal notice and privacy
`src/legal.html` builds `impressum/index.html` (German only, linked from both footers). Raise `LEGAL_DATE` in `build.mjs` when the text changes, and update the privacy part when the site starts using anything new (hosting, embeds, analytics).

## With each wickwatch release
Raise `VERSION` in `build.mjs` (the quick start pins it) and rebuild.

## Screenshots
`assets/shots/<view>-<dark|light>-<en|de>.webp`, taken from the demo adapter at 1440 × 900 (phone 390 × 844), device scale 2, saved as WebP (quality 80, desktop resized to 2000 px). Retake them when the dashboard changes visibly.

## Domain
Served at https://wickwatch.github.io until wickwatch.dev points here. Then: set `SITE_URL` in `build.mjs` to `https://wickwatch.dev`, rebuild, add a `CNAME` file containing `wickwatch.dev`, and set the custom domain with "Enforce HTTPS" under Settings → Pages.

## Licence
Site code and texts: [AGPL-3.0](LICENSE), like wickwatch. Fonts: SIL Open Font License, see `assets/fonts/`.
