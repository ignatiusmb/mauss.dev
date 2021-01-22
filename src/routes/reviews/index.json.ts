import type { Request, Response } from 'express';
import type { Review } from '$utils/types';
import { readdirSync } from 'fs';
import { isExists } from 'mauss/guards';
import { checkNum } from 'mauss/utils';
import { parseDir } from '$utils/parser';
import { countAverageRating, fillSiblings } from '$utils/article';

const check = ({ rating, verdict }: Review) => !rating || verdict < -1;

export async function get(_: Request, res: Response): Promise<void> {
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

	res.writeHead(200, { 'Content-Type': 'application/json' });
	res.end(JSON.stringify(fillSiblings(reviews.filter(isExists), 'reviews/', check)));
}
