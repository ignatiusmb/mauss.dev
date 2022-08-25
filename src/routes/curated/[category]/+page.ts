import { compare } from 'mauss';

export const load: import('./$types').PageLoad = async ({ fetch, params: { category } }) => {
	const { data: list } = await fetch('/curated/__data.json').then((r) => r.json());
	const curated = list
		.filter((p: any) => p.category === category)
		.sort((x: any, y: any) => compare.date(x.date.updated, y.date.updated));
	return { curated, category };
};
