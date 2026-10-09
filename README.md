# Fluigen website

The marketing site for [Fluigen](https://fluigen.com), an AI automation agency. Its one goal is to get visitors to book a free automation audit.

- Live: https://fluigen.com
- Preview: https://preview.fluigen.com (hidden from search engines)

## Stack

- [Astro](https://astro.build) with static output
- [Tailwind CSS](https://tailwindcss.com) v4
- `@astrojs/sitemap` for the sitemap
- Hosted on Cloudflare Pages, deployed from this repo
- Calendly, embedded on `/book` only

## Getting started

Requires Node 22.12 or newer.

```sh
npm install
npm run dev       # local dev server at http://localhost:4321
npm run build     # static build into dist/
npm run preview   # serve the built dist/ locally
```

## Branches and deploys

| Branch | Deploys to | Purpose |
|---|---|---|
| `dev` | https://preview.fluigen.com | All work happens here |
| `main` | https://fluigen.com | Production |

Cloudflare Pages builds every push. A release means merging `dev` into `main` and pushing `main`.

Search indexing is controlled by `settings.searchIndexing` in `src/site.config.ts`. It only takes effect on production builds (`CF_PAGES_BRANCH=main`), so the preview site always sends a `noindex` meta tag and `X-Robots-Tag` header.

## Project layout

```
src/
  site.config.ts       Business details, booking link, launch settings (single source of truth)
  content.config.ts    Content collections for solutions and case studies
  pages/               Routes: home, solutions, case studies, how we work, about, book, privacy, terms, 404
  components/          Layout, nav, footer, sections, cards, buttons, flow field
  styles/              Theme tokens (light and dark), flow gradient, motion, fluid type and spacing
  lib/                 Indexing rules and content helpers
  scripts/             Shared scroll and reveal motion
content/
  brief.md             Page structure
  copy/                All site copy, including one Markdown file per solution and case study
design/
  brand.md             Exact colors, type, spacing, themes and motion rules
  logos/               Logo files
public/                Favicons, fonts, share image
CLAUDE.md              Working rules for the project
```

## Editing content

- **Business details** (name, location, email, booking link, legal date): edit `src/site.config.ts`. The footer, About, Privacy, Terms, `/book` and every call to action read from it.
- **Solutions and case studies**: edit or add Markdown files in `content/copy/solutions` and `content/copy/case-studies`. The build checks each file's fields and fails if a backend tool is listed under "Works with".
- **Page copy**: lives in `content/copy`.
- **Design values**: follow `design/brand.md`. Colors are role tokens that switch between light and dark mode, so use those instead of raw hex values.

## SEO

Each page sets its own title and description. The layout adds the canonical URL, Open Graph and X card tags, and structured business data. `robots.txt` and `sitemap-index.xml` are generated at build time. `/404` and `/styleguide` are always noindexed and left out of the sitemap.
