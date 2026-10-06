# wickwatch.github.io

The project page of [wickwatch](https://github.com/wickwatch/wickwatch): a static start page and three topic pages, each in English and German (`de/`), served by GitHub Pages. No framework, no tracking, fonts served from the site.

## Change the page
- Texts: `i18n/en.json` and `i18n/de.json` (same keys in both; English is the source).
- Markup: `src/page.html`, the header shared with the legal page in `src/header.html` (pulled in with `{{partial:header}}`). Styles: `assets/css/site.css`, built on `assets/css/tokens.css` (a copy of `design/tokens.css` from the main repo; copy it again when the tokens change).
- Build with `node build.mjs` (Node 20+, no dependencies) and commit the generated pages. The build fails on a missing string or a placeholder left in the page.
- Topic pages (`ctrader-docker/`, `prop-firm-challenges/`, `mcp/`): the frame is `src/topic.html`, each body `src/topics/<key>.html`, the strings `topic.<key>.*`. For a new one add it to `TOPICS` in `build.mjs`, to the guides section in `src/page.html`, the list in `src/topic.html` and `src/llms.md`. Keep them in line with the docs in the main repo they summarise.
- For search engines and AI assistants the build also writes `sitemap.xml`, `robots.txt`, the schema.org data in each page's head and `llms.txt` (from `src/llms.md`: update it when features or docs change). Commit them too.

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
