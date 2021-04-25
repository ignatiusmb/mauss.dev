import type { RequestHandler } from '@sveltejs/kit';
import type { Context, Post } from '$lib/utils/types';
import { traverse } from 'marqua';

export const get: RequestHandler<Context> = async ({ params: { slug } }) => {
	const [body] = traverse<Post>('content/src/posts', ({ frontMatter, content, breadcrumb }) => {
		const [published, filename_slug] = breadcrumb[breadcrumb.length - 1].split('.');
		if (filename_slug !== slug) return undefined;
		const date = { published, updated: frontMatter.date && frontMatter.date.updated };
		return { slug, ...frontMatter, category: frontMatter.tags[0], date, content };
	});

	return { body };
};
