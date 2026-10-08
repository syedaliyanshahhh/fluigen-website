// Site details, single source of truth (content/copy/site-details.md).
// The footer, About, Privacy, Terms, /book and every booking CTA read from
// here, so a change to any of these values updates the whole site.
export const site = {
	businessName: "Fluigen",
	// Footer line, homepage title and share-image alt text.
	tagline: "AI automation for growing businesses",
	city: "Chicago",
	state: "Illinois",
	country: "United States",
	email: "fluigensupport@gmail.com",
	website: "fluigen.com",
	// The Calendly page embedded on /book.
	bookingUrl: "https://calendly.com/aliyannshahh/30min",
	// Every CTA on the site links here (CLAUDE.md "Booking"); /book holds the calendar.
	bookingPath: "/book",
	legalEffectiveDate: "October 2026",
	// Where Fluigen works (CLAUDE.md "Goal"); used in the search engine business details.
	areasServed: ["United States", "United Kingdom", "Canada", "Australia", "New Zealand", "Europe"],
};

export const siteLocation = `${site.city}, ${site.state}, ${site.country}`;

// Canonical home of every page, and the preview copy of the site (CLAUDE.md "Branches").
export const siteUrl = `https://${site.website}`;
export const previewUrl = `https://preview.${site.website}`;

// Launch switches (CLAUDE.md "Launch settings").
export const settings = {
	// false: every page is hidden from search engines. true: the production
	// site (the `main` branch on fluigen.com) can be indexed. The preview
	// site stays hidden either way.
	searchIndexing: true,
	// The homepage "See it work" section. Turn on once the 60-second
	// recording is in place.
	showSeeItWork: false,
};
