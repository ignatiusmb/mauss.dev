import type { RequestHandler } from '@sveltejs/kit';
import { parseDir } from 'marqua';

type About = { slug: string; title: string; date: { updated: string } };

export const get: RequestHandler = async () => {
	const articles = parseDir<About>('content/about', ({ frontMatter, content, filename }) => {
		const [slug] = filename.split('.');
		return { ...frontMatter, slug, content };
	}).reduce((acc, { slug, ...res }) => ({ ...acc, [slug]: res }), {});

	return {
		headers: { 'Content-Type': 'application/json' },
		body: articles,
	};
};
