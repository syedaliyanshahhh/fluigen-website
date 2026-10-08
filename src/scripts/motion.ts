// Site-wide motion (design/brand.md "Motion"), loaded once by Layout.astro.
//
// - Scroll reveals: inside every `[data-reveal-scope]` (each Section and
//   Scene, PageCTA), the container's direct children fade and rise in as
//   they reach the viewport. A grid or list among them reveals its own
//   children one after another instead. `data-reveal-children` on a scope
//   reveals that element's direct children.
// - Count-ups: `[data-count]` numbers (StatTile, BigNumber) count from zero
//   to their value the first time they scroll into view.
// - Card glow: `[data-glow]` cards carry `--mx`/`--my` for the light that
//   follows the cursor (motion.css `.card-hover`).
//
// With reduced motion, `html.motion` is never set (Layout.astro), nothing is
// hidden, numbers show their final value and the card glow stays centred.

declare global {
	interface Window {
		__flMotion?: boolean;
	}
}

const root = document.documentElement;
const motionOK = root.classList.contains("motion");
window.__flMotion = true;

// ---------- Reveals ----------

function revealTargets(scope: Element): Element[] {
	const base = scope.hasAttribute("data-reveal-children")
		? Array.from(scope.children)
		: Array.from(scope.querySelector(".container-content")?.children ?? []);

	return base.flatMap((el) => {
		const staggers = el.matches(".grid, ul, ol, [data-stagger]") && el.children.length > 1;
		return staggers ? Array.from(el.children) : [el];
	});
}

if (motionOK && "IntersectionObserver" in window) {
	const observer = new IntersectionObserver(
		(entries) => {
			for (const entry of entries) {
				if (!entry.isIntersecting) continue;
				entry.target.classList.add("is-in");
				observer.unobserve(entry.target);
			}
		},
		{ rootMargin: "0px 0px -8% 0px", threshold: 0.08 },
	);

	// Anything already on screen when this runs stays as painted: hiding it
	// now to fade it back in would only flash.
	const fold = window.innerHeight;

	document.querySelectorAll("[data-reveal-scope]").forEach((scope) => {
		let index = 0;
		let lastParent: Element | null = null;
		for (const target of revealTargets(scope)) {
			if (!(target instanceof HTMLElement) || target.closest("[data-reveal]")) continue;
			if (target.getBoundingClientRect().top < fold) continue;
			// Stagger restarts for each group of siblings.
			if (target.parentElement !== lastParent) index = 0;
			lastParent = target.parentElement;
			target.dataset.reveal = "";
			target.style.setProperty("--i", String(index++));
			observer.observe(target);
		}
	});
} else {
	root.classList.remove("motion");
}

// ---------- Count-ups ----------

// Only a leading whole number of 10 or more counts, followed by nothing,
// a space, % , + or x ("16", "45 days", "300%"). "24/7" and "2 to 3" stay
// as written: counting them would read oddly.
const COUNTABLE = /^(\d{2,}(?:,\d{3})*)(?=$|[\s%+x])(.*)$/s;

function countUp(el: HTMLElement) {
	const text = el.textContent?.trim() ?? "";
	const match = text.match(COUNTABLE);
	if (!match) return;
	const [, digits, rest] = match;
	const target = Number(digits.replace(/,/g, ""));
	const grouped = digits.includes(",");
	const format = (n: number) => (grouped ? n.toLocaleString("en-US") : String(n));

	// Screen readers get the final value once; the ticking digits are hidden.
	el.setAttribute("aria-label", text);
	const live = document.createElement("span");
	live.setAttribute("aria-hidden", "true");
	el.textContent = "";
	el.append(live);

	const duration = 1600;
	const start = performance.now();
	const tick = (now: number) => {
		const t = Math.min(1, (now - start) / duration);
		const eased = 1 - Math.pow(1 - t, 4);
		live.textContent = format(Math.round(target * eased)) + rest;
		if (t < 1) requestAnimationFrame(tick);
	};
	live.textContent = format(0) + rest;
	requestAnimationFrame(tick);
}

if (motionOK && "IntersectionObserver" in window) {
	const counter = new IntersectionObserver(
		(entries) => {
			for (const entry of entries) {
				if (!entry.isIntersecting) continue;
				counter.unobserve(entry.target);
				// Let the reveal start first so the number rises while it counts.
				window.setTimeout(() => countUp(entry.target as HTMLElement), 150);
			}
		},
		{ threshold: 0.6 },
	);
	document.querySelectorAll<HTMLElement>("[data-count]").forEach((el) => counter.observe(el));
}

// ---------- Card glow that follows the cursor ----------

if (window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
	let frame = 0;
	let pending: { el: HTMLElement; x: number; y: number } | null = null;

	document.addEventListener(
		"pointermove",
		(event) => {
			const el = (event.target as Element | null)?.closest<HTMLElement>("[data-glow]");
			if (!el) return;
			pending = { el, x: event.clientX, y: event.clientY };
			if (frame) return;
			frame = requestAnimationFrame(() => {
				frame = 0;
				if (!pending) return;
				const rect = pending.el.getBoundingClientRect();
				pending.el.style.setProperty("--mx", `${pending.x - rect.left}px`);
				pending.el.style.setProperty("--my", `${pending.y - rect.top}px`);
			});
		},
		{ passive: true },
	);
}

export {};
