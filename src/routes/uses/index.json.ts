import { parseFile } from 'marqua';

export function get() {
	const article = parseFile<{ title: string; date: { updated: string } }>(
		'content/uses.md',
		({ frontMatter, content }) => ({ ...frontMatter, content })
	);

	return {
		status: 200,
		headers: { 'Content-Type': 'application/json' },
		body: article,
	};
}
