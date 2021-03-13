import type { Request, Response } from 'express';
import { isExists } from 'mauss/guards';
import { parseDir } from 'marqua';

export function get(_: Request, res: Response): void {
	const excerpts = parseDir<{ author: string; lines: string[] }>(
		'content/quotes',
		({ content, filename }) => ({
			author: filename.split('.')[0].replace('-', ' '),
			lines: content.split(/\r?\n/).filter(isExists),
		})
	);

	const quotes = excerpts.reduce((acc, { author, lines }) => {
		for (const line of lines) {
			const [quote, from] = line.split('#!/');
			acc.push({ author, quote, from });
		}
		return acc;
	}, [] as Array<{ author: string; quote: string; from: string }>);

	res.writeHead(200, { 'Content-Type': 'application/json' });
	res.end(JSON.stringify(quotes));
}
