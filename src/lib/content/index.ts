import { traverse } from 'aubade/compass';
import { chain } from 'aubade/transform';
import { exists } from 'mauss/guards';
import { compare } from 'mauss';
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

		const shelf = traverse('content/sites/dev.mauss/curated', {
			depth: -1,
			files(path) {
				const file = path.slice(path.lastIndexOf('/') + 1);
				return file[0] === '+' && file.endsWith('.md');
			},
		});

		return shelf.hydrate(
			({ breadcrumb: [file, slug], buffer, parse, marker, siblings }) => {
				const { body, metadata } = parse(buffer.toString('utf-8'));

				const specified: FrontMatter = {
					branch: file.slice(1, -3),
					branches: siblings.flatMap(({ type, breadcrumb: [name] }) => {
						if (type !== 'file' && name[0] !== '+') return [];
						return name === file ? [] : name.slice(1, -3);
					}),

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

		const shelf = traverse('content/sites/dev.mauss/posts', {
			depth: 1,
			files: (path) => path.endsWith('+article.md'),
		});

		return shelf.hydrate(
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
			chain({
				base: 'posts/',
				sort({ date: xd }, { date: yd }) {
					return compare.date(xd, yd);
				},
			}),
		);
	},

	get 'quotes/'() {
		return traverse('content/sites/dev.mauss/quotes').hydrate(
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
			(items) => items.flat(),
		);
	},

	get 'reviews/'() {
		interface FrontMatter {
			category: string;
			branch: string;
			branches: string[];

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

		const shelf = traverse('content/sites/dev.mauss/reviews', {
			depth: -1,
			files(path) {
				const file = path.slice(path.lastIndexOf('/') + 1);
				return file[0] === '+' && file.endsWith('.md');
			},
		});

		return shelf.hydrate(
			({ breadcrumb: [file, slug, category], buffer, parse, marker, siblings }) => {
				const { body, metadata } = parse(buffer.toString('utf-8'));
				if (metadata.draft) return;

				const delta = +new Date(metadata.date) - +new Date(metadata.seen.first);
				const specified: FrontMatter = {
					category,
					branch: file.slice(1, -3),
					branches: siblings.flatMap(({ type, breadcrumb: [name] }) => {
						if (type !== 'file' && name[0] !== '+') return [];
						return name === file ? [] : name.slice(1, -3);
					}),

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

				// TODO: separate into their own files
				const [article, closing] = content.split(/^## \$CLOSING/m);
				if (closing) specified.closing = marker.render(closing);
				const [summary, spoilers] = article.split(/^## \$SPOILERS/m);
				if (spoilers) specified.spoilers = marker.render(spoilers);

				return {
					...metadata,
					...specified,
					content: marker.render(summary),
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
