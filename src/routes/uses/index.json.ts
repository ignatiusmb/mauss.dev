import { parseFile } from '$lib/utils/parser';

type Uses = { title: string; date: { updated: string } };

export async function get() {
	const article = parseFile<Uses>('content/uses.md', ({ frontMatter, content }) => ({
		...frontMatter,
		content,
	}));

	return {
		status: 200,
		headers: { 'Content-Type': 'application/json' },
		body: article,
	};
}
