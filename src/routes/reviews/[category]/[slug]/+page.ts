import { error } from '@sveltejs/kit';

export const load: import('./$types').PageLoad = async ({ fetch, params }) => {
	const { category, slug } = params;

	const res = await fetch(`/reviews/${category}/${slug}.json`);
	if (!res.ok) throw error(404, 'Review not found');

	const post = await res.json();
	const list = await fetch('/reviews.json');
	for (const review of await list.json()) {
		if (review.slug !== post.slug) continue;
		post.siblings = review.siblings;
		return post;
	}

	throw error(404, 'Review not found');
};
