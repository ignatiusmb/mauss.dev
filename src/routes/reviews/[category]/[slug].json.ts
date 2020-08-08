import type { Request, Response } from 'express';
import { parseFile, aquaMark } from '../../../utils/parser';
import { countAverageRating } from '../../../utils/article';

const parseSpoilers = (content: string, seasonIndex: number) => {
	const separator = '<!-- SPOILERS -->';
	const [review, spoilers] = content.split(separator);
	const [title, ...reviewArray] = review.trim().split('\n');
	const validTitle = title.startsWith('# ');
	return {
		title: validTitle ? title.slice(2) : `Season ${seasonIndex}`,
		content: validTitle ? aquaMark(reviewArray.join('\n')) : aquaMark(review),
		spoilers: spoilers ? aquaMark(spoilers) : null,
	};
};

export function get(req: Request, res: Response) {
	const { category, slug } = req.params;
	const filepath = `content/reviews/${category}/${slug}.md`;
	function hydrate(data: RawReview, content: string): FinalReview {
		const review: FinalReview = {
			slug: `${category}/${slug}`,
			category,
			...data,
			rating: countAverageRating(data.rating),
		};

		const final = '<!-- CLOSING -->';
		if (content.includes(final)) {
			const [article, closing] = content.split(final);
			content = article;
			review.closing = aquaMark(closing);
		}

		const seasons = '<!-- SEASON DIVIDER -->';
		if (content.includes(seasons)) {
			review.seasons = [];
			let currentSeason = 0;
			for (const season of content.split(seasons)) {
				if (!currentSeason++) review.content = season;
				else review.seasons.push(parseSpoilers(season, currentSeason));
			}
		} else {
			const { content: review, spoilers } = parseSpoilers(content, 1);
			if (spoilers) review.spoilers = spoilers;
			review.content = review;
		}
		return review;
	}

	const file = parseFile(filepath, hydrate);
	res.writeHead(200, { 'Content-Type': 'application/json' });
	res.end(JSON.stringify(file));
}
