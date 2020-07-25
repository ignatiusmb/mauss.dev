import { Request, Response } from 'express';
import { readdirSync } from 'fs';
import { parseDir } from '../../utils/parser';
import { countAverageRating, fillSiblings } from '../../utils/article';

const check = (review: Review) => !review.rating || !review.verdict;

export function get(_: Request, res: Response) {
	const DIR = 'content/reviews';
	const reviews = readdirSync(DIR).flatMap((folder) => {
		return parseDir(`${DIR}/${folder}`, (data: Review, _: string, filename: string) => {
			const [slug] = filename.split('.');
			const { rating, ...rest } = data;
			return {
				slug: `${folder}/${slug}`,
				category: folder,
				rating: countAverageRating(rating),
				...rest,
			};
		});
	});

	res.writeHead(200, { 'Content-Type': 'application/json' });
	res.end(JSON.stringify(fillSiblings(reviews, 'reviews/', check)));
}
