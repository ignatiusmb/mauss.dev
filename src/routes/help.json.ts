import { Request, Response } from 'express';
import { parseFile } from '../utils/parser';

export function get(_: Request, res: Response) {
	const article = parseFile('content/help.md', (data: any, content: string) => {
		return { ...data, content };
	});

	res.writeHead(200, { 'Content-Type': 'application/json' });
	res.end(JSON.stringify(article));
}
