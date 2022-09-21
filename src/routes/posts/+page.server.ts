import { posts } from '$lib/content';

export const load: import('./$types').PageServerLoad = async () => {
	const content = posts.all();
	const tags = [...new Set(content.flatMap((p) => p.tags))].sort();
	const categories = [...new Set(content.map((p) => p.tags[0]))].sort();
	const sort_by = { updated: 'Last Updated', published: 'Last Published' };
	return { posts: content, unique: { categories, tags, sort_by } };
};
