import { curated } from '$lib/content';

export const load: import('./$types').PageServerLoad = () => {
	return { list: curated.all() };
};
