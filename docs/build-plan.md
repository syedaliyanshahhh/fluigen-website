# Fluigen website — build plan

## Context

Nothing has been built yet beyond a holding-page `index.astro`, project scaffolding (Astro 7 + Tailwind 4 via `@tailwindcss/vite`), brand tokens (`design/brand.md`), and real copy for the homepage (`content/copy/home.md`) and `/book` (`content/copy/book.md`). There is no `src/components/`, no content collections, no theme tokens in `global.css` beyond the bare Tailwind import, and no pages besides the placeholder. A reference draft (`design/reference-draft-homepage.html`) exists for section order and copy only — its styling isn't final, and it also contains a booking-modal pattern that conflicts with CLAUDE.md's rule that every CTA links to `/book` and only `/book` has the calendar. `design/mockups/` and `design/components.png` don't exist yet, so this plan leans on `design/brand.md` as the hard source of truth and treats visual composition beyond tokens as best-effort until mockups arrive.

`content/brief.md` now exists and confirms the hybrid structure, the sitemap, the homepage section list, and the booking flow. **It cuts off immediately after the homepage section** (ends mid-item at "12." with no further text) and never reaches the structural detail for Solutions pages, the Case study page template, How We Work, About, or Privacy/Terms — the exact sections Phase 9 and Phases 7–8 need most. Treat that gap as still open; re-export/complete the file when possible. Everything the file does confirm has been folded in below.

Decisions already made for this plan: icons are hand-copied inline SVGs (no new dependency), fonts are self-hosted (avoids sending EU visitor data to Google's CDN — Europe is an explicit target market), and the draft's booking modal is dropped entirely in favor of plain links to `/book`.

## Site map

Confirmed by `content/brief.md`.

- `/` — homepage (built first)
- `/book` — Cal.com inline embed
- `/solutions` — index + `/solutions/[slug]` — 5 detail pages: AI Receptionist and Voice Agents, Sales Follow-Up and Call Analysis, Client and Operations Portals, Hiring Automation, Content and Knowledge Systems
- `/case-studies` — index + `/case-studies/[slug]` — one page per project
- `/how-we-work`
- `/about`
- `/privacy`
- `/terms`
- `/styleguide` — dev-only reference page, noindexed, not linked from Nav/Footer

Brief.md rules that apply across every page: one CTA only (no newsletter, no chat popup), a CTA after every two sections on the homepage, and a CTA at the end of every solution and case-study page.

## Shared components (dependency order)

1. **Layout.astro** — bare shell: `<html>`, head (self-hosted font `@font-face`/preload, `<meta name="robots" content="noindex">`), `<slot/>`. Does **not** bundle Nav/Footer, so `/styleguide` can use it standalone.
2. **Button.astro** — primary (black pill / white-on-gradient), secondary (outline), text-link variants per brand.md; every instance that acts as a CTA points to `/book`.
3. **Label.astro** — Cascadia Code uppercase eyebrow, used sparingly.
4. **Card.astro** — base white surface (20px radius) + large-panel variant (28px radius), 1px rule border, no shadows.
5. **Container/Section primitives** — wrap the max-width (1240px), side padding (72/20px), and section spacing (150/80px) values as reusable utilities instead of repeating arbitrary values.
6. **Nav.astro** — sticky header, logo, links to the real routes above, "Book a free audit" Button → `/book`, mobile menu.
7. **Footer.astro** — logo, tagline, link list to the real routes.
8. **GradientSection.astro** — wraps the horizon/mist/edge image files as section backgrounds (never CSS gradients), enforces white-text-on-dark-part / black-text-on-light-part.
9. **StatTile.astro** — Big-number style + Label, for the proof strip.
10. **EmptyState.astro** — uses the `arch` gradient image, per brand.md's designation for founder-photo frames and empty states (founder photo, audio placeholder).
11. **FAQItem** — native `<details>/<summary>`, no custom JS.
12. **SolutionCard / CaseStudyCard** — Card variants bound to the content collections.
13. **InlineCTA** — the repeated "button + short note" pattern used in several homepage sections.

## Content collections

**`solutions`** (source: `content/copy/solutions/`): `title`, `cardDescription`, `order`, `icon` (inline SVG key), `summary`, `body` (markdown, placeholder until detail copy exists), `relatedCaseStudy` (optional reference), `draft`, `seoDescription`.

**`case-studies`** (source: `content/copy/case-studies/`): `clientLabel` (anonymized descriptor by default; a real client name is allowed only once permission is confirmed per entry — track this with a `clientNameConfirmed` boolean so the default stays safe), `logo` (optional image, only used if permitted per brief.md's "client logos if permitted"), `stat` (string, so it can literally hold `[PLACEHOLDER]`), `summary`, `industry` (optional), `body` (markdown), `outcomes` (optional array), `testimonial` (optional, never fabricated), `featured`, `order`, `draft`.

Proof-strip stats stay inline homepage data, not a third collection — they have no detail pages.

## Build order

**Phase 0 — Setup**
- Download and self-host font files (Inter Tight 300/400/500, Inter 400/500, Cascadia Code 400) into `public/fonts`.

**Phase 1 — Theme foundation**
- `@theme` block in `global.css`: color tokens for baseline, core, ink-2, ink-3, rule, vector, substation (flux excluded from utility-generating tokens since it's gradient-image-only, never a flat color or utility class), font tokens, radius tokens, the 8 named type styles (mobile-first, desktop override under one `min-width` block — verify this responsive-token technique works as expected in Tailwind 4 before committing the whole scale to it; fallback is explicit responsive class pairs).
- Bare `Layout.astro`.
- One shared `prefers-reduced-motion`-gated fade-in utility.

**Phase 2 — `/styleguide` page (checkpoint — stop and show before continuing)**
- Build `Button.astro`, `Label.astro`, `Card.astro` (needed to populate the page).
- Build `/src/pages/styleguide.astro` on the bare Layout, showing every color (with hex + role, flux called out as image-only), all 8 type styles at mobile and desktop sizes, all button variants with hover/focus states, both card variants, a label example, and all 4 gradient images with example white-on-dark / black-on-light text overlays proving the contrast rule.
- This is the point to tune the theme before any real section is built.

**Phase 3 — Remaining shared components**
- Container/Section, Nav, Footer, GradientSection, StatTile, EmptyState, FAQItem, SolutionCard/CaseStudyCard, InlineCTA.

**Phase 4 — Content collections**
- `src/content.config.ts` with the two schemas above.
- 5 solutions entries, titled per brief.md's sitemap (AI Receptionist and Voice Agents, Sales Follow-Up and Call Analysis, Client and Operations Portals, Hiring Automation, Content and Knowledge Systems); card copy from home.md section 4 is real, `body` is `[PLACEHOLDER]`.
- 3 case-study entries from home.md section 6 (2 already have `[PLACEHOLDER]` stats; `body` is `[PLACEHOLDER]`; `clientNameConfirmed` defaults to false).

**Phase 5 — Homepage** (one section per task, in reference-draft order, using home.md copy; drop the modal and the draft's inline calendar placeholder in the final section — every CTA is a plain Button to `/book`)
Hero → Proof strip → Problem → What we build → See it work → Case studies → How it works → Guarantees → Who it's for → Founder note → FAQ → Final CTA.

**Phase 6 — `/book`**
- book.md copy, Cal.com embed pointed at the `[CAL_LINK]` placeholder until the real link lands.
- Per brief.md's booking flow: the Cal.com event needs four fields (name, email, company website, "What would you automate first?") and an instant confirmation email — this is Cal.com event-type configuration, not Astro code, but note it as an action item so the real embed matches the brief once `[CAL_LINK]` lands.

**Phase 7 — Case studies**
- `/case-studies` index (CaseStudyCard grid) + `/case-studies/[slug].astro` detail template via `getStaticPaths`/`getCollection`, one page per project per brief.md. Every detail page ends with a CTA.

**Phase 8 — Solutions**
- `/solutions` index (SolutionCard grid) + `/solutions/[slug].astro` detail template, the 5 entries named in the site map above. Every detail page ends with a CTA.

**Phase 9 — How We Work, About**
- brief.md confirms these are real pages but its content detail cuts off before describing their structure. Build page shells reusing the homepage's "How it works" and "Founder note" content as a starting point, `[PLACEHOLDER]` for anything beyond it, pending the rest of `content/brief.md`.

**Phase 10 — Privacy, Terms**
- `[PLACEHOLDER]` legal text, noindexed, linked from Footer.

**Final polish pass** — swap in real assets as they land (Cal.com link, proof-strip/case-study numbers, founder photo, recording, legal copy, `content/brief.md` itself), check every section at 390px and 1440px, accessibility pass (focus rings, alt text, contrast), commit and push `dev` per section per CLAUDE.md.

**Phase 11 — SEO and launch**
- Title and meta description on every page.
- Wire up favicon/webmanifest links from the existing `public/` files, and `public/og-image-1200x630.png` as the social share image (Open Graph + Twitter card meta).
- Generate `sitemap.xml` and `robots.txt`.
- Add Cloudflare Web Analytics.
- Playwright screenshot pass of every page at 390px and 1440px.
- Launch: merge `dev` into `main` and remove the `noindex` meta tag — **only when you say so**, never automatically.

## What's missing that would block a phase

1. **`content/brief.md` cuts off after the homepage section** — sitemap, homepage, and booking-flow detail are confirmed, but Solutions-page, Case-study-page, How We Work, About, and Privacy/Terms structure are not in the file. Phase 9 and the detail-page structure in Phases 7–8 are best-effort until the rest of the brief lands.
2. **`design/mockups/` (desktop/mobile) and `design/components.png`** — empty/missing. Phase 2's styleguide covers token-level fidelity; section-level composition in Phases 5, 7–10 is best-effort against brand.md + the non-final reference draft until real mockups arrive.
3. **Cal.com link (`[CAL_LINK]`)** — blocks a functional embed in Phase 6; page ships with a clearly marked placeholder.
4. **Two proof-strip numbers + two case-study numbers** — blocks final copy in Phases 5 and 7; kept as literal `[PLACEHOLDER]`.
5. **Founder photo** — blocks the Phase 5 founder-note image; uses the `arch`-gradient EmptyState instead.
6. **60-second voice recording** — blocks the Phase 5 "see it work" audio; placeholder/disabled player.
7. **No copy anywhere yet for How We Work, About, solution detail pages, case-study detail pages, Privacy, Terms** — Phases 7–10 ship as structural shells with `[PLACEHOLDER]` body text throughout.
8. **`design/references.md` items #2 and #3 unfilled** — only one real design reference (ACCURON) exists; low risk since brand.md gives hard tokens, but less guidance for freeform composition in Phases 5, 7–10.

## Verification

- After Phase 2, review `/styleguide` at 390px and 1440px against the token table in `design/brand.md` line by line before any further phase starts.
- After each homepage section in Phase 5, run it at 390px and 1440px, check keyboard focus and `prefers-reduced-motion`, then commit and push `dev` per CLAUDE.md's one-section-per-task rule.
- Before Phases 7–10, re-check against `content/brief.md` once its Solutions/Case-study/How-We-Work/About/Privacy/Terms detail actually lands.
- Before Phase 11 launch, confirm every placeholder in the "what's missing" list has been replaced, then merge `dev` into `main` and remove `noindex` only when told to.
- `npm run build` should stay clean (static output, no adapter) throughout. The only new dependency this plan introduces is Playwright (dev-only, Phase 11), which you've already approved for the screenshot pass.
