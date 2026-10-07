import { defineCollection, reference } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const solutions = defineCollection({
	loader: glob({ pattern: "**/*.md", base: "content/copy/solutions" }),
	schema: z.object({
		title: z.string(),
		cardDescription: z.string(),
		order: z.number(),
		icon: z.enum(["phone-call", "headset", "layout-dashboard", "users", "book-open"]),
		summary: z.string(),
		relatedCaseStudy: reference("case-studies").optional(),
		draft: z.boolean().default(false),
		seoDescription: z.string(),
	}),
});

const caseStudies = defineCollection({
	loader: glob({ pattern: "**/*.md", base: "content/copy/case-studies" }),
	schema: ({ image }) =>
		z.object({
			clientLabel: z.string(),
			clientNameConfirmed: z.boolean().default(false),
			logo: image().optional(),
			stat: z.string(),
			summary: z.string(),
			industry: z.string().optional(),
			outcomes: z.array(z.string()).optional(),
			testimonial: z.string().optional(),
			featured: z.boolean().default(false),
			order: z.number(),
			draft: z.boolean().default(false),
		}),
});

export const collections = {
	solutions,
	"case-studies": caseStudies,
};
