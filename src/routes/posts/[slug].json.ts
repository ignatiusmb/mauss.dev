import type { Post } from '$lib/utils/types';
import { parseDir } from '$lib/utils/parser';

export async function get({ params }) {
	const { slug } = params;
	const post = parseDir<Post>('content/posts', ({ frontMatter, content, filename }) => {
		const [published, filename_slug] = filename.split('.');
		if (filename_slug !== slug) return undefined;
		const date = { published, updated: frontMatter.date && frontMatter.date.updated };
		const toc = Array.from(content.matchAll(/^## (.*)/gm), (v) => v[1]);
		return { slug, ...frontMatter, category: frontMatter.tags[0], date, toc, content };
	})[0];

	return {
		status: 200,
		headers: { 'Content-Type': 'application/json' },
		body: post,
	};
}
