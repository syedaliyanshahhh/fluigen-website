# Fluigen website

## Goal
Marketing site for Fluigen, an AI automation agency for owners of established businesses (roughly 10 to 200 staff) in the US, UK, Canada, Australia, New Zealand and Europe.
One goal: visitors book a free automation audit.

## Stack
- Astro + Tailwind CSS, static output, deployed to Cloudflare Pages from GitHub
- Solutions and case studies are Markdown content collections
- No new dependencies without asking first

## Branches and environments
- `dev` branch: all work happens here. Deploys to https://preview.fluigen.com
- `main` branch: production, https://fluigen.com. Only merge `dev` into `main` when I say so
- Until launch, `main` shows a simple holding page
- The preview site is always hidden from search engines (noindex meta tag and `X-Robots-Tag` header), before and after launch. See "Launch settings".

## Launch settings
Both live in `settings` in `src/site.config.ts`.
- `searchIndexing` (currently `false`): set to `true` at launch to let search engines index fluigen.com. It only takes effect on production builds (Cloudflare Pages branch `main`, read from `CF_PAGES_BRANCH`), so preview.fluigen.com stays noindexed whatever it is set to. It controls the robots meta tag, the `X-Robots-Tag` header in `dist/_headers`, and the sitemap line in robots.txt.
- `showSeeItWork` (currently `false`): the homepage "See it work" section. Set to `true` once the 60-second recording is in place. While it is off, "What we build" carries the booking CTA instead, so there is still a CTA after every two sections.
- `/styleguide` and `/404` are always noindexed and left out of the sitemap (`unlistedPaths` in `src/lib/indexing.ts`).

## SEO
- Every page passes `title` and `description` to `Layout.astro`, which adds " | Fluigen", the canonical URL on fluigen.com, Open Graph and X card tags (image `public/og-image-1200x630.png`) and the business details as structured data from `src/site.config.ts`.
- Descriptions come from the "SEO description" lines in content/copy where they exist; case studies use their card summary.
- Pages build as `about.html` (`build.format: "file"`), so URLs have no trailing slash and Cloudflare serves them without a redirect. Internal links never end in `/`.

## Sources of truth
- Exact design values: design/brand.md. Never invent colors, fonts or sizes.
- Layout and feel: design/mockups and design/components.png when they exist. design/reference-draft-homepage.html shows section order and copy only, not final styling.
- Page structure: content/brief.md
- Final words: content/copy. Never write marketing copy. Use [PLACEHOLDER] where copy is missing.
- Never invent testimonials, metrics, client names or logos.
- Site details (business name, city, state, country, email, website, booking link, legal effective date): `src/site.config.ts`. The footer, About, Privacy, Terms, /book and every CTA read from it. Never hard-code these values anywhere else.

## Booking
- Every CTA links to /book. There is no calendar on the homepage.
- /book is the only page with the Calendly calendar, embedded inline
- Calendly link: `bookingUrl` in `src/site.config.ts` (currently https://calendly.com/aliyannshahh/30min)
- Sticky nav button "Book a free audit" on every page, desktop and mobile
- Main CTA wording everywhere else: "Book your free automation audit"

## Integrations
- Case study pages end with a small "Works with" strip listing only the client-facing software from that file's "Works with" section. No "Works with" section means no strip.
- Never show backend or build tools anywhere on the site (n8n, Make.com, Retell AI, Supabase, ElevenLabs, OpenAI and similar). `src/content.config.ts` fails the build if one appears in a "Works with" list.

## Copy rules
- No em dashes, no emoji
- Plain words, no tool names in headlines
- "We" for Fluigen, "I" only in the founder note

## Visual system
Full spec: design/brand.md ("Themes", "Flow gradient", "Scenes", "Glass", "Motion"). On every page:
- Light and dark mode: use the role tokens (`bg-baseline`, `bg-null`, `text-core`, `text-ink-2`, `text-ink-3`, `border-rule`, `outline-ring`) and never hard-code a hex, `bg-white`/`text-black`, or a teal text color. Check every change in both themes.
- Color: the homepage and 404 hero use `<FlowSection variant="hero">`; every marketing page ends with `<PageCTA />` (closing flow band); inner pages start with `<PageHeader>` (soft field). Give some ordinary Sections `glow="left"`/`"right"`, alternating. Never use the design/gradients image files on the site.
- Text on a flow field or in a scene is just `text-core` / `text-ink-2`: their content is a dark theme context. Keep it in the field's dark part and re-measure contrast (4.5:1) if a field changes.
- Rhythm: up to two `<Scene>` sections per page, never adjacent. Cards inside a scene or over a field use `<Card variant="glass">`; glass is used nowhere else except the nav and toggle.
- Motion comes from the shared pieces, not per-page code: Section/Scene content reveals automatically, link cards use `<Card interactive>` inside an `<a class="group">`, CTAs use `<Button>`, nav and footer links wrap their text in `.link-grow`, body links use `.link-u`, numbers go through StatTile/BigNumber. New animations animate only transform, opacity, clip-path or color, and must be off under reduced motion.
- The theme toggle and nav are global (Layout.astro, Nav.astro); don't add page-level fixed elements in the bottom-right corner.

## Build rules
- Mobile first. Check every section across a full range of widths, not just 390px and 1440px — include common phones, tablets, and laptops (1280, 1366, 1440, 1512, 1728, 1920).
- Responsive system: container width/padding, section spacing, nav/footer sizing and the type scale are all fluid `clamp()` values defined once in `src/styles/global.css` (see design/brand.md "Layout"), scaling continuously between a 375px and a 1440px anchor. Reuse those utilities (`container-content`, `section-y`, `text-*`, `footer-y`, `--nav-h`) for any new section. Don't add a fixed pixel value or a new `@media`-stepped override for spacing or type — if a value genuinely needs its own range, add another anchored `clamp()` the same way instead.
- Semantic HTML, alt text on images, visible keyboard focus, readable contrast
- Respect prefers-reduced-motion (see "Visual system")
- One section per task. Stop and show me before moving on.
- Commit after each section that works, then push `dev` so it appears on preview.fluigen.com
