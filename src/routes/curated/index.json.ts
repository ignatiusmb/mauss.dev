import type { RequestHandler } from '@sveltejs/kit';
import type { Curated } from '$lib/utils/types';
import { readdirSync } from 'fs';
import { traverse } from 'marqua';

export const get: RequestHandler = async () => {
	const DIR = 'content/src/curated';
	const categories = readdirSync(DIR).filter((folder) => folder !== 'draft');
	const body = categories.flatMap((folder) =>
		traverse<Curated>(`${DIR}/${folder}`, ({ frontMatter, filename }) => ({
			slug: `${folder}/${filename.split('.')[0]}`,
			...frontMatter,
			category: folder,
		}))
	);

	return { body };
};
