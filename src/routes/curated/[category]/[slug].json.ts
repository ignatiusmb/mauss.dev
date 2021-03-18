import type { Curated } from '$lib/utils/types';
import { generateId } from '$lib/utils/helper';
import { parseFile } from '$lib/utils/parser';

export async function get({ params }) {
	const { category, slug } = params;
	const filepath = `content/curated/${category}/${slug}.md`;

	const file = parseFile<Curated>(filepath, ({ frontMatter, content }) => {
		const headings = Array.from(content.matchAll(/^## (.*)/gm), (v) => v[1]);
		const toc = headings.map((raw) => ({ id: generateId(raw), cleaned: raw.split(' | ')[0] }));
		return { slug: `${category}/${slug}`, ...frontMatter, category, toc, content };
	});

	return {
		status: 200,
		headers: { 'Content-Type': 'application/json' },
		body: file,
	};
}
