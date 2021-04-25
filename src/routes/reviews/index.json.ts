import type { RequestHandler } from '@sveltejs/kit';
import type { Context, Review } from '$lib/utils/types';
import { readdirSync } from 'fs';
import { isExists } from 'mauss/guards';
import { checkNum } from 'mauss/utils';
import { traverse } from 'marqua';
import { countAverageRating, fillSiblings } from '$lib/utils/article';

const check = ({ rating, verdict }: Review) => !rating || verdict < -1;

export const get: RequestHandler<Context> = async ({ context: { entry } }) => {
	const reviews = readdirSync(entry).flatMap(
		(folder) => <(false | Review)[]>(!/draft/.test(folder) &&
				traverse<Review>(`${entry}/${folder}`, ({ frontMatter, breadcrumb }) => ({
					slug: `${folder}/${breadcrumb[breadcrumb.length - 1].split('.')[0]}`,
					category: folder,
					...frontMatter,
					rating: countAverageRating(frontMatter.rating),
					verdict: checkNum(frontMatter.verdict || -2),
				})))
	);

	return { body: fillSiblings(reviews.filter(isExists), 'reviews/', check) };
};
