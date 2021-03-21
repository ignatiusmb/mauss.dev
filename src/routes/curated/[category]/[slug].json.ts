import type { Request, Response } from 'express';
import type { Curated } from '$utils/types';
import TexMath from 'markdown-it-texmath';
import { marker, parseFile } from 'marqua';

marker.use(TexMath, {
	engine: require('katex'),
	delimiters: 'dollars',
	katexOptions: {
		throwOnError: true,
		macros: { '\\RR': '\\mathbb{R}' },
	},
});

export async function get(req: Request, res: Response): Promise<void> {
	const { category, slug } = req.params;
	const filepath = `content/curated/${category}/${slug}.md`;

	const file = parseFile<Curated>(filepath, ({ frontMatter, content }) => {
		return { slug: `${category}/${slug}`, ...frontMatter, category, content };
	});

	res.writeHead(200, { 'Content-Type': 'application/json' });
	res.end(JSON.stringify(file));
}
