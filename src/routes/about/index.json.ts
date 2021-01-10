import type { Request, Response } from 'express';
import { parseDir } from '$utils/parser';

type About = { slug: string; title: string; date: { updated: string } };

export async function get(_: Request, res: Response): Promise<void> {
	const articles = parseDir<About>('content/about', ({ frontMatter, content, filename }) => {
		const [slug] = filename.split('.');
		return { ...frontMatter, slug, content };
	}).reduce((acc, { slug, ...res }) => ({ ...acc, [slug]: res }), {});

	res.writeHead(200, { 'Content-Type': 'application/json' });
	res.end(JSON.stringify(articles));
}
