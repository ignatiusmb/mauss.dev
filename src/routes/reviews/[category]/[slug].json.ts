import type { Request, Response } from 'express';
import { parseFile } from '../../../utils/parser';
import { countAverageRating, contentParser } from '../../../utils/article';
import marker from '../../../utils/marker';

export function get(req: Request, res: Response) {
	const { category, slug } = req.params;
	const filepath = `content/reviews/${category}/${slug}.md`;
	function hydrate(data: RawReview, content: string): FinalReview {
		const review: FinalReview = { slug: `${category}/${slug}`, category, ...data };

		const dStart = +new Date(data.date.updated || data.date.published);
		review.composed = (dStart - +new Date(data.last_seen)) / 24 / 60 / 60 / 1000;

		const [article, closing] = content.split(/^## \$CLOSING/m);
		if (closing) review.closing = marker.render(contentParser(review, closing));

		const [summary, spoilers] = article.split(/^## \$SPOILERS/m);
		if (spoilers) review.spoilers = marker.render(contentParser(review, spoilers));

		review.content = contentParser(review, summary);
		review.rating = countAverageRating(data.rating);
		return review;
	}

	res.writeHead(200, { 'Content-Type': 'application/json' });
	res.end(JSON.stringify(parseFile(filepath, hydrate)));
}
