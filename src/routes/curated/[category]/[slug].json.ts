import type { Request, Response } from 'express';
import { parseFile } from '../../../utils/parser';

export function get(req: Request, res: Response) {
	const { category, slug } = req.params;
	const filepath = `content/curated/${category}/${slug}.md`;
	function hydrate(data: any, content: string) {
		return { slug: `${category}/${slug}`, category, ...data, content };
	}

	res.writeHead(200, { 'Content-Type': 'application/json' });
	res.end(JSON.stringify(parseFile(filepath, hydrate)));
}
