import { Request, Response } from 'express';
import { parseFile } from '../../utils/parser';

export function get(req: Request, res: Response) {
	const { slug } = req.params;
	const filepath = `content/curated/${slug}.md`;
	const post = parseFile(filepath, (data: any, content: string) => {
		return { slug, ...data, content };
	});

	res.writeHead(200, { 'Content-Type': 'application/json' });
	res.end(JSON.stringify(post));
}
