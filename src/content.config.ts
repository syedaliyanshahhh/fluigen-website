import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import { defineCollection } from "astro:content";
import type { Loader } from "astro/loaders";
import { z } from "astro/zod";
import { type CopyDoc, parseCopy, sectionText, slugList } from "./lib/copy-format";

// Solutions and case studies are read straight from the plain copy files in
// content/copy (no frontmatter), so content/copy stays the only place the
// words live. See src/lib/copy-format.ts for the format.
function copyLoader(dir: string, toData: (doc: CopyDoc, file: string) => { id: string; data: Record<string, unknown> }): Loader {
	return {
		name: "copy-loader",
		load: async ({ store, parseData, watcher }) => {
			const absDir = path.resolve(dir);

			async function sync() {
				store.clear();
				const files = (await readdir(absDir)).filter((file) => file.endsWith(".md"));
				for (const file of files) {
					const doc = parseCopy(await readFile(path.join(absDir, file), "utf8"));
					const { id, data } = toData(doc, path.basename(file, ".md"));
					store.set({ id, data: await parseData({ id, data }) });
				}
			}

			await sync();
			watcher?.add(absDir);
			watcher?.on("all", (_event, changed) => {
				if (changed.startsWith(absDir)) sync();
			});
		},
	};
}

const block = z.discriminatedUnion("type", [
	z.object({ type: z.literal("p"), text: z.string() }),
	z.object({ type: z.literal("ul"), items: z.array(z.string()) }),
]);
const blocks = z.array(block).default([]);

// Icons aren't part of the copy; one per solution slug (Lucide, see Icon.astro).
const solutionIcons: Record<string, string> = {
	"ai-receptionist-and-voice-agents": "phone-call",
	"sales-follow-up-and-call-analysis": "headset",
	"client-and-operations-portals": "layout-dashboard",
	"hiring-automation": "users",
	"content-and-knowledge-systems": "book-open",
};

const solutions = defineCollection({
	loader: copyLoader("content/copy/solutions", (doc, file) => ({
		id: file,
		data: {
			title: doc.title,
			order: Number(doc.meta.order),
			cardLine: doc.meta["card line"],
			seoDescription: doc.meta["seo description"],
			icon: solutionIcons[file],
			relatedCaseStudies: slugList(doc.meta["related case studies"]),
			problem: doc.sections["the problem"],
			build: doc.sections["what we build"],
			changes: doc.sections["what changes"],
			timeline: doc.sections["typical timeline"],
		},
	})),
	schema: z.object({
		title: z.string().min(1),
		order: z.number(),
		cardLine: z.string(),
		seoDescription: z.string().optional(),
		icon: z.enum(["phone-call", "headset", "layout-dashboard", "users", "book-open"]),
		relatedCaseStudies: z.array(z.string()),
		problem: blocks,
		build: blocks,
		changes: blocks,
		timeline: blocks,
	}),
});

const caseStudies = defineCollection({
	loader: copyLoader("content/copy/case-studies", (doc, file) => {
		const featured = doc.meta["featured on homepage"] ?? "";
		const testimonial = doc.sections.testimonial;
		const tools = sectionText(doc.sections.tools);
		return {
			id: doc.meta.slug ?? file,
			data: {
				title: doc.title,
				clientLabel: doc.meta["client label"],
				featured: /^yes/i.test(featured),
				featuredOrder: Number(featured.match(/order\s+(\d+)/i)?.[1] ?? 99),
				headlineNumber: doc.meta["headline number"],
				numberCaption: doc.meta["number caption"],
				summary: doc.meta["card summary"],
				relatedSolution: doc.meta["related solution"],
				problem: doc.sections["the problem"],
				built: doc.sections["what we built"],
				result: doc.sections["the result"],
				// "None yet" means no testimonial: never show one that isn't real.
				testimonial: /^none\b/i.test(sectionText(testimonial)) ? [] : testimonial,
				tools: !tools ? [] : tools.includes("[PLACEHOLDER") ? [tools] : tools.split(",").map((t) => t.trim()).filter(Boolean),
			},
		};
	}),
	schema: z.object({
		title: z.string().min(1),
		clientLabel: z.string(),
		featured: z.boolean(),
		featuredOrder: z.number(),
		headlineNumber: z.string().optional(),
		numberCaption: z.string().optional(),
		summary: z.string(),
		relatedSolution: z.string().optional(),
		problem: blocks,
		built: blocks,
		result: blocks,
		testimonial: blocks,
		tools: z.array(z.string()),
	}),
});

export const collections = {
	solutions,
	"case-studies": caseStudies,
};
