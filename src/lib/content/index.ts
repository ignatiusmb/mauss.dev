import { marker } from 'marqua/artisan';
import { traverse } from 'marqua/fs';
import { chain } from 'marqua/transform';
import { exists } from 'mauss/guards';
import { compare, regexp } from 'mauss';
import { assemble } from './media';

export const DATA = {
	get 'curated/'() {
		interface FrontMatter {
			branch: string;
			branches: string[];
			slug: string;
			date: string;
			title: string;
			tags?: string[];
		}

		const memo: Array<[slug: string, find: RegExp, url: string]> = [];

		const contents = traverse(
			{ entry: 'content/sites/dev.mauss/curated', depth: -1 },
			({ breadcrumb: [file, slug], buffer, parse, siblings }) => {
				if (file.includes('draft') || (file[0] !== '+' && !file.endsWith('.md'))) {
					const path = assemble(buffer, `/curated/${slug}/${file}`);
					path && memo.push([slug, regexp(`./${file}`, 'g'), path]);
					return;
				}

				const { content, metadata } = parse(buffer.toString('utf-8'));
				const specified: FrontMatter = {
					branch: file.slice(1, -3),
					branches: siblings.flatMap(({ type, name }) => {
						if (type !== 'file' && name[0] !== '+') return [];
						return name === file ? [] : name.slice(1, -3);
					}),

					slug,
					date: metadata.date,
					title: metadata.title,
				};
				return { ...metadata, ...specified, content };
			},
			(items) => items.sort(compare.key('date', compare.date)),
		);

		return contents.map((v) => {
			const replacements = memo.filter(([s]) => s === v.slug);

			return {
				...v,
				content: replacements.reduce((c, [, f, u]) => c.replace(f, u), v.content),
			};
		});
	},

	get 'posts/'() {
		interface FrontMatter {
			slug: string;
			date: string;
			title: string;
			description?: string;
			category: string;
			tags: string[];
			thumbnail?: string;
			image?: {
				en?: string;
			};
		}

		const thumbnails: Record<string, string> = {};
		const memo: Array<[slug: string, find: RegExp, url: string]> = [];

		const contents = traverse(
			{ entry: 'content/sites/dev.mauss/posts', depth: 1 },
			({ breadcrumb: [file, slug], buffer, parse }) => {
				if (file !== '+article.md') {
					const path = assemble(buffer, `/posts/${slug}/${file}`);
					if (path) {
						if (file.startsWith('thumbnail.')) thumbnails[slug] = path;
						memo.push([slug, regexp(`./${file}`, 'g'), path]);
					}
					return;
				}

				const { metadata, content } = parse(buffer.toString('utf-8'));
				const specified: FrontMatter = {
					slug,
					date: metadata.date,
					title: metadata.title,
					category: metadata.tags[0],
					tags: metadata.tags,
				};
				return { ...metadata, ...specified, content };
			},
			chain({
				base: 'posts/',
				sort({ date: xd }, { date: yd }) {
					return compare.date(xd, yd);
				},
			}),
		);

		return contents.map((v) => {
			const replacements = memo.filter(([s]) => s === v.slug);

			return {
				...v,
				thumbnail: thumbnails[v.slug] || v.thumbnail,
				content: replacements.reduce((c, [, f, u]) => c.replace(f, u), v.content),
			};
		});
	},

	get 'quotes/'() {
		return traverse(
			{ entry: 'content/sites/dev.mauss/quotes' },
			({ breadcrumb: [file], buffer, parse }) => {
				const body: Array<{ author: string; quote: string; from: string }> = [];
				const author = file.slice(0, -3).replace(/-/g, ' ');
				const { content } = parse(buffer.toString('utf-8'));
				for (const line of content.split(/\r?\n/).filter(exists)) {
					const [quote, from] = line.split('#!/');
					body.push({ author, quote, from });
				}
				return body;
			},
			(items) => items.flat(),
		);
	},

	get 'reviews/'() {
		interface FrontMatter {
			category: string;
			slug: string;
			date: string;
			released: string;
			composed: number;

			title: {
				short?: string;
				en: string;
				jp?: string;
			};
			genres: string[];
			rating?: number;
			verdict: 'pending' | 'not-recommended' | 'contextual' | 'recommended' | 'must-watch';

			completed: string | string[];
			seen: {
				first: string;
				last?: string;
			};
			image: {
				en: string;
				jp?: string;
			};
			backdrop?: string;
			link?: Record<string, string | string[]>;

			spoilers?: string;
			closing?: string;
		}

		function contentParser<T extends Record<string, any>>(data: T, content: string): string {
			const traverse = (meta: T | string, properties: string): string => {
				for (const key of properties.split(':')) {
					if (meta && typeof meta !== 'string') {
						meta = meta[Number.isNaN(Number(key)) ? key : Number(key)];
					}
				}
				return meta as string;
			};

			return content.replace(/#{(.+)}!/g, (s, c) => (c && traverse(data, c)) || s);
		}

		function countAverageRating(ratings?: string[]): number | undefined {
			if (!ratings || ratings.some((n) => Number.isNaN(+n))) return;
			const total = ratings.reduce((acc, cur) => +cur + acc, 0);
			return Math.round((total / ratings.length + Number.EPSILON) * 100) / 100;
		}

		const memo: Array<[slug: string, find: RegExp, url: string]> = [];
		const contents = traverse(
			{ entry: 'content/sites/dev.mauss/reviews', depth: -1 },
			({ breadcrumb: [file, slug, category], buffer, parse }) => {
				if (file !== '+article.md') {
					const path = assemble(buffer, `/reviews/${category}/${slug}/${file}`);
					path && memo.push([`${category}/${slug}`, regexp(`./${file}`, 'g'), path]);
					return;
				}

				const { content, metadata } = parse(buffer.toString('utf-8'));
				if (metadata.draft) return;

				const delta = +new Date(metadata.date) - +new Date(metadata.seen.first);

				const specified: FrontMatter = {
					category,
					slug: `${category}/${slug}`,
					date: metadata.date,
					released: metadata.released,
					composed: delta / 24 / 60 / 60 / 1000,

					title: metadata.title,
					genres: metadata.genres,
					rating: countAverageRating(metadata.rating),
					verdict: metadata.verdict,
					completed: metadata.completed,
					seen: {
						first: Array.isArray(metadata.seen.first)
							? metadata.seen.first[metadata.seen.first.length - 1]
							: metadata.seen.first,
						last: Array.isArray(metadata.seen.last)
							? metadata.seen.last[metadata.seen.last.length - 1]
							: metadata.seen.last,
					},
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
			},
			chain({
				base: 'reviews/',
				breakpoint: (r) => !r.rating || r.verdict === 'pending',
				sort: (x, y) => compare.date(x.date, y.date),
			}),
		);

		return contents.map((v) => {
			const replacements = memo.filter(([s]) => s === v.slug);

			return {
				...v,
				content: replacements.reduce((c, [, f, u]) => c.replace(f, u), v.content),
			};
		});
	},
} as const;
