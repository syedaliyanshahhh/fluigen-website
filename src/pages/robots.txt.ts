// robots.txt. Before launch, and always on the preview site, crawlers are
// allowed to fetch pages so they can read each page's noindex and drop it;
// blocking them here would hide that instruction. After launch the
// production site points crawlers at the sitemap.
import type { APIRoute } from "astro";
import { siteUrl } from "../site.config";
import { indexable } from "../lib/indexing";

export const GET: APIRoute = () => {
	const lines = indexable
		? ["User-agent: *", "Allow: /", "", `Sitemap: ${siteUrl}/sitemap-index.xml`]
		: ["User-agent: *", "Allow: /"];
	return new Response(lines.join("\n") + "\n", { headers: { "Content-Type": "text/plain; charset=utf-8" } });
};
