import type { Request, Response } from 'express';
import { parseDir } from '$utils/parser';

export async function get(_: Request, res: Response): Promise<void> {
	const articles = parseDir('content/about', ({ frontMatter, content, filename }) => {
		const [slug] = filename.split('.');
		return { slug, ...frontMatter, content };
	}).reduce((acc, cur) => {
		const { slug, ...res } = cur;
		return { ...acc, [slug]: res };
	}, {});

	res.writeHead(200, { 'Content-Type': 'application/json' });
	res.end(JSON.stringify(articles));
}
