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

		return traverse(
			{ entry: 'content/sites/dev.mauss/curated', depth: -1 },
			({ breadcrumb: [file, slug], buffer, parse, siblings }) => {
				if (file[0] !== '+' || !file.endsWith('.md')) return;

				const { content, metadata } = parse(buffer.toString('utf-8'));
				const replacements = siblings.flatMap<[find: RegExp, url: string]>(
					({ type, name, buffer }) => {
						if (type === 'directory') return [];
						const output = assemble(buffer, `/curated/${slug}/${name}`);
						return output ? [[regexp(`./${name}`), output]] : [];
					},
				);

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

				return {
					...metadata,
					...specified,
					content: replacements.reduce((c, [f, u]) => c.replace(f, u), content),
				};
			},
			(items) => items.sort(compare.key('date', compare.date)),
		);
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

		return traverse(
			{ entry: 'content/sites/dev.mauss/posts', depth: 1 },
			({ breadcrumb: [file, slug], buffer, parse, siblings }) => {
				if (file !== '+article.md') return;

				const { content, metadata } = parse(buffer.toString('utf-8'));
				const replacements = siblings.flatMap<[find: RegExp, url: string]>(
					({ type, name, buffer }) => {
						if (type === 'directory' || name.endsWith('.md')) return [];
						const output = assemble(buffer, `/posts/${slug}/${name}`);
						return output ? [[regexp(`./${name}`), output]] : [];
					},
				);

				const thumbnail = replacements.find(([f]) => {
					const source = f.source.replace(/\\/g, '');
					return source.startsWith('./thumbnail.');
				});
				const specified: FrontMatter = {
					slug,
					date: metadata.date,
					title: metadata.title,
					category: metadata.tags[0],
					tags: metadata.tags,
					thumbnail: thumbnail ? thumbnail[1] : metadata.thumbnail,
				};

				return {
					...metadata,
					...specified,
					content: replacements.reduce((c, [f, u]) => c.replace(f, u), content),
				};
			},
			chain({
				base: 'posts/',
				sort({ date: xd }, { date: yd }) {
					return compare.date(xd, yd);
				},
			}),
		);
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

		function countAverageRating(ratings?: string[]): number | undefined {
			if (!ratings || ratings.some((n) => Number.isNaN(+n))) return;
			const total = ratings.reduce((acc, cur) => +cur + acc, 0);
			return Math.round((total / ratings.length + Number.EPSILON) * 100) / 100;
		}

		return traverse(
			{ entry: 'content/sites/dev.mauss/reviews', depth: -1 },
			({ breadcrumb: [file, slug, category], buffer, parse, siblings }) => {
				if (file !== '+article.md') return;

				const { content, metadata } = parse(buffer.toString('utf-8'));
				if (metadata.draft) return;

				const replacements = siblings.flatMap<[find: RegExp, url: string]>(
					({ type, name, buffer }) => {
						if (type === 'directory') return [];
						const output = assemble(buffer, `/reviews/${category}/${slug}/${name}`);
						return output ? [[regexp(`./${name}`), output]] : [];
					},
				);

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
					specified.closing = marker.render(closing);
				}
				const [summary, spoilers] = article.split(/^## \$SPOILERS/m);
				if (spoilers) {
					specified.spoilers = marker.render(spoilers);
				}

				return {
					...metadata,
					...specified,
					content: replacements.reduce((c, [f, u]) => c.replace(f, u), summary),
				};
			},
			chain({
				base: 'reviews/',
				breakpoint: (r) => !r.rating || r.verdict === 'pending',
				sort: (x, y) => compare.date(x.date, y.date),
			}),
		);
	},
} as const;
