import { error } from '@sveltejs/kit';

export async function load({ parent, params }) {
	const { items } = await parent();
	const content = items.find(({ slug }) => slug === `${params.category}/${params.slug}`);
	if (!content) error(404, 'Review not found');
	if (!content.rating || content.verdict === 'pending') {
		error(404, 'Not yet reviewed');
	}

	return {
		article: content,
		source: `reviews/${content.slug}/+article.md`,
		meta: {
			canonical: `reviews/${content.slug}`,
			title: content.title.short || content.title.jp || content.title.en,
		},
	};
}
