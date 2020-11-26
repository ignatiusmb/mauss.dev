import type { Request, Response } from 'express';
import { parseFile } from '$utils/parser';

export async function get(_: Request, res: Response): Promise<void> {
	const article = parseFile('content/help.md', ({ frontMatter, content }) => ({
		...frontMatter,
		content,
	}));

	res.writeHead(200, { 'Content-Type': 'application/json' });
	res.end(JSON.stringify(article));
}
