import type { RequestHandler } from '@sveltejs/kit';
import { parseFile } from 'marqua';

export const get: RequestHandler = async () => {
	const article = parseFile<{ title: string; date: { updated: string } }>(
		'content/uses.md',
		({ frontMatter, content }) => ({ ...frontMatter, content })
	);

	return {
		headers: { 'Content-Type': 'application/json' },
		body: article,
	};
};
