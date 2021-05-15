import type { RequestHandler } from '@sveltejs/kit';
import type { Locals, Review } from '$lib/utils/types';
import { countAverageRating, fillSiblings } from '$lib/utils/article';
import { traverse, forge } from 'marqua';
import { tryNumber } from 'mauss/utils';
import { compare } from 'mauss';

// @ts-expect-error: awaiting Typify from 'mauss/typings' for Review
export const get: RequestHandler<Locals> = async ({ locals: { entry } }) => {
	const config = forge.traverse({ entry, recurse: true });
	const reviews = traverse<typeof config, Review>(config, ({ frontMatter, breadcrumb }) => {
		const [folder, filename] = breadcrumb.slice(-2);
		if (filename.includes('draft')) return;
		return {
			slug: `${folder}/${filename.split('.')[0]}`,
			category: folder,
			...frontMatter,
			rating: countAverageRating(frontMatter.rating),
			verdict: tryNumber(frontMatter.verdict || -2),
		};
	}).sort((x, y) =>
		compare.date(x.date.updated || x.date.published, y.date.updated || y.date.published)
	);

	return {
		body: fillSiblings(reviews, 'reviews/', ({ rating, verdict }) => !rating || verdict < -1),
	};
};
