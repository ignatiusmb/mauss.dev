import { marker } from 'marqua/artisan';
import { compile, traverse } from 'marqua/fs';
import { chain } from 'marqua/transform';
import { tryNumber } from 'mauss/utils';
import { compare } from 'mauss';

export interface Review {
	slug: string;
	category: string;
	composed: number;

	released: string;
	title: {
		short?: string;
		en: string;
		jp?: string;
	};
	genres: string[];
	rating?: number;
	verdict: typeof import('$lib/constants')['VERDICTS'][number];

	completed: string | string[];
	seen: {
		first: string;
		last?: string;
	};
	date: {
		published: string | Date;
		updated?: string | Date;
	};
	image: {
		en: string;
		jp?: string;
	};
	backdrop?: string;
	link?: {
		mal?: string;
	};

	estimate: number;
	table: any;
	content?: string;
	spoilers?: string;
	closing?: string;
}

export function all() {
	return traverse(
		{ entry: 'content/sites/dev.mauss/reviews', depth: -1 },
		({ breadcrumb: [filename, folder], frontMatter }) => {
			if (filename.includes('draft') || frontMatter.draft) return;

			frontMatter = frontMatter as Review;
			if (Array.isArray(frontMatter.seen.first)) {
				const last = frontMatter.seen.first.length - 1;
				frontMatter.seen.first = frontMatter.seen.first[last];
			}
			if (frontMatter.seen.last && Array.isArray(frontMatter.seen.last)) {
				const last = frontMatter.seen.last.length - 1;
				frontMatter.seen.last = frontMatter.seen.last[last];
			}

			return {
				...frontMatter,
				slug: `${folder}/${filename.split('.')[0]}`,
				category: folder,
				rating: countAverageRating(frontMatter.rating),
				verdict: frontMatter.verdict || 'pending',
			} as Review;
		},
		chain({
			base: 'reviews/',
			breakpoint: (r) => !r.rating || r.verdict !== 'pending',
			sort(x, y) {
				const xd = x.date.updated || x.date.published;
				const yd = y.date.updated || y.date.published;
				return compare.date(xd, yd);
			},
		})
	);
}

export function get(category: string, slug: string) {
	const body = compile(
		`content/sites/dev.mauss/reviews/${category}/${slug}.md`,
		({ frontMatter, content }) => {
			frontMatter = frontMatter as Review;
			if (Array.isArray(frontMatter.seen.first)) {
				const last = frontMatter.seen.first.length - 1;
				frontMatter.seen.first = frontMatter.seen.first[last];
			}
			if (frontMatter.seen.last && Array.isArray(frontMatter.seen.last)) {
				const last = frontMatter.seen.last.length - 1;
				frontMatter.seen.last = frontMatter.seen.last[last];
			}

			const dStart = +new Date(frontMatter.date.updated || frontMatter.date.published);
			const composed = (dStart - +new Date(frontMatter.seen.first)) / 24 / 60 / 60 / 1000;

			const review: Record<string, any> = {
				...frontMatter,
				category,
				composed,
				slug: `${category}/${slug}`,
				rating: countAverageRating(frontMatter.rating),
				verdict: frontMatter.verdict || 'pending',
			};

			const [article, closing] = (content as string).split(/^## \$CLOSING/m);
			if (closing) review.closing = marker.render(contentParser(review, closing));

			const [summary, spoilers] = article.split(/^## \$SPOILERS/m);
			if (spoilers) review.spoilers = marker.render(contentParser(review, spoilers));

			review.content = contentParser(review, summary);
			return review as Review;
		}
	);

	return body;
}

function contentParser<T extends Record<string, any>>(data: T, content: string): string {
	const traverse = (meta: T | string, properties: string): string => {
		for (const key of properties.split(':'))
			if (typeof meta !== 'string') meta = meta[tryNumber(key)];
		return meta as string;
	};

	return content.replace(/#{(.+)}!/g, (s, c) => (c && traverse(data, c)) || s);
}

function countAverageRating(ratings?: string[] | number): number | undefined {
	if (typeof ratings === 'number') return ratings;
	if (!ratings || ratings.some((n) => Number.isNaN(+n))) return;
	const total = ratings.reduce((acc, cur) => +cur + acc, 0);
	return Math.round((total / ratings.length + Number.EPSILON) * 100) / 100;
}
