# CLAUDE.md — hs108 Design Docs

Project reference for Claude Code. Update this file as decisions are made.

---

## Repository layout

```
design-docs/                        ← repo root
├── .github/workflows/deploy.yml    ← GitHub Actions deploy workflow
├── design-docs/                    ← field-notes site (journal/archive/zine)
└── docs-site/                      ← THIS project: brand documentation site
```

The `docs-site/` directory is the active project. All Astro commands run from there.

---

## docs-site — tech stack

| Layer | Choice |
|---|---|
| Framework | Astro 4.16.x + @astrojs/starlight 0.28.x |
| Content | MDX (`.mdx`) — all pages in `src/content/docs/` |
| Animations | `motion` v10.18.0 — `inView` + `stagger`, no React/Framer Motion |
| Hosting | GitHub Pages via GitHub Actions (`deploy.yml`) |
| Domain | `docs.hs108.in` (CNAME file at repo root) |

---

## Colours

- **Primary accent** — Blue family (`--blue-500`, `--blue-700`, `--blue-200`)
- **Highlight / action** — Vermilion (`--vermilion-500`)
- Sidebar active indicator: `--vermilion-500` left border
- Copy button hover: `--vermilion-500` background

Starlight CSS var remaps are in `docs-site/src/styles/custom.css`.

---

## Typography

Fonts: Instrument Serif (display/italic titles), Geist (body), Geist Mono (mono), Genos, Rajdhani, Michroma, IBM Plex Serif.

`--sl-font` → `'Geist', Arial, sans-serif`
`--sl-font-mono` → `'Geist Mono', monospace`

---

## Known quirks / fixes applied

| Issue | Fix |
|---|---|
| Zod v4 resolved by npm, breaks Starlight | Pinned `"zod": "^3.x"` in `package.json` |
| `@astrojs/sitemap` crashes on Astro 4.16.x | No-op shim `{ name: '@astrojs/sitemap', hooks: {} }` placed before Starlight in `astro.config.mjs` integrations array |
| GitHub Pages ran Jekyll on Astro project | Created `.github/workflows/deploy.yml`; Pages source must be set to **GitHub Actions** in repo Settings → Pages |
| Starlight `logo` config mismatch | Removed `logo` property from Starlight config entirely |

---

## Sidebar structure

```
Introduction  (/)
Design Tokens
  Overview    (/tokens/overview)
  Colors      (/tokens/colors)
  Spacing & Layout (/tokens/spacing)
Typography
  Overview    (/typography/overview)
  Type Scale  (/typography/scale)
  Usage       (/typography/usage)
Components
  Overview    (/components/overview)
  Buttons     (/components/buttons)
  Tags        (/components/tags)
  Cards       (/components/cards)
```

---

## Custom Astro components

Located in `docs-site/src/components/`:

| Component | Purpose | Key props |
|---|---|---|
| `ColorSwatch.astro` | Swatch grid with hex overlay on hover | `swatches[]`, `family?` |
| `TokenTable.astro` | Copy-on-click token reference table | `tokens[]`, `caption?` |
| `TypeSpecimen.astro` | Live text at each type scale step | `scale[]` |
| `ComponentPreview.astro` | Live HTML preview + code block | `html`, `label`, `dark?` |

Motion stagger scroll animations used in `ColorSwatch` and `TypeSpecimen`. Easing: `[0.16, 1, 0.3, 1]`.

---

## Design system style

- Border radius: **0** (brutalist)
- Border width: **2px**
- Cards are `<a>` links; hover state uses `--surface-elevated`
- Card titles: Instrument Serif italic (never override font-family)

---

## Pending / deferred

- [ ] Real global CSS, typography, and layout files — user will provide in a future session (currently using placeholder `tokens.css` and `custom.css`)
- [ ] Charts / data visualisation section — deferred from MVP

---

## Deploy checklist

1. Push to `main`
2. GitHub Actions workflow (`deploy.yml`) runs automatically
3. Pages source in repo Settings → Pages must be **"GitHub Actions"** (not "Deploy from a branch")
4. Live at `https://docs.hs108.in`
