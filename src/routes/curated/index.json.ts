import type { RequestHandler } from '@sveltejs/kit';
import { traverse } from 'marqua';

export const get: RequestHandler = async ({ locals: { entry } }) => {
	return {
		body: traverse({ entry, recurse: true }, ({ frontMatter, breadcrumb: [filename, folder] }) => {
			if (filename.includes('draft')) return;
			return {
				slug: `${folder}/${filename.split('.')[0]}`,
				category: folder,
				...frontMatter,
			};
		}),
	};
};
