import { traverse } from 'aubade/compass';
import { chain } from 'aubade/transform';
import * as compare from 'mauss/compare';
import { exists } from 'mauss/guards';
import { assemble } from './media';

export const DATA = {
	get 'curated/'() {
		interface FrontMatter {
			slug: string;
			date: string;
			title: string;
			tags?: string[];
		}

		const items = traverse('content/sites/dev.mauss/curated', { depth: -1 }).hydrate(
			({ breadcrumb: [, slug], buffer, parse, marker, siblings }) => {
				const { body, metadata } = parse(buffer.toString('utf-8'));

				const specified: FrontMatter = {
					slug,
					date: metadata.date,
					title: metadata.title,
				};

				const content = siblings.reduce((content, { type, breadcrumb: [file], buffer }) => {
					if (type !== 'file') return content;
					const output = assemble(buffer, `/curated/${slug}/${file}`);
					return content.replace(`./${file}`, output || `./${file}`);
				}, body);

				return {
					...metadata,
					...specified,
					content: marker.render(content),
					branches: siblings.flatMap(({ type, breadcrumb: [name], buffer }) => {
						if (type !== 'file' || name[0] !== '+') return [];
						const { body, metadata: extras } = parse(buffer.toString('utf-8'));
						return {
							...metadata,
							...specified,
							...extras,
							branch: name.slice(1, -3),
							title: `${extras.title} of ${specified.title}`,
							content: marker.render(body),
						};
					}),
				};
			},
			(path) => path.endsWith('+article.md'),
		);

		return items.sort(compare.key('date', compare.date));
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

		const items = traverse('content/sites/dev.mauss/posts', { depth: 1 }).hydrate(
			({ breadcrumb: [, slug], buffer, parse, marker, siblings }) => {
				const { body, metadata } = parse(buffer.toString('utf-8'));

				const specified: FrontMatter = {
					slug,
					date: metadata.date,
					title: metadata.title,
					category: metadata.tags[0],
					tags: metadata.tags,
				};

				const content = siblings.reduce((content, { type, breadcrumb: [file], buffer }) => {
					if (type !== 'file' || file.endsWith('.md')) return content;
					const output = assemble(buffer, `/posts/${slug}/${file}`);
					if (file.startsWith('thumbnail.')) specified.thumbnail = output;
					return content.replace(`./${file}`, output || `./${file}`);
				}, body);

				return {
					...metadata,
					...specified,
					content: marker.render(content),
				};
			},
			(path) => path.endsWith('+article.md'),
		);

		return chain(items, {
			base: 'posts/',
			sort({ date: xd }, { date: yd }) {
				return compare.date(xd, yd);
			},
		});
	},

	get 'quotes/'() {
		const items = traverse('content/sites/dev.mauss/quotes').hydrate(
			({ breadcrumb: [file], buffer, parse }) => {
				const content: Array<{ author: string; quote: string; from: string }> = [];
				const author = file.slice(0, -3).replace(/-/g, ' ');
				const { body } = parse(buffer.toString('utf-8'));
				for (const line of body.split(/\r?\n/).filter(exists)) {
					const [quote, from] = line.split('#!/');
					content.push({ author, quote, from });
				}
				return content;
			},
		);
		return items.flat();
	},

	get 'reviews/'() {
		interface FrontMatter {
			slug: string;
			date: string;
			category: string;
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

			completed: string;
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

		const items = traverse('content/sites/dev.mauss/reviews', { depth: -1 }).hydrate(
			({ breadcrumb: [, slug, category], buffer, parse, marker, siblings }) => {
				const { body, metadata } = parse(buffer.toString('utf-8'));
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

				const content = siblings.reduce((content, { type, breadcrumb: [file], buffer }) => {
					if (type !== 'file') return content;
					const output = assemble(buffer, `/reviews/${category}/${slug}/${file}`);
					return content.replace(`./${file}`, output || `./${file}`);
				}, body);

				return {
					...metadata,
					...specified,
					content: marker.render(content),
					branches: siblings.flatMap(({ type, breadcrumb: [name], buffer }) => {
						if (type !== 'file' || name[0] !== '+') return [];
						const { body, metadata: extras } = parse(buffer.toString('utf-8'));
						return {
							...metadata,
							...specified,
							...extras,
							branch: name.slice(1, -3),
							title: `${extras.title} of ${specified.title.en}`,
							content: marker.render(body),
						};
					}),
				};
			},
			(path) => path.endsWith('+article.md'),
		);

		return chain(items, {
			base: 'reviews/',
			breakpoint: (r) => !r.rating || r.verdict === 'pending',
			sort: (x, y) => compare.date(x.date, y.date),
		});
	},
} as const;
