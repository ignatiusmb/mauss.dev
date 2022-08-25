import { error } from '@sveltejs/kit';

export const load: import('./$types').PageLoad = async ({ fetch, params: { section } }) => {
	const { data } = await fetch('/about/__data.json').then((r) => r.json());
	if (!data[section]) throw error(404, 'Section not found');
	return { section, article: data[section] };
};
