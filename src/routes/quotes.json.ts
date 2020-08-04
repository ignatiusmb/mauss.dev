import type { Request, Response } from 'express';
import { parseDir } from '../utils/parser';

export function get(_: Request, res: Response) {
	const DIR = 'content/quotes';
	const excerpts = parseDir(DIR, (_: any, content: string, filename: string) => {
		const [author] = filename.split('.');
		return { author: author.replace('-', ' '), lines: content.split(/\r?\n/) };
	});

	const quotes = excerpts.reduce((acc: [], cur: { author: string; lines: string[] }) => {
		const { author, lines } = cur;
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
