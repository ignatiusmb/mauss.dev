import { marker, compile } from 'marqua';
import { json } from '@sveltejs/kit';
import TexMath from 'markdown-it-texmath';
import KaTeX from 'katex';

marker.use(TexMath, {
	engine: KaTeX,
	delimiters: 'dollars',
	katexOptions: {
		strict: (code: string) => (code === 'newLineInDisplayMode' ? 'ignore' : 'warn'),
	},
});

export const GET: import('./$types').RequestHandler = async ({ params, locals }) => {
	const { category, slug } = params;

	return json(
		compile(`${locals.entry}.md`, ({ frontMatter, content }) => {
			return { slug: `${category}/${slug}`, ...frontMatter, category, content };
		})
	);
};
