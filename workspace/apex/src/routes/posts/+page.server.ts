import { qsd } from 'mauss/web';
import { by, sift } from './search.svelte';

export async function load({ parent, url }) {
	const { items, metadata } = await parent();
	const { q = [''], theme = [], tags = [], sort_by = ['date'] } = qsd(url.search);

	const index = items.map(({ content, ...item }) => item);

	return {
		index,
		query: String(q[0]),
		results: sift(index, {
			search: String(q[0]),
			theme: String(theme[0]),
			tags: tags.map(String),
			sort_by: sort_by[0] as keyof typeof by,
		}),
		filters: {
			// theme: {
			// 	options: Object.fromEntries(metadata.theme),
			// 	selected: metadata.theme.find(([v]) => v === theme[0]) ? theme[0] : '',
			// },
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
