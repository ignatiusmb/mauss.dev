import type { Curated } from '$utils/types';
import TexMath from 'markdown-it-texmath';
import KaTeX from 'katex';
import { marker, parseFile } from 'marqua';

marker.use(TexMath, {
	engine: KaTeX,
	delimiters: 'dollars',
	katexOptions: {
		throwOnError: true,
		macros: { '\\RR': '\\mathbb{R}' },
	},
});

export async function get({ params }) {
	const { category, slug } = params;
	const filepath = `content/curated/${category}/${slug}.md`;

	const file = parseFile<Curated>(filepath, ({ frontMatter, content }) => {
		return { slug: `${category}/${slug}`, ...frontMatter, category, content };
	});

	return {
		status: 200,
		headers: { 'Content-Type': 'application/json' },
		body: file,
	};
}
