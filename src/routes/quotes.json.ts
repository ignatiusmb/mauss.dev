import type { Request, Response } from 'express';
import { parseDir } from '$utils/parser';

type Excerpt = { author: string; lines: string[] };
type Quote = { author: string; quote: string; from: string };

export function get(_: Request, res: Response): void {
	const excerpts = parseDir<Excerpt>('content/quotes', ({ content, filename }) => ({
		author: filename.split('.')[0].replace('-', ' '),
		lines: content.split(/\r?\n/),
	}));

	const quotes = excerpts.reduce((acc: Quote[], { author, lines }) => {
		const content = [];
		for (const line of lines) {
			if (!line) continue;
			const [quote, from] = line.split('#!/');
			content.push({ author, quote, from });
		}
		return [...acc, ...content];
	}, []);

	res.writeHead(200, { 'Content-Type': 'application/json' });
	res.end(JSON.stringify(quotes));
}
