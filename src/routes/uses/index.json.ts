import type { Request, Response } from 'express';
import { parseFile } from 'marqua';

export function get(_: Request, res: Response): void {
	const article = parseFile<{ title: string; date: { updated: string } }>(
		'content/uses.md',
		({ frontMatter, content }) => ({ ...frontMatter, content })
	);

	res.writeHead(200, { 'Content-Type': 'application/json' });
	res.end(JSON.stringify(article));
}
