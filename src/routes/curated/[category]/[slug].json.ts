import type { RequestHandler } from '@sveltejs/kit';
import type { Curated } from '$lib/utils/types';
import { marker, compile } from 'marqua';
import TexMath from 'markdown-it-texmath';
import KaTeX from 'katex';

marker.use(TexMath, {
	engine: KaTeX,
	delimiters: 'dollars',
	katexOptions: {
		throwOnError: true,
		macros: { '\\RR': '\\mathbb{R}' },
	},
});

export const get: RequestHandler = async ({ params: { category, slug }, context }) => ({
	body: compile<Curated>(`${context.entry}.md`, ({ frontMatter, content }) => {
		return { slug: `${category}/${slug}`, ...frontMatter, category, content };
	}),
});
