import { error } from '@sveltejs/kit';

export const load: import('./$types').PageLoad = async ({ fetch, params: { slug } }) => {
	const res = await fetch(`/posts/${slug}.json`);
	if (!res.ok) throw error(404, 'Post not found');

	const post = await res.json();
	const list = await fetch('/posts.json');
	for (const review of await list.json()) {
		if (review.slug !== post.slug) continue;
		post.siblings = review.siblings;
		return post;
	}

	throw error(404, 'Post not found');
};
