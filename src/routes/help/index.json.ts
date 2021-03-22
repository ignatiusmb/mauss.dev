import { parseFile } from 'marqua';

export async function get() {
	const article = parseFile<{ title: string }>('content/help.md', ({ frontMatter, content }) => ({
		...frontMatter,
		content,
	}));

	return {
		status: 200,
		headers: { 'Content-Type': 'application/json' },
		body: article,
	};
}
