import type { RequestHandler } from '@sveltejs/kit';
import type { Locals } from '$lib/utils/types';
import { traverse } from 'marqua';

export const get: RequestHandler<Locals> = async ({ locals: { entry } }) => {
	return {
		body: traverse({ entry, recurse: true }, ({ frontMatter, breadcrumb }) => {
			const [folder, filename] = breadcrumb.slice(-2);
			if (filename.includes('draft')) return;
			return {
				slug: `${folder}/${filename.split('.')[0]}`,
				category: folder,
				...frontMatter,
			};
		}),
	};
};
