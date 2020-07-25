import { Request, Response } from 'express';
import { parseDir } from '../../utils/parser';

export function get(_: Request, res: Response) {
	const DIR = 'content/curated';
	const articles = parseDir(DIR, (data: any, _: string, filename: string) => {
		return { slug: filename.split('.')[0], ...data };
	});

	res.writeHead(200, { 'Content-Type': 'application/json' });
	res.end(JSON.stringify(articles));
}
