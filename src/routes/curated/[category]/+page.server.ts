import { compare } from 'mauss';
import { curated } from '$lib/content';

export const load: import('./$types').PageServerLoad = async ({ params }) => {
	const content = curated
		.all()
		.filter((p: any) => p.category === params.category)
		.sort((x: any, y: any) => compare.date(x.date.updated, y.date.updated));
	return { curated: content, category: params.category };
};
