import type { RequestHandler } from '@sveltejs/kit';
import type { Review } from '$lib/utils/types';
import { checkNum } from 'mauss/utils';
import { marker, parseFile } from 'marqua';
import { countAverageRating, contentParser } from '$lib/utils/article';

export const get: RequestHandler = async ({ params }) => {
	const { category, slug } = params;
	const filepath = `content/reviews/${category}/${slug}.md`;

	const body = parseFile<Review>(filepath, ({ frontMatter, content }) => {
		const review = { slug: `${category}/${slug}`, category, ...frontMatter };

		const dStart = +new Date(frontMatter.date.updated || frontMatter.date.published);
		review.composed = (dStart - +new Date(frontMatter.last_seen)) / 24 / 60 / 60 / 1000;

		const [article, closing] = content.split(/^## \$CLOSING/m);
		if (closing) review.closing = marker.render(contentParser(review, closing));

		const [summary, spoilers] = article.split(/^## \$SPOILERS/m);
		if (spoilers) review.spoilers = marker.render(contentParser(review, spoilers));

		review.content = contentParser(review, summary);
		review.rating = countAverageRating(frontMatter.rating);
		review.verdict = checkNum(frontMatter.verdict || -2);
		return review;
	});

	return { body };
};
