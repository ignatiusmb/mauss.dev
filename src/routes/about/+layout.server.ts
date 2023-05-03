import { traverse } from 'marqua/fs';

export const load: import('./$types').PageServerLoad = async () => {
	const content = traverse(
		{ entry: 'content/sites/dev.mauss/about' },
		({ breadcrumb: [filename], buffer, parse }) => {
			const [slug] = filename.split('.');
			const { content, metadata } = parse(buffer.toString('utf-8'));
			return { slug, date: metadata.date, content };
		},
		(parsed) =>
			parsed.reduce(
				(a, c) => ({ ...a, [c.slug]: c }),
				{} as Record<string, (typeof parsed)[number]>
			)
	);

	return {
		content,
		meta: {
			title: 'About',
			description: 'Who, what, and why?',
		},
	};
};
