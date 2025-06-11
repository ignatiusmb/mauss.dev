import { redirect } from '@sveltejs/kit';

export const prerender = true;

export async function load({ parent, params }) {
	const { items } = await parent();
	const content = items.find(({ slug }) => slug === params.slug);
	if (!content) redirect(307, '/posts');

	return {
		article: content,
		source: `posts/${content.slug}/+article.md`,
		meta: {
			canonical: `posts/${content.slug}`,
			title: content.title,
			description: content.description || '',
		},
	};
}
