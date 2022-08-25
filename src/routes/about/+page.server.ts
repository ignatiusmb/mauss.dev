import type { RequestHandler } from '@sveltejs/kit';
import { traverse } from 'marqua';

type About = { slug: string; title: string; date: { updated: string } };

export const GET: RequestHandler = async () => {
	const parsed = traverse<{ entry: string }, About>(
		'content/src/about',
		({ frontMatter, content, breadcrumb: [filename] }) => {
			const [slug] = filename.split('.');
			return { ...frontMatter, slug, content };
		}
	);

	const data = parsed.reduce((acc, { slug, ...res }) => ({ ...acc, [slug]: res }), {});

	return {
		body: { data, sections: Object.keys(data).filter((v) => v !== 'index') },
	};
};
