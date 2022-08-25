import { capitalize } from 'mauss/utils';
import { VERDICTS } from '$lib/constants';

export const load: import('./$types').PageLoad = async ({ fetch }) => {
	const reviews: any[] = await fetch('/reviews.json').then((r) => r.json());
	const categories = [...new Set(reviews.map((p) => p.category))];
	const genres = [...new Set(reviews.flatMap((p) => p.genres))].sort();
	return {
		reviews,
		unique: {
			categories,
			genres,
			verdict: VERDICTS.reduce((a, c) => ({ ...a, [c]: capitalize(c.replace('-', ' ')) }), {}),
			sort_by: {
				updated: 'Last updated',
				published: 'Date published',
				released: 'Year released',
				seen: 'Last seen',
				rating: 'Rating',
			},
		},
	};
};
