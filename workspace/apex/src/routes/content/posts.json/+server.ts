import type { Items, SeriesTable } from '$content/builder';
import { json } from '@sveltejs/kit';
import { ROUTES } from '$content/builder';

export interface Schema {
	items: Items['/posts'];
	series: SeriesTable;
	metadata: {
		series: [transformed: string, title: string][];
		theme: [value: Items['/posts'][number]['theme'], label: string][];
		tags: string[];
		sort_by: [value: 'date' | 'updated', label: string][];
	};
}

export const prerender = true;
export async function GET() {
	const items = await ROUTES['/posts']();

	const map: Schema['series'] = {};
	for (const { slug, title, series } of items) {
		if (!series) continue;
		map[series.title] = map[series.title] || [];
		map[series.title].push({ slug, title, chapter: series.chapter || '' });
	}
	for (const key in map) {
		map[key].sort((x, y) => x.chapter.localeCompare(y.chapter) || x.title.localeCompare(y.title));
	}

	return json({
		items,
		series: map,
		metadata: {
			series: [...new Set(items.flatMap((p) => (p.series ? p.series.title : [])))]
				.sort((x, y) => x.localeCompare(y))
				.map((title) => [title.toLowerCase().replace(/ /g, '-'), title]),
			theme: [
				['reflection', 'Reflection'],
				['essay', 'Essay'],
				['guide', 'Guide'],
				['moment', 'Moment'],
				['archive', 'Archive'],
			],
			tags: [...new Set(items.flatMap((p) => p.tags))].filter((t) => t).sort(),
			sort_by: [
				['date', 'Published'],
				['updated', 'Updated'],
			],
		},
	} satisfies Schema);
}
