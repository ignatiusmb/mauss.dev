import { traverse } from 'marqua';

type About = { slug: string; title: string; date: { updated: string } };

export const load: import('./$types').PageServerLoad = async () => {
	const parsed = traverse<{ entry: string }, About>(
		'content/src/about',
		({ frontMatter, content, breadcrumb: [filename] }) => {
			const [slug] = filename.split('.');
			return { ...frontMatter, slug, content };
		}
	);

	const content = parsed.reduce(
		(acc, { slug, ...res }) => ({ ...acc, [slug]: res }),
		{} as { [key: string]: any }
	);

	return { content };
};
