import type { RequestHandler } from './__types/[slug].json';
import type { RawReview, Review } from '$lib/types';
import { countAverageRating, contentParser } from '$lib/utils/article';
import { marker, compile } from 'marqua';

export const GET: RequestHandler<Review> = async ({ params, locals: { entry } }) => {
	const { category, slug } = params;
	const body = compile<{ entry: string }, RawReview, Review>(
		`${entry}.md`,
		({ frontMatter, content }) => {
			const review = {
				slug: `${category}/${slug}`,
				category,
				...frontMatter,
				rating: countAverageRating(frontMatter.rating),
			} as Review;

			const dStart = +new Date(frontMatter.date.updated || frontMatter.date.published);
			if (typeof frontMatter.seen.first !== 'string') {
				frontMatter.seen.first = frontMatter.seen.first[0];
			}
			review.composed = (dStart - +new Date(frontMatter.seen.first)) / 24 / 60 / 60 / 1000;

			const [article, closing] = (content as string).split(/^## \$CLOSING/m);
			if (closing) review.closing = marker.render(contentParser(review, closing));

			const [summary, spoilers] = article.split(/^## \$SPOILERS/m);
			if (spoilers) review.spoilers = marker.render(contentParser(review, spoilers));

			review.content = contentParser(review, summary);
			review.verdict = frontMatter.verdict || 'pending';
			return review;
		}
	);

	return body ? { body } : { status: 404 };
};
