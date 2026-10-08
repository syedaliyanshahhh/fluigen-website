// Parses the plain copy format used in content/copy/solutions and
// content/copy/case-studies:
//
//   # Title
//   Key: value            <- meta lines, before the first "##"
//   ## Section heading
//   Paragraph line
//   - list item
//
// Each non-empty line is its own paragraph; consecutive "- " lines form one
// list. A section with no lines left in it is dropped entirely, so deleting
// a [PLACEHOLDER] line from a copy file removes that section from the page
// instead of leaving an empty gap.

export type Block = { type: "p"; text: string } | { type: "ul"; items: string[] };

export interface CopyDoc {
	title: string;
	meta: Record<string, string>;
	sections: Record<string, Block[]>;
}

export function isPlaceholder(text: string | undefined): boolean {
	return Boolean(text && text.includes("[PLACEHOLDER"));
}

export function parseCopy(raw: string): CopyDoc {
	const doc: CopyDoc = { title: "", meta: {}, sections: {} };
	let current: Block[] | undefined;

	for (const rawLine of raw.split(/\r?\n/)) {
		const line = rawLine.trim();
		if (!line) continue;

		if (line.startsWith("## ")) {
			current = [];
			doc.sections[line.slice(3).trim().toLowerCase()] = current;
		} else if (line.startsWith("# ")) {
			doc.title = line.slice(2).trim();
		} else if (!current) {
			const match = line.match(/^([^:]+):\s*(.*)$/);
			if (match && match[2]) doc.meta[match[1].trim().toLowerCase()] = match[2].trim();
		} else if (line.startsWith("- ")) {
			const last = current.at(-1);
			if (last?.type === "ul") last.items.push(line.slice(2).trim());
			else current.push({ type: "ul", items: [line.slice(2).trim()] });
		} else {
			current.push({ type: "p", text: line });
		}
	}

	for (const [key, blocks] of Object.entries(doc.sections)) {
		if (blocks.length === 0) delete doc.sections[key];
	}
	return doc;
}

/** All text in a section as one string (for single-line sections like Works with). */
export function sectionText(blocks: Block[] | undefined): string {
	return (blocks ?? [])
		.map((block) => (block.type === "p" ? block.text : block.items.join(", ")))
		.join(" ")
		.trim();
}

/** Comma-separated slugs, e.g. "Related case studies: a, b". */
export function slugList(value: string | undefined): string[] {
	return (value ?? "")
		.split(",")
		.map((slug) => slug.trim())
		.filter(Boolean);
}
