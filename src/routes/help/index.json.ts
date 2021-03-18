import { parseFile } from '$lib/utils/parser';

type Help = { title: string };

export async function get() {
	const article = parseFile<Help>('content/help.md', ({ frontMatter, content }) => ({
		...frontMatter,
		content,
	}));

	return {
		status: 200,
		headers: { 'Content-Type': 'application/json' },
		body: article,
	};
}
