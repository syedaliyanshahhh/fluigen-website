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
- Every page on preview has `<meta name="robots" content="noindex">` until launch

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

## Copy rules
- No em dashes, no emoji
- Plain words, no tool names in headlines
- "We" for Fluigen, "I" only in the founder note

## Build rules
- Mobile first. Check every section across a full range of widths, not just 390px and 1440px — include common phones, tablets, and laptops (1280, 1366, 1440, 1512, 1728, 1920).
- Responsive system: container width/padding, section spacing, nav/footer sizing and the type scale are all fluid `clamp()` values defined once in `src/styles/global.css` (see design/brand.md "Layout"), scaling continuously between a 375px and a 1440px anchor. Reuse those utilities (`container-content`, `section-y`, `text-*`, `footer-y`, `--nav-h`) for any new section. Don't add a fixed pixel value or a new `@media`-stepped override for spacing or type — if a value genuinely needs its own range, add another anchored `clamp()` the same way instead.
- Semantic HTML, alt text on images, visible keyboard focus, readable contrast
- Respect prefers-reduced-motion
- One section per task. Stop and show me before moving on.
- Commit after each section that works, then push `dev` so it appears on preview.fluigen.com
