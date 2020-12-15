import type { Request, Response } from 'express';
import type { Review } from '$utils/types';
import { readdirSync } from 'fs';
import { checkNum } from 'mauss/utils';
import { parseDir } from '$utils/parser';
import { countAverageRating, fillSiblings } from '$utils/article';

const check = (review: Review) => !review.rating || !review.verdict;

export async function get(_: Request, res: Response): Promise<void> {
	const DIR = 'content/reviews';
	const reviews = readdirSync(DIR).flatMap((folder) => {
		if (folder.includes('draft')) return;

		return parseDir<Review>(`${DIR}/${folder}`, ({ frontMatter, filename }) => {
			const [slug] = filename.split('.');
			const review = {
				slug: `${folder}/${slug}`,
				category: folder,
				...frontMatter,
				rating: countAverageRating(frontMatter.rating),
				verdict: checkNum(frontMatter.verdict || -2),
			};
			return review;
		});
	});

	res.writeHead(200, { 'Content-Type': 'application/json' });
	res.end(JSON.stringify(fillSiblings(reviews.filter(Boolean), 'reviews/', check)));
}
