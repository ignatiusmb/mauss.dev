import type { RequestHandler } from '@sveltejs/kit';
import type { Context, Curated } from '$lib/utils/types';
import { readdirSync } from 'fs';
import { traverse } from 'marqua';

export const get: RequestHandler<Context> = async ({ context: { entry } }) => {
	const categories = readdirSync(entry).filter((folder) => folder !== 'draft');
	return {
		body: categories.flatMap((folder) =>
			traverse<Curated>(`${entry}/${folder}`, ({ frontMatter, breadcrumb }) => ({
				slug: `${folder}/${breadcrumb[breadcrumb.length - 1].split('.')[0]}`,
				...frontMatter,
				category: folder,
			}))
		),
	};
};
