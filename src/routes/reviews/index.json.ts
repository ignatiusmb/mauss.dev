import type { RequestHandler } from '@sveltejs/kit';
import type { Review } from '$lib/utils/types';
import { readdirSync } from 'fs';
import { isExists } from 'mauss/guards';
import { checkNum } from 'mauss/utils';
import { traverse } from 'marqua';
import { countAverageRating, fillSiblings } from '$lib/utils/article';

const check = ({ rating, verdict }: Review) => !rating || verdict < -1;

export const get: RequestHandler = async ({ context: { entry } }) => {
	const reviews = readdirSync(entry).flatMap(
		(folder) => <(false | Review)[]>(!/draft/.test(folder) &&
				traverse<Review>(`${entry}/${folder}`, ({ frontMatter, filename }) => ({
					slug: `${folder}/${filename.split('.')[0]}`,
					category: folder,
					...frontMatter,
					rating: countAverageRating(frontMatter.rating),
					verdict: checkNum(frontMatter.verdict || -2),
				})))
	);

	return { body: fillSiblings(reviews.filter(isExists), 'reviews/', check) };
};
