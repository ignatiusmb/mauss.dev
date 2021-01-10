import type { Request, Response } from 'express';
import { parseFile } from '$utils/parser';

type Help = { title: string };

export async function get(_: Request, res: Response): Promise<void> {
	const article = parseFile<Help>('content/help.md', ({ frontMatter, content }) => ({
		...frontMatter,
		content,
	}));

	res.writeHead(200, { 'Content-Type': 'application/json' });
	res.end(JSON.stringify(article));
}
