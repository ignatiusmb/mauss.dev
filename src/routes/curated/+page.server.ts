import { DATA } from '$lib/content';

export const load: import('./$types').PageServerLoad = () => {
	const content = DATA['curated/'].all();

	return {
		list: content,
		meta: {
			canonical: 'curated',
			title: 'Curated',
			description: 'Curated content for all kinds of programming, lifestyle, and many more.',
		},
	};
};
