# Internal page: Fiorin Games Studio (`/games`)

## Decisions (from user)

- URL: `/games` (matches the existing `src/data/projects.json` entry; no change there).
- Identity: monochrome white/gray accent, logo `public/img/studio.png` (black & white, 1254x1254).
- Sections: hero + about + games list + contact, in the home page's format (menu → logo → sections → footer).
- Games list: new `src/data/games.json`, seeded with existing covers; user edits content later.
- No home menu change — the studio is surfaced through the existing projects list entry.

## Files

### 1. `src/pages/StudioPage.tsx` (new)

Mirrors `src/App.tsx` structure, not the `ProjectPage`/resume shell:

- `<Seo title description canonical="https://fior.in/games" />`.
- `<div id="page" className="studioTheme">` → `<nav id="menu">` (anchor links to page sections) →
  `<header id="logo">` with `<img src="/img/studio.png">` →
  hero section (`#welcome` pattern: big studio name, tagline; uses `welcomeFiorin`-style `Ink Free` font class) →
  `<h2 className="sectionTitle">` about blocks rendered with the existing `abilityLeft`/`abilityRight` +
  `abilityContainer` markup (2–3 blocks: studio pitch, how games get made) →
  games list (`#projects` + `#projectsList` + `projectListItem` markup fed from `games.json`) →
  contact section (`#contact` / `contactList` pattern) → footer like `App.tsx`.
- Constraints from `scripts/check-accessibility.mjs`: exactly one `<h1>`, every `<img>` has `alt` +
  `width`/`height`, every `<a>` has `href`.
- Copy is seeded placeholder text in the home page's voice; user rewrites later.

### 2. `src/data/games.json` (new) + loader

- Same shape as `projects.json` (`cover, year, color, title, description, tags[], href, icon, external?`),
  validated by the existing `validateProjects` in `src/data/schema.ts`.
- `src/data/games.ts` re-exports `validateProjects(games)` like `src/data/projects.ts`.
- Seed: 2–3 placeholder entries using `cover-studio.png`, `cover-brawl.png`, `game.png`.
- Nothing is published to `dist/` (only `projects.json`/`resume.json` are fetched at runtime);
  the games list is bundled like `src/data/projects.json` already is.

### 3. `src/routes.tsx`

- `const StudioPage = lazy(() => import("./pages/StudioPage"))` (keeps it out of the entry chunk, same
  as `ResumePage`) and add `"/games": StudioPage` to `routes`.

### 4. `css/style.css` — scoped monochrome identity

Append a `.studioTheme` scope overriding the orange identity (base rules stay untouched so the home
page and the a11y assertions on `.sectionTitle{color:#fff}` / `.abilityContent{color:#aaa}` keep working):

```css
.studioTheme a { color: #fff; }
.studioTheme #menuList .menuItem a:hover { background: #444; }
.studioTheme .projectYear { color: #ccc; }        /* replaces colorOrange on the list */
.studioTheme .abilitieTags .projectTag, .studioTheme .pageTags { color: #ddd; }
.studioTheme .abilityTitle, .studioTheme .sectionTitle { letter-spacing... } /* optional, monochrome only */
```

Menu/button chrome (`#333` background) already reads as monochrome; only accent colors need swapping.

### 5. `scripts/build-pages.mjs`

- `const routes = ["/resume", "/games"]` → produces `dist/games/index.html`, so GitHub
  Pages answers 200 instead of 404 (it has no server rewrites; `dist/404.html` fallback stays as-is).

### 6. `scripts/check-accessibility.mjs`

- Add `src/pages/StudioPage.tsx` to the `files` array.

### 7. Optional fix while there (`src/data/projects.json:2`)

- `tags: ["Boardgame, Python, AI"]` renders as one `#Boardgame, Python, AI` tag → split into
  `["Boardgame", "Python", "AI"]`.
- `icon: "external"` with `external: false` draws an external-link arrow on an internal link →
  change `icon` to `"link"`.

## Verification

1. `npm ci` (node_modules is missing locally).
2. `npm run typecheck` → clean.
3. `npm run check:a11y` → passes with the new file included.
4. `npm run build` → confirm `dist/games/index.html` and `dist/404.html` are produced.
5. `npm run preview` → fetch `/games/`, confirm the page renders, logo/cover requests return 200,
   menu anchors scroll, and the monochrome accent is applied (not orange).
