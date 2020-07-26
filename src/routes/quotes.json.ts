import { Request, Response } from 'express';
import { parseDir } from '../utils/parser';

export function get(_: Request, res: Response) {
	const DIR = 'content/quotes';
	const quotes = parseDir(DIR, (_: any, content: string, filename: string) => {
		const [author] = filename.split('.');
		return {
			author: author.replace('-', ' '),
			quotes: content.split('\n').reduce((acc, cur) => {
				if (!cur) return acc;
				const [quote, from] = cur.split('#!/');
				return [...acc, { quote, from }];
			}, []),
		};
	});

	res.writeHead(200, { 'Content-Type': 'application/json' });
	res.end(JSON.stringify(quotes));
}
