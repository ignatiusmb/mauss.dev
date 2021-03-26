import type { RequestHandler } from '@sveltejs/kit';
import { parseFile } from 'marqua';

export const get: RequestHandler = async () => {
	const body = parseFile<{ title: string; date: { updated: string } }>(
		'content/uses.md',
		({ frontMatter, content }) => ({ ...frontMatter, content })
	);

	return { body };
};
