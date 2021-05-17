import type { RequestHandler } from '@sveltejs/kit';
import type { Locals, Review } from '$lib/utils/types';
import { countAverageRating, contentParser } from '$lib/utils/article';
import { tryNumber } from 'mauss/utils';
import { marker, compile } from 'marqua';

export const get: RequestHandler<Locals> = async ({ params, locals: { entry } }) => {
	const { category, slug } = params;
	const body = compile<{ entry: string }, Review>(`${entry}.md`, ({ frontMatter, content }) => {
		const review = { slug: `${category}/${slug}`, category, ...frontMatter };

		const dStart = +new Date(frontMatter.date.updated || frontMatter.date.published);
		review.composed = (dStart - +new Date(frontMatter.last_seen)) / 24 / 60 / 60 / 1000;

		const [article, closing] = (content as unknown as string).split(/^## \$CLOSING/m);
		if (closing) review.closing = marker.render(contentParser(review, closing));

		const [summary, spoilers] = article.split(/^## \$SPOILERS/m);
		if (spoilers) review.spoilers = marker.render(contentParser(review, spoilers));

		review.content = contentParser(review, summary);
		review.rating = countAverageRating(frontMatter.rating);
		review.verdict = tryNumber(frontMatter.verdict || -2);
		return review;
	});

	return body ? { body } : { status: 404 };
};
