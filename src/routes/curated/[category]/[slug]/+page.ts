import { error } from '@sveltejs/kit';

export const load: import('./$types').PageLoad = async ({ fetch, params }) => {
	const { category, slug } = params;
	const res = await fetch(`/curated/${category}/${slug}.json`);
	if (!res.ok) throw error(404, 'Curated post not found');
	return await res.json();
};
