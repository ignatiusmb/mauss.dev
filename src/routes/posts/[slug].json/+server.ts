import type { RequestHandler } from './__types/[slug].json';
import type { Post } from '$lib/types';
import { traverse } from 'marqua';

export const GET: RequestHandler<Post> = async ({ params: { slug } }) => {
	const [body] = traverse<{ entry: string }, Post>(
		'content/src/posts',
		({ frontMatter, content, breadcrumb: [filename] }) => {
			const [published, filename_slug] = filename.split('.');
			if (filename.includes('draft') || filename_slug !== slug) return;
			const date = { published, updated: frontMatter.date && frontMatter.date.updated };
			return { slug, ...frontMatter, category: frontMatter.tags[0], date, content };
		}
	);

	return { body };
};
