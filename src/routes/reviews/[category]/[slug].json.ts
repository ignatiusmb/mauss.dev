import type { RequestHandler } from '@sveltejs/kit';
import type { Context, Review } from '$lib/utils/types';
import { existsSync } from 'fs';
import { checkNum } from 'mauss/utils';
import { marker, compile } from 'marqua';
import { countAverageRating, contentParser } from '$lib/utils/article';

export const get: RequestHandler<Context> = async ({ params, context: { entry } }) => {
	if (!existsSync(`${entry}.md`)) return { status: 404 };

	const { category, slug } = params;
	const body = compile<Review>(`${entry}.md`, ({ frontMatter, content }) => {
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
