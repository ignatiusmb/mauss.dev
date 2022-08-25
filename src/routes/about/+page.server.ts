import type { PageServerLoad } from '@sveltejs/kit';
import { traverse } from 'marqua';

type About = { slug: string; title: string; date: { updated: string } };

export const load: PageServerLoad = async () => {
	const parsed = traverse<{ entry: string }, About>(
		'content/src/about',
		({ frontMatter, content, breadcrumb: [filename] }) => {
			const [slug] = filename.split('.');
			return { ...frontMatter, slug, content };
		}
	);

	const article = parsed.reduce((acc, { slug, ...res }) => ({ ...acc, [slug]: res }), {});

	return { article, sections: Object.keys(article).filter((v) => v !== 'index') };
};
