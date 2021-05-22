import type { RequestHandler } from '@sveltejs/kit';
import type { Locals, Post } from '$lib/utils/types';
import { traverse } from 'marqua';

export const get: RequestHandler<Locals> = async ({ params: { slug } }) => {
	const [body] = traverse<{ entry: string }, Post>(
		'content/src/posts',
		({ frontMatter, content, breadcrumb }) => {
			const filename = breadcrumb[breadcrumb.length - 1];
			const [published, filename_slug] = filename.split('.');
			if (filename.includes('draft') || filename_slug !== slug) return;
			const date = { published, updated: frontMatter.date && frontMatter.date.updated };
			return { slug, ...frontMatter, category: frontMatter.tags[0], date, content };
		}
	);

	return { body };
};
