// Site details, single source of truth (content/copy/site-details.md).
// The footer, About, Privacy, Terms, /book and every booking CTA read from
// here, so a change to any of these values updates the whole site.
export const site = {
	businessName: "Fluigen",
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
};

export const siteLocation = `${site.city}, ${site.state}, ${site.country}`;
