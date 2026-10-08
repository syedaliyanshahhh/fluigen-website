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
- About 80% of every page is baseline or white space (or its dark-mode equivalent).

## Themes
Light and dark mirror each other exactly: same layout, same components. Token names are roles, so they swap values, not meaning. Implementation: `src/styles/theme.css`.

| Token | Light | Dark | Role |
|---|---|---|---|
| baseline | #F7F7F7 | #0A0F10 | Page background |
| null | #FFFFFF | #121A1B | Cards and surfaces |
| core | #000000 | #F7F7F7 | Text, headlines, primary button |
| ink-2 | #3A3A3A | #C9D2D3 | Secondary text |
| ink-3 | #6B6B6B | #8FA0A2 | Muted text, captions |
| rule | #DCDCDC | #26302F | Borders and dividers |
| ring | vector #267B85 | flux #97C1C5 | Focus ring |

Dark values come from design/reference-draft-homepage.html. The teal palette (flux, vector, substation) never swaps. `deep` is substation mixed toward black, used only as the darkest part of a flow field.

- The page theme follows the visitor's system setting until they choose with the toggle; the choice is remembered (`localStorage` key `fluigen-theme`). An inline script in `Layout.astro` sets it before first paint, so the wrong theme never flashes.
- Any element with `data-theme="dark"` (or `"light"`) opens its own theme context: everything inside uses that theme's tokens. The closing band and scenes use this for their content, so white-on-teal needs no special button or text variants. Hero content follows the page theme.
- Logos swap with `.only-light` / `.only-dark` (black logo on light, white logo on dark).
- In dark mode: primary button is a near-white pill with black text, ambient glows are stronger.
- The hero is where the two themes differ most: light is an airy near-white sky with a faint flux mist and black text; dark is near black with one muted teal glow and white text.

## Theme toggle
- A small glass pill with a sliding knob (sun, moon), fixed to the bottom-right corner of every page, after ACCURON's pill toggle. 44px tap target.
- Switching spreads the new theme out in a circle from the toggle (view transition), or crossfades colors where unsupported. Instant with reduced motion.
- It never covers content: when it comes to rest over a link, button, form field, image or line of text it fades away, and on touch screens it steps aside while the page scrolls. The footer keeps a clear zone for it at the end of every page, and the mobile menu has a second switch so the theme can always be changed.

## Flow gradient
Replaces the static gradient images (design/gradients stays as palette reference only; the site no longer uses those files). Implementation: `FlowField.astro` and `src/styles/flow.css`.

- A living field of soft radial light in deep, substation, vector and flux, with static film grain. Blobs drift slowly (32 to 46 second cycles) and the whole field shifts gently as its section scrolls past (CSS scroll-driven animation where supported).
- Never a hard edge: every field dissolves into the page. Hero and closing fields bleed past their sections; glows are larger than their sections and fade out long before their box ends.
- Performance: transform-only animation on compositor layers, no JavaScript per frame, paused while off screen, static under reduced motion.
- Strength by place:
  - `hero`: behind the floating nav: the full-screen homepage hero, /book, and the short hero that opens every other page (PageHero), Privacy and Terms excepted. Minimal and low in saturation. Light: near-white with a soft flux mist from the top right and a hint of vector. Dark: near black with one muted substation glow. Its content follows the page theme (black text on light, white on dark).
  - `closing`: the final call to action band (PageCTA) on every marketing page.
  - `soft`: light haze behind the legal page headers and the mobile menu.
  - `glow-left` / `glow-right`: one faint drifting light behind an ordinary Section (`<Section glow="left">`). Alternate sides and leave some sections plain.
  - `scene` and `arch`: teal light rising out of black, inside scenes and empty-state panels.
- Text on the closing field is white and stays in its dark part (upper left; the light part dissolves at the bottom right). Every text element over a field or in a scene measures at least 4.5:1 at its worst drift position, from 375px to 1920px, in both themes. Recheck if a field's stops or blobs change.
- Homepage hero lines (FlowLines.astro): the icon drawn as a full-bleed band of hairlines in core at low opacity, a couple of long waves per line merging into one, fading in from the left and out at the right. The travelling sheen is the only accent (vector on light, flux on dark).

## Scenes
- A deep section for alternating rhythm, like ACCURON's dark scenes: black stage, teal light, white text, inset from the viewport edge (8px to 24px) with a large radius (28px to 40px). Content keeps the page container's left edge.
- Its content is a dark theme context in both page themes. Muted text steps up to ink-2 inside a scene to hold contrast over the light.
- At most two per page, never two in a row. Cards inside a scene use the glass card.

## Glass
- Frosted surface (18px blur, 1px light edge) for things that float over color only: the nav bar, the theme toggle, and cards over a flow field or in a scene. Ordinary cards stay solid `null`.
- Text on glass is the surrounding theme's `core` / `ink-2`. The tint holds 4.5:1 over the darkest and lightest parts of a field; without backdrop-filter support it falls back to a stronger tint.

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
| Hero number (case study lead) | Inter Tight | 104 / 104 | 48 / 48 | 300 | -5% |

- Headlines are sentence case.
- Keep line length under 70 characters for body text.
- Labels in Cascadia Code are optional texture, not a heading above every section.

## Layout

Fluid, not stepped. Every value below scales continuously with the viewport between a 375px mobile anchor and a 1440px desktop anchor (1440 is the most common laptop logical width), then holds flat outside that range. Nothing snaps at a breakpoint — resize the window and sizes glide. The pixel values below are the two endpoints of that scale, not fixed sizes. Implementation is `clamp()` in `src/styles/global.css`, one per property, each following `clamp(mobile, intercept + slope·vw, desktop)` for the same two anchors. See CLAUDE.md's "Responsive system" rule before changing any of it.

- Container: max width 1440px, centered. Side padding scales 20px (375px viewport) to 64px (1440px viewport). Nav, page content and footer all use this same container, so the logo, every heading and the footer share one left edge, and the nav button and footer links share one right edge. At the common laptop widths (1280, 1366, 1440), this leaves little to no dead space outside the container — it was previously capped at 1280px, which left a visible empty margin on anything wider.
- Section vertical spacing: scales 80px (375px) to 150px (1440px).
- Inner-page text columns align to the container's left edge (never centered or offset), max width 720px. This is independent of the container's own max-width.
- Nav: a sticky strip of `--nav-h` (64px to 76px) holding a floating glass bar, 52px to 60px tall, that turns compact after scrolling (46px to 52px, logo 30px down to 26px, firmer glass). The bar's own padding sits in the container gutter, so the logo keeps the container's left edge. Logo height scales 26px to 30px. The mobile menu panel starts below the same `--nav-h`.
- Footer: padding scales 64px to 96px top, 32px to 40px bottom (375px to 1440px).
- Type scale (hero H1, H1, H2, H3, body, label, big number): font-size and line-height both fluid between the mobile and desktop values in the table above. Letter-spacing and font-weight stay constant (brand.md gives one value, not a pair). Small text stays flat 15px/22px at every width, no fluid range.
- Card radius 20px, large panel radius 28px, buttons fully rounded (pill)
- No drop shadows on resting elements. Separate things with space, surfaces, and 1px rules. The only shadows are the soft teal halo under a hovered card and the glass edge.
- No horizontal scrolling at any width. Tap targets at least 44px. Body text at least 16px on mobile.

## Buttons and links
- Primary: pill in `core` with `baseline`-contrast text (black on light, near-white on dark and in any dark context such as a flow section or scene), Inter Tight 500, 17px, padding 15px 26px. Booking CTAs carry a small arrow.
- Secondary: transparent, 1.5px core outline, same size.
- Text link: core, 1px underline about 5px below the baseline.
- Focus: 2px ring outline (vector on light, flux on dark), 3px offset.
- Hover: lift 1px and a fill sweeps across from the left (substation on light, flux on dark; text stays at 4.5:1 or better); the arrow slips out to the right and back in from the left. Press: squeeze to 96.5%. Secondary fills with core.
- Underlines: always-underlined links wipe the line out and redraw it on hover; nav and footer links draw it in on hover only.

## Logo
- Files in design/logos
- Header: fluigen-horizontal-black.svg (or fluigen-horizontal-gradient.svg if it looks better there), 30px tall
- On dark gradient: fluigen-horizontal-white.svg
- Never recolor, stretch or add effects

## Icons
- Lucide, 1.5px stroke, black, only where they help comprehension

## Motion
Implementation: `src/styles/motion.css`, `src/scripts/motion.ts` and per-component scripts. Easing is a soft ease-out (`--ease-out`); nothing bounces except the toggle knob.

- Page load: one moment per page. The hero (or inner page header) content rises in, children staggered 80ms; the largest text starts at once.
- Scroll reveals: inside every Section, Scene and closing band, the container's direct children fade and rise in as they reach the viewport; grids and lists reveal their children one after another (90ms stagger, at most 6 steps). Content already on screen when the page loads is never hidden.
- Count-ups: big numbers count from zero the first time they scroll into view (only a leading number of 10 or more; "24/7" and "2 to 3" stay as written). Screen readers get the final value.
- Cards: link cards lift 4px with a soft teal halo, and a faint light follows the cursor across them.
- FAQ: smooth height open and close; the chevron turns.
- Mobile menu: the panel wipes down from the bar, its links rise in one after another, the menu icon folds into a cross.
- Page transitions: pages crossfade with a short rise (cross-document view transitions) while the nav and toggle stay put. Links prefetch on hover so pages arrive quickly. Scrolling stays native (smooth only for in-page anchors); it is never hijacked.
- Reduced motion: no reveals, no count-ups, no drift, no scroll reaction, no view transitions, instant FAQ and theme switch. Everything is visible and static.
