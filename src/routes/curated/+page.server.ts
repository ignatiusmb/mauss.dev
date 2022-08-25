import { traverse } from 'marqua';

export const load: import('./$types').PageServerLoad = async () => {
	const curated = traverse(
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

	return curated;
};
