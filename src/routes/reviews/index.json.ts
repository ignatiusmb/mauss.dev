import type { Review } from '$lib/utils/types';
import { readdirSync } from 'fs';
import { isExists } from 'mauss/guards';
import { checkNum } from 'mauss/utils';
import { parseDir } from '$lib/utils/parser';
import { countAverageRating, fillSiblings } from '$lib/utils/article';

const check = ({ rating, verdict }: Review) => !rating || verdict < -1;

export async function get() {
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
		status: 200,
		headers: { 'Content-Type': 'application/json' },
		body: fillSiblings(reviews.filter(isExists), 'reviews/', check),
	};
}
