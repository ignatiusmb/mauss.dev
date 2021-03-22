import type { Post } from '$lib/utils/types';
import { parseDir } from 'marqua';

export async function get({ params }) {
	const { slug } = params;
	const post = parseDir<Post>('content/posts', ({ frontMatter, content, filename }) => {
		const [published, filename_slug] = filename.split('.');
		if (filename_slug !== slug) return undefined;
		const date = { published, updated: frontMatter.date && frontMatter.date.updated };
		return { slug, ...frontMatter, category: frontMatter.tags[0], date, content };
	})[0];

	return {
		headers: { 'Content-Type': 'application/json' },
		body: post,
	};
}
