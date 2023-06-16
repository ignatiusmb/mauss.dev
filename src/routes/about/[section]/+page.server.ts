import { redirect } from '@sveltejs/kit';

export const load: import('./$types').PageServerLoad = async ({ parent, params }) => {
	const { content } = await parent();
	const section = content[params.section];
	if (!section) throw redirect(307, '/about');
	return section;
};
