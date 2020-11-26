import type { Request, Response } from 'express';
import { parseFile } from '$utils/parser';

const separators = /[\s\][!"#$%&'()*+,./:;<=>?@\\^_{|}~-]/g;

export async function get(req: Request, res: Response): Promise<void> {
	const { category, slug } = req.params;
	const filepath = `content/curated/${category}/${slug}.md`;

	const file = parseFile(filepath, ({ frontMatter, content }) => {
		const headings = Array.from(content.matchAll(/^## (.*)/gm), (v) => v[1]);
		const toc = headings.map((raw) => {
			const [cleaned] = raw.split(/ \| /);
			const tag = cleaned.toLowerCase().replace(separators, '-');
			return { id: tag.split('-').filter(Boolean).join('-'), cleaned };
		});
		return { slug: `${category}/${slug}`, category, ...frontMatter, toc, content };
	});

	res.writeHead(200, { 'Content-Type': 'application/json' });
	res.end(JSON.stringify(file));
}
