import { curated } from '$lib/content';

export const load: import('./$types').PageServerLoad = () => {
	return {
		list: curated.all(),
		meta: {
			canonical: 'curated',
			title: 'Curated',
			description: 'Curated content for all kinds of programming, lifestyle, and many more.',
		},
	};
};
