import type { Curated } from '$lib/utils/types';
import { readdirSync } from 'fs';
import { parseDir } from 'marqua';

export async function get() {
	const DIR = 'content/curated';
	const categories = readdirSync(DIR).filter((folder) => folder !== 'draft');
	const articles = categories.flatMap((folder) =>
		parseDir<Curated>(`${DIR}/${folder}`, ({ frontMatter, filename }) => ({
			slug: `${folder}/${filename.split('.')[0]}`,
			...frontMatter,
			category: folder,
		}))
	);

	return {
		status: 200,
		headers: { 'Content-Type': 'application/json' },
		body: articles,
	};
}
