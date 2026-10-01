// Builds index.html (English) and de/index.html (German) from src/page.html and the strings in i18n/.
// No dependencies: `node build.mjs`. Commit the generated pages; GitHub Pages serves them as they are.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

/** Where the site is served; becomes https://wickwatch.dev once the domain points here (then add a CNAME file). */
const SITE_URL = "https://wickwatch.github.io";
/** The version the quick start pins. Raise it with each wickwatch release. */
const VERSION = "0.1.2";
const REPO = "https://github.com/wickwatch/wickwatch";

const LANGS = [
  { code: "en", dir: "", locale: "en_GB", flag: "gb-us" },
  { code: "de", dir: "de/", locale: "de_DE", flag: "de" },
];

// Line icons from the dashboard (apps/web/src/icons.ts), plus a heart for Ko-fi in the same style.
const ICONS = {
  sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2.5v2M12 19.5v2M2.5 12h2M19.5 12h2M5.3 5.3l1.4 1.4M17.3 17.3l1.4 1.4M5.3 18.7l1.4-1.4M17.3 6.7l1.4-1.4"/>',
  moon: '<path d="M19.5 14.5A8 8 0 1 1 9.5 4.5a6.5 6.5 0 0 0 10 10z"/>',
  list: '<path d="M9 6.5h10M9 12h10M9 17.5h10"/><path d="M5 6.5h.01M5 12h.01M5 17.5h.01"/>',
  play: '<path d="M7.5 4.5v15l11.5-7.5z"/>',
  stop: '<rect x="6" y="6" width="12" height="12" rx="1.5"/>',
  terminal: '<path d="M5 7l4.5 4.5L5 16"/><path d="M12 17h7"/>',
  key: '<circle cx="8" cy="15.5" r="4"/><path d="M11 12.5l8.5-8.5"/><path d="M16.5 7l2.5 2.5"/><path d="M14 9.5l2 2"/>',
  check: '<path d="M5 12.5l4.5 4.5L19 7.5"/>',
  clock: '<circle cx="12" cy="12" r="8.5"/><path d="M12 7.5V12l3 2"/>',
  monitor: '<rect x="3" y="4" width="18" height="12" rx="2"/><path d="M8 20h8M12 16v4"/>',
  duplicate:
    '<rect x="8.5" y="8.5" width="11" height="11" rx="2"/><path d="M15.5 8.5V6a1.5 1.5 0 0 0-1.5-1.5H6A1.5 1.5 0 0 0 4.5 6v8A1.5 1.5 0 0 0 6 15.5h2.5"/>',
  info: '<circle cx="12" cy="12" r="8.5"/><path d="M12 11v5.5"/><path d="M12 7.75v.5"/>',
  heart: '<path d="M12 19.5s-7.5-4.4-7.5-9.7A4.3 4.3 0 0 1 12 7.1a4.3 4.3 0 0 1 7.5 2.7c0 5.3-7.5 9.7-7.5 9.7z"/>',
  external: '<path d="M13.5 4.5h6v6"/><path d="M19.5 4.5l-8 8"/><path d="M17 13.5v5a1 1 0 0 1-1 1H5.5a1 1 0 0 1-1-1V8a1 1 0 0 1 1-1h5"/>',
};
const icon = (name) => {
  if (!ICONS[name]) throw new Error(`unknown icon ${name}`);
  return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ICONS[name]}</svg>`;
};

/** Screenshot in both modes; only the one for the active mode is shown (and, lazy, loaded). */
const SHOT_SIZES = { overview: [2000, 1250], instance: [2000, 1250], account: [2000, 1250], phone: [780, 1688] };
const shot = (name, lang, alt, root, eager) => {
  const [w, h] = SHOT_SIZES[name];
  const img = (mode) =>
    `<img class="only-${mode}" src="${root}assets/shots/${name}-${mode}-${lang}.webp" width="${w}" height="${h}" alt="${alt}"${eager && mode === "dark" ? ' fetchpriority="high"' : ' loading="lazy"'}>`;
  return img("dark") + img("light");
};

const template = readFileSync(new URL("src/page.html", import.meta.url), "utf8");
const strings = Object.fromEntries(LANGS.map((l) => [l.code, JSON.parse(readFileSync(new URL(`i18n/${l.code}.json`, import.meta.url), "utf8"))]));

// Both languages must have the same keys.
const keys = (lang) => Object.keys(strings[lang]).sort().join("\n");
if (keys("en") !== keys("de")) throw new Error("i18n/en.json and i18n/de.json have different keys");

for (const lang of LANGS) {
  const t = strings[lang.code];
  const root = lang.dir ? "../" : "./";
  const other = LANGS.find((l) => l !== lang);
  const values = {
    lang: lang.code,
    locale: lang.locale,
    root,
    url: `${SITE_URL}/${lang.dir}`,
    alternate: `${SITE_URL}/${other.dir}`,
    alternateLang: other.code,
    otherRoot: lang.dir ? "../" : `./${other.dir}`,
    otherFlag: other.flag,
    siteUrl: SITE_URL,
    repo: REPO,
    version: VERSION,
    year: String(new Date().getUTCFullYear()),
  };
  const fill = (text) =>
    text
      .replace(/\{\{icon:([a-z]+)\}\}/g, (_, name) => icon(name))
      .replace(/\{\{shot:([a-z]+):([a-zA-Z0-9.]+)(:eager)?\}\}/g, (_, name, altKey, eager) => shot(name, lang.code, t[altKey], root, Boolean(eager)))
      .replace(/\{\{t:([a-zA-Z0-9.]+)\}\}/g, (_, key) => {
        if (!(key in t)) throw new Error(`missing string ${key} (${lang.code})`);
        return fill(t[key]);
      })
      .replace(/\{\{([a-zA-Z]+)\}\}/g, (_, key) => {
        if (!(key in values)) throw new Error(`missing value ${key}`);
        return values[key];
      });
  const html = fill(template);
  const left = html.match(/\{\{[^}]*\}\}/);
  if (left) throw new Error(`unreplaced placeholder ${left[0]} (${lang.code})`);
  if (lang.dir) mkdirSync(new URL(lang.dir, import.meta.url), { recursive: true });
  writeFileSync(new URL(`${lang.dir}index.html`, import.meta.url), html);
  console.log(`${lang.dir}index.html`);
}

// Legal notice and privacy policy: German only, as required for a site run from Germany.
const LEGAL_DATE = "1. Oktober 2026";
const legal = readFileSync(new URL("src/legal.html", import.meta.url), "utf8")
  .replace(/\{\{icon:([a-z]+)\}\}/g, (_, name) => icon(name))
  .replace(/\{\{([a-zA-Z]+)\}\}/g, (_, key) => {
    const values = { siteUrl: SITE_URL, repo: REPO, legalDate: LEGAL_DATE };
    if (!(key in values)) throw new Error(`missing value ${key} (legal)`);
    return values[key];
  });
mkdirSync(new URL("impressum/", import.meta.url), { recursive: true });
writeFileSync(new URL("impressum/index.html", import.meta.url), legal);
console.log("impressum/index.html");
