import type { RawReview, Review } from '$lib/types';
import { compile, forge, marker, traverse } from 'marqua';
import { compare } from 'mauss';
import { contentParser, fillSiblings } from '$lib/utils/article';

export function all() {
	const config = forge.traverse({
		entry: 'content/sites/dev.mauss/reviews',
		recurse: true,
		sort(x: Review, y: Review) {
			const xd = x.date.updated || x.date.published;
			const yd = y.date.updated || y.date.published;
			return compare.date(xd, yd);
		},
	});

	type Returned = Omit<Review, 'composed'>;
	const reviews = traverse<typeof config, RawReview, Returned>(
		config,
		({ frontMatter, breadcrumb: [filename, folder] }) => {
			if (filename.includes('draft') || frontMatter.draft) return;

			const seen = {} as Review['seen'];
			if (typeof frontMatter.seen.first !== 'string') {
				seen.first = frontMatter.seen.first[0];
			} else seen.first = frontMatter.seen.first;
			if (frontMatter.seen.last) {
				if (typeof frontMatter.seen.last !== 'string') {
					seen.last = frontMatter.seen.last[0];
				} else seen.last = frontMatter.seen.last;
			}

			return {
				slug: `${folder}/${filename.split('.')[0]}`,
				category: folder,
				...frontMatter,
				seen,
				rating: countAverageRating(frontMatter.rating),
				verdict: frontMatter.verdict || 'pending',
			};
		}
	);

	return fillSiblings(reviews, 'reviews/', (r) => !r.rating || r.verdict !== 'pending');
}

export function get(category: string, slug: string) {
	const body = compile<{ entry: string }, RawReview, Review>(
		`content/sites/dev.mauss/reviews/${category}/${slug}.md`,
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

	return body;
}

function countAverageRating(ratings?: string[] | number): number | undefined {
	if (typeof ratings === 'number') return ratings;
	if (!ratings || ratings.some((n) => Number.isNaN(+n))) return;
	const total = ratings.reduce((acc, cur) => +cur + acc, 0);
	return Math.round((total / ratings.length + Number.EPSILON) * 100) / 100;
}
