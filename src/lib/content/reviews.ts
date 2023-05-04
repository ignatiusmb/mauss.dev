import { marker } from 'marqua/artisan';
import { compile, traverse } from 'marqua/fs';
import { chain } from 'marqua/transform';
import { tryNumber } from 'mauss/utils';
import { compare } from 'mauss';

interface FrontMatter {
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
		published: string;
		updated?: string;
	};
	image: {
		en: string;
		jp?: string;
	};
	backdrop?: string;
	link?: {
		mal?: string;
	};

	spoilers?: string;
	closing?: string;
}

export function all() {
	return traverse(
		{ entry: 'content/sites/dev.mauss/reviews', depth: -1 },
		({ breadcrumb: [filename, folder], buffer, parse }) => {
			const { metadata } = parse(buffer.toString('utf-8'));
			if (filename.includes('draft') || metadata.draft) return;

			const specified: FrontMatter = {
				slug: `${folder}/${filename.replace(/\.[^/.]+$/, '')}`,
				category: folder,
				composed: metadata.composed,
				released: metadata.released,
				title: metadata.title,
				genres: metadata.genres,
				rating: countAverageRating(metadata.rating),
				verdict: metadata.verdict || 'pending',
				completed: metadata.completed,
				seen: {
					first: Array.isArray(metadata.seen.first)
						? metadata.seen.first[metadata.seen.first.length - 1]
						: metadata.seen.first,
					last: Array.isArray(metadata.seen.last)
						? metadata.seen.last[metadata.seen.last.length - 1]
						: metadata.seen.last,
				},
				date: metadata.date,
				image: metadata.image,
			};

			return { ...metadata, ...specified };
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
		({ buffer, parse }) => {
			const { content, metadata } = parse(buffer.toString('utf-8'));
			if (Array.isArray(metadata.seen.first)) {
				const last = metadata.seen.first.length - 1;
				metadata.seen.first = metadata.seen.first[last];
			}
			if (metadata.seen.last && Array.isArray(metadata.seen.last)) {
				const last = metadata.seen.last.length - 1;
				metadata.seen.last = metadata.seen.last[last];
			}

			const dStart = +new Date(metadata.date.updated || metadata.date.published);
			const composed = (dStart - +new Date(metadata.seen.first)) / 24 / 60 / 60 / 1000;

			const specified: FrontMatter = {
				...metadata,
				slug: `${category}/${slug}`,
				category,
				composed,
				released: metadata.released,
				title: metadata.title,
				genres: metadata.genres,
				rating: countAverageRating(metadata.rating),
				verdict: metadata.verdict || 'pending',
				completed: metadata.completed,
				seen: {
					first: Array.isArray(metadata.seen.first)
						? metadata.seen.first[metadata.seen.first.length - 1]
						: metadata.seen.first,
					last: Array.isArray(metadata.seen.last)
						? metadata.seen.last[metadata.seen.last.length - 1]
						: metadata.seen.last,
				},
				date: metadata.date,
				image: metadata.image,
			};

			// TODO: separate into their own files
			const [article, closing] = content.split(/^## \$CLOSING/m);
			if (closing) {
				specified.closing = marker.render(contentParser(specified, closing));
			}
			const [summary, spoilers] = article.split(/^## \$SPOILERS/m);
			if (spoilers) {
				specified.spoilers = marker.render(contentParser(specified, spoilers));
			}

			return {
				...metadata,
				...specified,
				content: contentParser(specified, summary),
			};
		}
	)!;

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

export type Review = ReturnType<typeof get>;
export type ReviewIndex = ReturnType<typeof all>;
