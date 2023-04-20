import { compare } from 'mauss';
import { curated } from '$lib/content';

export const load: import('./$types').PageServerLoad = async ({ params }) => {
	const content = curated
		.all()
		.filter((p) => p.category === params.category)
		.sort(compare.key('date.updated', compare.date));
	return { curated: content, category: params.category };
};
