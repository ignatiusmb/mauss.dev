import type { RequestHandler } from '@sveltejs/kit';
import type { Context } from '$lib/utils/types';
import { traverse } from 'marqua';

type About = { slug: string; title: string; date: { updated: string } };

export const get: RequestHandler<Context> = async ({ context: { entry } }) => ({
	body: traverse<About>(entry, ({ frontMatter, content, breadcrumb }) => {
		const [slug] = breadcrumb[breadcrumb.length - 1].split('.');
		return { ...frontMatter, slug, content };
	}).reduce((acc, { slug, ...res }) => ({ ...acc, [slug]: res }), {}),
});
