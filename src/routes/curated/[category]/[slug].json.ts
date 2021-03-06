import type { RequestHandler } from '@sveltejs/kit';
import type { Locals } from '$lib/utils/types';
import { marker, compile } from 'marqua';
import TexMath from 'markdown-it-texmath';
import KaTeX from 'katex';

marker.use(TexMath, {
	engine: KaTeX,
	delimiters: 'dollars',
	katexOptions: {
		strict: (code: string) => (code === 'newLineInDisplayMode' ? 'ignore' : 'warn'),
	},
});

export const get: RequestHandler<Locals> = async ({ params: { category, slug }, locals }) => ({
	body: compile(`${locals.entry}.md`, ({ frontMatter, content }) => {
		return { slug: `${category}/${slug}`, ...frontMatter, category, content };
	}),
});
