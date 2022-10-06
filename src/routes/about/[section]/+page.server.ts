import { error } from '@sveltejs/kit';

export const load: import('./$types').PageServerLoad = async ({ parent, params }) => {
	const { content } = await parent();
	const section = content[params.section];
	if (!section) throw error(404, 'Section not found');
	return section;
};
