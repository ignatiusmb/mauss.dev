import type { Request, Response } from 'express';
import { parseDir } from '../../utils/parser';

export function get(_: Request, res: Response) {
	const articles = parseDir('content/about', (data: any, content: string, filename: string) => {
		const [slug] = filename.split('.');
		return { slug, ...data, content };
	}).reduce((acc, cur) => {
		const { slug, ...res } = cur;
		return { ...acc, [slug]: res };
	}, {});

	res.writeHead(200, { 'Content-Type': 'application/json' });
	res.end(JSON.stringify(articles));
}
