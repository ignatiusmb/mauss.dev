import { redirect } from '@sveltejs/kit';
import { entitle } from '$lib/prose';

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
			title: entitle(content),
			description: content.description || '',
			image: `https://mauss.dev/posts/${content.slug}/card.png`,
		},
	};
}
