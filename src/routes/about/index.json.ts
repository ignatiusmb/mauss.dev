import { parseDir } from '$lib/utils/parser';

type About = { slug: string; title: string; date: { updated: string } };

export async function get() {
	const articles = parseDir<About>('content/about', ({ frontMatter, content, filename }) => {
		const [slug] = filename.split('.');
		return { ...frontMatter, slug, content };
	}).reduce((acc, { slug, ...res }) => ({ ...acc, [slug]: res }), {});

	return {
		status: 200,
		headers: { 'Content-Type': 'application/json' },
		body: articles,
	};
}
