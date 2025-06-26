import { qsd } from 'mauss/web';
import { by, sift } from './search.svelte';

export async function load({ parent, url }) {
	const { items, metadata } = await parent();
	const { q = [''], tags = [], sort_by = ['date'] } = qsd(url.search);

	return {
		index: items,
		query: String(q[0]),
		results: sift(items, {
			search: String(q[0]),
			tags: tags.map(String),
			sort_by: sort_by[0] as keyof typeof by,
		}),
		metadata: {
			tags: metadata.tags.map((v) => ({ name: v, selected: tags.includes(v) })),
			sort_by: {
				required: true,
				options: { date: 'Date' } satisfies Record<keyof typeof by, string>,
				selected: (sort_by[0] as string) in by ? sort_by[0] : 'date',
			},
		},
		meta: {
			canonical: '/posts',
			title: 'Posts',
			description:
				'blog entries for unadulterated moments. sometimes technical, sometimes personal, and often times just wandering.',
		},
	};
}
