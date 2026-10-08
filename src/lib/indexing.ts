// Which build is this, and may search engines index it? Read by Layout.astro
// (robots meta), robots.txt and astro.config.mjs (the X-Robots-Tag header).
//
// Cloudflare Pages sets CF_PAGES_BRANCH for every build: `main` is production
// on fluigen.com, anything else (dev, local builds) is the preview. Only a
// production build with `settings.searchIndexing` on is indexable, so the
// preview site can never be indexed by accident.
import { previewUrl, settings, siteUrl } from "../site.config";

export const isProductionBuild = process.env.CF_PAGES_BRANCH === "main";

export const indexable = settings.searchIndexing && isProductionBuild;

/** Origin this build is served from: absolute URLs for share previews point here. */
export const deployOrigin = isProductionBuild ? siteUrl : previewUrl;

/** Pages that never appear in search results or the sitemap, even after launch. */
export const unlistedPaths = ["/styleguide", "/404"];
