import type { Request, Response } from 'express';
import { parseFile } from '$utils/parser';

export function get(_: Request, res: Response): void {
	const article = parseFile('content/uses.md', ({ frontMatter, content }) => ({
		...frontMatter,
		content,
	}));

	res.writeHead(200, { 'Content-Type': 'application/json' });
	res.end(JSON.stringify(article));
}
