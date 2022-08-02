import type { RequestHandler } from './__types/[slug].json';
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

export const GET: RequestHandler = async ({ params: { category, slug }, locals }) => ({
	body: compile(`${locals.entry}.md`, ({ frontMatter, content }) => {
		return { slug: `${category}/${slug}`, ...frontMatter, category, content };
	}),
});
