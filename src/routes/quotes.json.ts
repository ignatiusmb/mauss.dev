import type { Request, Response } from 'express';
import type { Quote } from '$utils/types';
import { isExists } from 'mauss/guards';
import { parseDir } from '$utils/parser';

type Excerpt = { author: string; lines: string[] };

export function get(_: Request, res: Response): void {
	const excerpts = parseDir<Excerpt>('content/quotes', ({ content, filename }) => ({
		author: filename.split('.')[0].replace('-', ' '),
		lines: content.split(/\r?\n/).filter(isExists),
	}));

	const quotes = excerpts.reduce((acc: Quote[], { author, lines }) => {
		for (const line of lines) {
			const [quote, from] = line.split('#!/');
			acc.push({ author, quote, from });
		}
		return acc;
	}, []);

	res.writeHead(200, { 'Content-Type': 'application/json' });
	res.end(JSON.stringify(quotes));
}
