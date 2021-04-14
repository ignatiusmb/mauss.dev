import type { RequestHandler } from '@sveltejs/kit';
import type { Curated } from '$lib/utils/types';
import { readdirSync } from 'fs';
import { traverse } from 'marqua';

export const get: RequestHandler = async ({ context: { entry } }) => {
	const categories = readdirSync(entry).filter((folder) => folder !== 'draft');
	return {
		body: categories.flatMap((folder) =>
			traverse<Curated>(`${entry}/${folder}`, ({ frontMatter, filename }) => ({
				slug: `${folder}/${filename.split('.')[0]}`,
				...frontMatter,
				category: folder,
			}))
		),
	};
};
