import type { Post } from '$lib/types';
import { json } from '@sveltejs/kit';
import { traverse } from 'marqua';

export const GET: import('./$types').RequestHandler = async ({ params: { slug } }) => {
	const [body] = traverse<{ entry: string }, Post>(
		'content/src/posts',
		({ frontMatter, content, breadcrumb: [filename] }) => {
			const [published, filename_slug] = filename.split('.');
			if (filename.includes('draft') || filename_slug !== slug) return;
			const date = { published, updated: frontMatter.date && frontMatter.date.updated };
			return { slug, ...frontMatter, category: frontMatter.tags[0], date, content };
		}
	);

	return json(body);
};
