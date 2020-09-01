import type { Request, Response } from 'express';
import { parseFile } from '../../../utils/parser';

const separators = /[\s\][!"#$%&'()*+,./:;<=>?@\\^_{|}~-]/g;

export function get(req: Request, res: Response) {
	const { category, slug } = req.params;
	const filepath = `content/curated/${category}/${slug}.md`;
	function hydrate(data: any, content: string) {
		const headings = Array.from(content.matchAll(/^## (.*)/gm), (v) => v[1]);
		const toc = headings.map((raw) => {
			const [cleaned] = raw.split(/ \| /);
			let tag = cleaned.toLowerCase().replace(separators, '-');
			return { id: tag.split('-').filter(Boolean).join('-'), cleaned };
		});
		return { slug: `${category}/${slug}`, category, ...data, toc, content };
	}

	res.writeHead(200, { 'Content-Type': 'application/json' });
	res.end(JSON.stringify(parseFile(filepath, hydrate)));
}
