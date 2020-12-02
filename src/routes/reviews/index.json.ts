import type { Request, Response } from 'express';
import { readdirSync } from 'fs';
import { checkNum } from 'svelement/utils';
import { parseDir } from '../../utils/parser';
import { countAverageRating, fillSiblings } from '../../utils/article';

const check = (review: RawReview) => !review.rating || !review.verdict;

export function get(_: Request, res: Response) {
	const DIR = 'content/reviews';
	const reviews = readdirSync(DIR).flatMap((folder) => {
		if (folder.includes('draft')) return undefined;

		function hydrate(data: RawReview, _: string, filename: string): FinalReview {
			const [slug] = filename.split('.');
			const review: FinalReview = {
				slug: `${folder}/${slug}`,
				category: folder,
				...data,
				rating: countAverageRating(data.rating),
				verdict: checkNum(data.verdict || -2),
			};
			return review;
		}

		return parseDir(`${DIR}/${folder}`, hydrate);
	});

	res.writeHead(200, { 'Content-Type': 'application/json' });
	res.end(JSON.stringify(fillSiblings(reviews.filter(Boolean), 'reviews/', check)));
}
