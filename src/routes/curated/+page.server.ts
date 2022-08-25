import type { RequestHandler } from '@sveltejs/kit';
import { traverse } from 'marqua';

export const GET: RequestHandler = async () => {
	const data = traverse(
		{ entry: 'content/src/curated', recurse: true },
		({ frontMatter, breadcrumb: [filename, folder] }) => {
			if (frontMatter.draft || filename.includes('draft')) return;
			return {
				slug: `${folder}/${filename.split('.')[0]}`,
				category: folder,
				...frontMatter,
			};
		}
	);

	return {
		body: { data },
	};
};
