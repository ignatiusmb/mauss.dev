import type { RequestHandler } from './__types/index.json';
import type { RawReview, Review } from '$lib/types';
import { countAverageRating, fillSiblings } from '$lib/utils/article';
import { traverse, forge } from 'marqua';
import { compare } from 'mauss';

type Returned = Omit<Review, 'composed'>;

export const GET: RequestHandler<Returned[]> = async ({ locals: { entry } }) => {
	const config = forge.traverse({
		entry,
		recurse: true,
		sort(x: Review, y: Review) {
			const xd = x.date.updated || x.date.published;
			const yd = y.date.updated || y.date.published;
			return compare.date(xd, yd);
		},
	});
	const reviews = traverse<typeof config, RawReview, Returned>(
		config,
		({ frontMatter, breadcrumb: [filename, folder] }) => {
			if (filename.includes('draft') || frontMatter.draft) return;

			const seen = {} as { first: string; last?: string };
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

	return {
		body: fillSiblings(reviews, 'reviews/', (r) => !r.rating || r.verdict !== 'pending'),
	};
};
