export const load: import('./$types').PageServerLoad = async ({ parent }) => {
	const { content } = await parent();

	return {
		article: content['index'],
		sections: Object.keys(content).filter((v) => v !== 'index'),
	};
};
