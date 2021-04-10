import type { RequestHandler } from '@sveltejs/kit';
import { traverse } from 'marqua';

type About = { slug: string; title: string; date: { updated: string } };

export const get: RequestHandler = async () => {
	const body = traverse<About>('content/about', ({ frontMatter, content, filename }) => {
		const [slug] = filename.split('.');
		return { ...frontMatter, slug, content };
	}).reduce((acc, { slug, ...res }) => ({ ...acc, [slug]: res }), {});

	return { body };
};
