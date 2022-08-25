export const load: import('./$types').PageLoad = async ({ fetch }) => {
	const posts: any[] = await fetch('/posts.json').then((r) => r.json());
	const tags = [...new Set(posts.flatMap((p) => p.tags))].sort();
	const categories = [...new Set(posts.map((p) => p.tags[0]))].sort();
	const sort_by = { updated: 'Last Updated', published: 'Last Published' };
	return { posts, unique: { categories, tags, sort_by } };
};
