// Shared queries for the solutions and case-studies collections. Cross-links
// between them are checked here: a slug in a copy file that doesn't match a
// real entry fails the build instead of shipping a broken link.
import { type CollectionEntry, getCollection } from "astro:content";

export type Solution = CollectionEntry<"solutions">;
export type CaseStudy = CollectionEntry<"case-studies">;

export async function getSolutions(): Promise<Solution[]> {
	return (await getCollection("solutions")).sort((a, b) => a.data.order - b.data.order);
}

/** Featured (homepage order) first, then the rest grouped by their solution's order. */
export async function getCaseStudies(): Promise<CaseStudy[]> {
	const solutions = await getSolutions();
	const solutionOrder = (entry: CaseStudy) =>
		solutions.find((s) => s.id === entry.data.relatedSolution)?.data.order ?? 99;
	return (await getCollection("case-studies")).sort(
		(a, b) =>
			Number(b.data.featured) - Number(a.data.featured) ||
			a.data.featuredOrder - b.data.featuredOrder ||
			solutionOrder(a) - solutionOrder(b) ||
			a.data.title.localeCompare(b.data.title),
	);
}

export async function getFeaturedCaseStudies(): Promise<CaseStudy[]> {
	return (await getCaseStudies()).filter((entry) => entry.data.featured);
}

export async function getRelatedCaseStudies(solution: Solution): Promise<CaseStudy[]> {
	const all = await getCollection("case-studies");
	return solution.data.relatedCaseStudies.map((slug) => {
		const match = all.find((entry) => entry.id === slug);
		if (!match) {
			throw new Error(`Solution "${solution.id}" lists unknown case study "${slug}" in "Related case studies".`);
		}
		return match;
	});
}

export async function getRelatedSolution(caseStudy: CaseStudy): Promise<Solution | undefined> {
	const slug = caseStudy.data.relatedSolution;
	if (!slug) return undefined;
	const match = (await getCollection("solutions")).find((entry) => entry.id === slug);
	if (!match) {
		throw new Error(`Case study "${caseStudy.id}" lists unknown solution "${slug}" in "Related solution".`);
	}
	return match;
}
