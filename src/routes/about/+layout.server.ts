import { traverse } from 'marqua/fs';

export const load: import('./$types').PageServerLoad = async () => {
	const content = traverse(
		{ entry: 'content/sites/dev.mauss/about' },
		({ frontMatter, content, breadcrumb: [filename] }) => {
			const [slug] = filename.split('.');
			return { slug, date: frontMatter.date, content };
		},
		(parsed) =>
			parsed.reduce(
				(a, c) => ({ ...a, [c.slug]: c }),
				{} as Record<string, (typeof parsed)[number]>
			)
	);

	return { content };
};
