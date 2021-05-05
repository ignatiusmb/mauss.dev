import type { RequestHandler } from '@sveltejs/kit';
import type { Locals, Review } from '$lib/utils/types';
import { countAverageRating, fillSiblings } from '$lib/utils/article';
import { sortCompare } from '$lib/utils/helper';
import { traverse, forge } from 'marqua';
import { checkNum } from 'mauss/utils';

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
			verdict: checkNum(frontMatter.verdict || -2),
		};
	}).sort((x, y) => {
		const { rating: xr, verdict: xv } = x;
		const { rating: yr, verdict: yv } = y;
		const score = xr && xv >= -1 ? -1 : yr && yv >= -1 ? 1 : 0;
		return score || sortCompare(x, y);
	});

	// const cutoff = reviews.findIndex((x) => !x.rating && x.verdict < -1);
	// console.log([...reviews.slice(0, cutoff), ...reviews.slice(cutoff)]);

	return {
		body: fillSiblings(reviews, 'reviews/', ({ rating, verdict }) => !rating || verdict < -1),
	};
};
