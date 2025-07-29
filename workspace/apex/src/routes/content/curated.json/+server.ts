import { json } from '@sveltejs/kit';
import { ROUTES, type Items } from '$content/builder';

export interface Schema {
	items: Items['/curated'];
	metadata: {
		series: [value: string, label: string][];
	};
}

export const prerender = true;
export async function GET() {
	const items = await ROUTES['/curated']();

	const series: Record<string, string> = {};
	for (const item of items) {
		if (!item.series) continue;
		series[item.series.title] = item.series.type;
	}

	return json({
		items,
		metadata: {
			series: Object.keys(series).map((v) => [
				v,
				v.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase()),
			]),
		},
	} satisfies Schema);
}
