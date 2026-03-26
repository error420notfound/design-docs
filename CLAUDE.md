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

## Design language

docs-site matches `hs108.in` and `field-notes.hs108.in` exactly. The shared system:

- **Background:** hue-100 as page bg — docs uses blue-100 (`#CFE6FE`), same pattern as field-notes (teal-100) and hs108.in (orange-100)
- **Borders:** hue-black-native for ALL structural borders in light mode (`--hs-border: #020D1F`); `rgba(207,230,254,0.12)` in dark mode. Never use gray for structural borders.
- **Border width:** 2px everywhere, border radius 0 (brutalist)
- **Nav height:** 60px (matches field-notes)

### Colours

- **Primary accent** — Blue family (`--blue-500` #2186EB, `--blue-700` #1259AF, `--blue-200` #A3CFFD)
- **Sidebar active indicator:** blue-500 left border + blue-100 bg
- **Copy button hover:** blue-500 background
- Action/highlight colors are all blue — vermilion is NOT used in this site

Starlight CSS var remaps are in `docs-site/src/styles/custom.css`.

Light theme key values:
```
--sl-color-bg:         #CFE6FE  (blue-100)
--sl-color-bg-sidebar: #CFE6FE  (same — border does the separation)
--sl-color-accent:     #2186EB  (blue-500)
--hs-border:           #020D1F  (blue-black-native)
```

Dark theme key values:
```
--sl-color-bg:         #060D18  (deep navy)
--sl-color-accent:     #3E98FA  (blue-400)
--hs-border:           rgba(207, 230, 254, 0.12)
```

---

## Typography

Fonts loaded via Google Fonts `@import` in `tokens.css`. All fonts: Instrument Serif (display/italic titles), Geist (body), Geist Mono (mono), Genos, Rajdhani, Michroma, IBM Plex Serif.

`--sl-font` → `'Geist', Arial, sans-serif`
`--sl-font-mono` → `'Geist Mono', monospace`

Type scale is fluid (`clamp`) — defined in `tokens.css`, applied in `custom.css`:
- h1: `clamp(36px, 5.5vw, 80px)`, lh 1.0
- h2: `clamp(26px, 3.5vw, 48px)`, lh 1.05, italic
- h3: `clamp(19px, 2vw, 28px)`, lh 1.2

All h1–h4 in markdown content use Instrument Serif weight 400.

---

## Starlight component overrides

Both Header and Footer are replaced with custom components. Registered in `astro.config.mjs`:

```js
components: {
  Header: './src/components/Header.astro',
  Footer: './src/components/Footer.astro',
}
```

### Header (`src/components/Header.astro`)

Mirrors the field-notes nav:
- 60px bar, dark 2px border-bottom
- Wordmark `hs108 / docs` — Geist Mono uppercase 13px bold, dark right border, hover fills with accent
- Search stretches to fill middle
- ThemeSelect + MobileMenuToggle in right group, each with dark left border
- On mobile: `/docs` label hidden, MobileMenuToggle visible

Sub-components imported from Starlight virtual modules:
```js
import Search from 'virtual:starlight/components/Search';
import ThemeSelect from 'virtual:starlight/components/ThemeSelect';
import MobileMenuToggle from 'virtual:starlight/components/MobileMenuToggle';
```

The `<header class="header">` wrapper is rendered by Starlight's `PageFrame.astro` — the custom Header.astro renders INSIDE it. Override `padding: 0` on `header.header` in custom.css to go edge-to-edge.

### Footer (`src/components/Footer.astro`)

Mirrors the field-notes footer pattern:
- Re-includes Starlight's `Pagination` component at the top (prev/next doc navigation)
- Below pagination: site footer with `border-top: var(--hs-border-width) solid var(--hs-border)`
- Top section: left = branding + description; right = nav columns (Pages, Studio)
- Pages links: Introduction, Design Tokens, Typography, Components
- Studio links: hs108.in ↗, Field Notes ↗
- `<hr>` separator (uses `--hs-border-soft`)
- Bottom row: © year + domain, Geist Mono uppercase, opacity 0.3
- Mobile (`max-width: 640px`): stacks vertically

Sub-components:
```js
import Pagination from 'virtual:starlight/components/Pagination';
```

---

## Known quirks / fixes applied

| Issue | Fix |
|---|---|
| Zod v4 resolved by npm, breaks Starlight | Pinned `"zod": "^3.x"` in `package.json` |
| `@astrojs/sitemap` crashes on Astro 4.16.x | No-op shim `{ name: '@astrojs/sitemap', hooks: {} }` placed before Starlight in `astro.config.mjs` integrations array |
| GitHub Pages ran Jekyll on Astro project | Created `.github/workflows/deploy.yml`; Pages source must be set to **GitHub Actions** in repo Settings → Pages |
| Starlight `logo` config mismatch | Removed `logo` property from Starlight config entirely |
| PageFrame adds padding to `header.header` | Override `padding: 0 !important` on `header.header` in custom.css |

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
| `Header.astro` | Custom nav override — field-notes style 60px bar, bolder wordmark (13px/700) | Starlight Props (spread to sub-components) |
| `Footer.astro` | Custom footer override — Pagination + site footer with nav columns | Starlight Props (spread to Pagination) |
| `ColorSwatch.astro` | Swatch grid with hex overlay on hover | `swatches[]`, `family?` |
| `TokenTable.astro` | Copy-on-click token reference table | `tokens[]`, `caption?` |
| `TypeSpecimen.astro` | Live text at each type scale step | `scale[]` |
| `ComponentPreview.astro` | Live HTML preview + code block | `html`, `label`, `dark?` |

Motion stagger scroll animations used in `ColorSwatch` and `TypeSpecimen`. Easing: `[0.16, 1, 0.3, 1]`.

---

## CSS file responsibilities

| File | Purpose |
|---|---|
| `src/styles/tokens.css` | All CSS custom properties — hue scales, semantic tokens, type scale, spacing. Google Fonts `@import` at top. |
| `src/styles/custom.css` | Starlight overrides only — maps `--sl-*` vars, adds `--hs-border` system, sets `--sl-content-width: 65rem`, prose styles, component classes for MDX previews. |

---

## Design system style (shared with hs108.in / field-notes)

- Border radius: **0** everywhere
- Border width: **2px**
- Structural borders use `--hs-border` (dark in light mode, subtle in dark mode) — never use gray
- Cards are `<a>` links; hover state uses `--sl-color-accent-low`
- Card titles: Instrument Serif italic (never override font-family)
- Blockquotes: Instrument Serif italic, accent-strong left border
- List markers: `›` via Geist Mono (not default browser bullets)
- Links in prose: underline default, background-swap on hover

---

## Pending / deferred

- [ ] Charts / data visualisation section — deferred from MVP

---

## Deploy checklist

1. Push to `main`
2. GitHub Actions workflow (`deploy.yml`) runs automatically
3. Pages source in repo Settings → Pages must be **"GitHub Actions"** (not "Deploy from a branch")
4. Live at `https://docs.hs108.in`
