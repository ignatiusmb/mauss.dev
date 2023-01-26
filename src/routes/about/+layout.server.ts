import { traverse } from 'marqua/fs';

export const load: import('./$types').PageServerLoad = async () => {
	const content = traverse(
		{ entry: 'content/sites/dev.mauss/about' },
		({ frontMatter, content, breadcrumb: [filename] }) => {
			const [slug] = filename.split('.');
			return { ...frontMatter, slug, content };
		},
		(parsed) => {
			type About = { slug: string; title: string; date: { updated: string } };
			const table: Record<string, About> = {};
			for (const item of parsed) {
				const { slug, ...res } = item as any;
				table[slug] = res;
			}
			return table;
		}
	);

	return { content };
};
