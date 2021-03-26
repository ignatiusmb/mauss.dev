import type { RequestHandler } from '@sveltejs/kit';
import type { Review } from '$lib/utils/types';
import { readdirSync } from 'fs';
import { isExists } from 'mauss/guards';
import { checkNum } from 'mauss/utils';
import { parseDir } from 'marqua';
import { countAverageRating, fillSiblings } from '$lib/utils/article';

const check = ({ rating, verdict }: Review) => !rating || verdict < -1;

export const get: RequestHandler = async () => {
	const DIR = 'content/reviews';
	const reviews = readdirSync(DIR).flatMap(
		(folder) => <(false | Review)[]>(!/draft/.test(folder) &&
				parseDir<Review>(`${DIR}/${folder}`, ({ frontMatter, filename }) => ({
					slug: `${folder}/${filename.split('.')[0]}`,
					category: folder,
					...frontMatter,
					rating: countAverageRating(frontMatter.rating),
					verdict: checkNum(frontMatter.verdict || -2),
				})))
	);

	return {
		headers: { 'Content-Type': 'application/json' },
		body: fillSiblings(reviews.filter(isExists), 'reviews/', check),
	};
};
