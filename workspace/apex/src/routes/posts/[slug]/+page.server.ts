import { redirect } from '@sveltejs/kit';

export const prerender = 'auto';
export async function load({ parent, params }) {
	const { items, series } = await parent();
	const content = items.find(({ slug }) => slug === params.slug);
	if (!content) redirect(307, '/posts');

	return {
		source: `posts/${content.slug}/+article.md`,
		article: content,
		collection: series,
		meta: {
			canonical: `/posts/${content.slug}`,
			title: content.title,
			description: content.description || '',
		},
	};
}
