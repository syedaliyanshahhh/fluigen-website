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

## Booking
- Every CTA links to /book. There is no calendar on the homepage.
- /book is the only page with the Cal.com calendar, embedded inline
- Cal.com link: [CAL_LINK]
- Sticky nav button "Book a free audit" on every page, desktop and mobile
- Main CTA wording everywhere else: "Book your free automation audit"

## Copy rules
- No em dashes, no emoji
- Plain words, no tool names in headlines
- "We" for Fluigen, "I" only in the founder note

## Build rules
- Mobile first. Check every section at 390px and 1440px.
- Semantic HTML, alt text on images, visible keyboard focus, readable contrast
- Respect prefers-reduced-motion
- One section per task. Stop and show me before moving on.
- Commit after each section that works, then push `dev` so it appears on preview.fluigen.com
