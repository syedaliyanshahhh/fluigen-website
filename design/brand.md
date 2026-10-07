# Fluigen brand values

Full guidelines: design/fluigen-brand-guidelines.pdf. This file holds the exact values to put in the Tailwind theme.

## Colors

| Token | Hex | Role |
|---|---|---|
| baseline | #F7F7F7 | Page background |
| null | #FFFFFF | Cards and surfaces |
| core | #000000 | Body text, headlines, primary button |
| ink-2 | #3A3A3A | Secondary text |
| ink-3 | #6B6B6B | Muted text, captions |
| rule | #DCDCDC | Borders and dividers |
| flux | #97C1C5 | Gradients only |
| vector | #267B85 | Gradients, focus ring, hover details, 2px lines |
| substation | #02525E | Gradients, fallback background behind gradient images |

Rules:
- Teal never appears as a large flat block and never as headline or body text color.
- Text is black on light backgrounds, white on the dark part of a gradient.
- About 80% of every page is baseline or white space.

## Gradients
- Always use the image files in design/gradients. Never recreate them with CSS gradients.
- Use them for at most two moments per page: the hero, and optionally the final call-to-action band.
- White text only on the dark part of a gradient, black text only on the light part.
- Files: horizon (hero), mist (final CTA), edge (light sections that need a hint of color), arch (founder photo frame or empty states).

## Typography
Load from Google Fonts: Inter Tight (300, 400, 500), Inter (400, 500), Cascadia Code (400).

| Style | Font | Desktop size / line height | Mobile | Weight | Tracking |
|---|---|---|---|---|---|
| Hero H1 | Inter Tight | 104 / 100 | 44 / 46 | 300 | -4.5% |
| H1 (inner pages) | Inter Tight | 72 / 72 | 40 / 42 | 400 | -3% |
| H2 | Inter Tight | 56 / 58 | 34 / 36 | 400 | -3% |
| H3 | Inter Tight | 28 / 34 | 22 / 28 | 400 | -1.5% |
| Body | Inter | 18 / 29 | 17 / 27 | 400 | 0 |
| Small | Inter | 15 / 22 | 15 / 22 | 400 | 0 |
| Label | Cascadia Code | 13 / 18 | 12 / 16 | 400 | +4%, uppercase, sparingly |
| Big number | Inter Tight | 72 / 72 | 48 / 48 | 300 | -5% |

- Headlines are sentence case.
- Keep line length under 70 characters for body text.
- Labels in Cascadia Code are optional texture, not a heading above every section.

## Layout

Fluid, not stepped. Every value below scales continuously with the viewport between a 375px mobile anchor and a 1440px desktop anchor (1440 is the most common laptop logical width), then holds flat outside that range. Nothing snaps at a breakpoint — resize the window and sizes glide. The pixel values below are the two endpoints of that scale, not fixed sizes. Implementation is `clamp()` in `src/styles/global.css`, one per property, each following `clamp(mobile, intercept + slope·vw, desktop)` for the same two anchors. See CLAUDE.md's "Responsive system" rule before changing any of it.

- Container: max width 1440px, centered. Side padding scales 20px (375px viewport) to 64px (1440px viewport). Nav, page content and footer all use this same container, so the logo, every heading and the footer share one left edge, and the nav button and footer links share one right edge. At the common laptop widths (1280, 1366, 1440), this leaves little to no dead space outside the container — it was previously capped at 1280px, which left a visible empty margin on anything wider.
- Section vertical spacing: scales 80px (375px) to 150px (1440px).
- Inner-page text columns align to the container's left edge (never centered or offset), max width 720px. This is independent of the container's own max-width.
- Nav: height scales 64px (375px) to 76px (1440px). Logo height scales 26px to 30px. Sticky, with a 1px rule border that only appears after scrolling. The mobile menu panel reads the same `--nav-h` custom property as the header so its top offset always matches the header's real height, at any width.
- Footer: padding scales 64px to 96px top, 32px to 40px bottom (375px to 1440px).
- Type scale (hero H1, H1, H2, H3, body, label, big number): font-size and line-height both fluid between the mobile and desktop values in the table above. Letter-spacing and font-weight stay constant (brand.md gives one value, not a pair). Small text stays flat 15px/22px at every width, no fluid range.
- Card radius 20px, large panel radius 28px, buttons fully rounded (pill)
- No drop shadows. Separate things with space, white surfaces, and 1px rules.
- No horizontal scrolling at any width. Tap targets at least 44px. Body text at least 16px on mobile.

## Buttons and links
- Primary: black pill, white text, Inter Tight 500, 17px, padding 15px 26px. On a gradient: white pill, black text.
- Secondary: transparent, 1.5px black outline, same size.
- Text link: black, underline with 5px offset, 1px thickness.
- Focus: 2px vector outline, 3px offset.
- Hover: lift 1px. No color changes to teal.

## Logo
- Files in design/logos
- Header: fluigen-horizontal-black.svg (or fluigen-horizontal-gradient.svg if it looks better there), 30px tall
- On dark gradient: fluigen-horizontal-white.svg
- Never recolor, stretch or add effects

## Icons
- Lucide, 1.5px stroke, black, only where they help comprehension

## Motion
- Subtle fades only. One page-load moment in the hero at most. Respect prefers-reduced-motion.

## Dark mode
- Not at launch. Light theme only.
