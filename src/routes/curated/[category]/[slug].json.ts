import type { RequestHandler } from '@sveltejs/kit';
import type { Curated } from '$lib/utils/types';
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

export const get: RequestHandler = async ({ params }) => {
	const { category, slug } = params;
	const filepath = `content/curated/${category}/${slug}.md`;

	const body = parseFile<Curated>(filepath, ({ frontMatter, content }) => {
		return { slug: `${category}/${slug}`, ...frontMatter, category, content };
	});

	return { body };
};
