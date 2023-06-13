import { marker } from 'marqua/artisan';
import { compile, traverse } from 'marqua/fs';
import { chain } from 'marqua/transform';
import { exists } from 'mauss/guards';
import { compare, regexp } from 'mauss';
import { optimize, write } from './media';

const ROOT = `${process.cwd()}/static`;

export const DATA = {
	get 'curated/'() {
		interface FrontMatter {
			slug: string;
			title: string;
			category: string;
			tags?: string[];
			date: string;
		}

		return {
			all() {
				const curated = traverse(
					{ entry: 'content/sites/dev.mauss/curated', depth: -1 },
					({ breadcrumb: [file, folder], buffer, parse }) => {
						const { metadata } = parse(buffer.toString('utf-8'));
						if (metadata.draft || file.includes('draft')) return;
						const specified: FrontMatter = {
							slug: `${folder}/${file.replace(/\.[^/.]+$/, '')}`,
							title: metadata.title,
							category: folder,
							date: metadata.date,
						};
						return { ...metadata, ...specified };
					},
					(items) => items.sort(compare.key('date', compare.date))
				);

				return curated;
			},
			get(category: string, slug: string) {
				const content = compile(
					`content/sites/dev.mauss/curated/${category}/${slug}.md`,
					({ buffer, parse }) => {
						const { content, metadata } = parse(buffer.toString('utf-8'));

						const specified: FrontMatter = {
							slug: `${category}/${slug}`,
							title: metadata.title,
							category,
							date: metadata.date,
						};
						return { ...metadata, ...specified, content };
					}
				)!;

				return content;
			},
		};
	},

	get 'posts/'() {
		interface FrontMatter {
			slug: string;
			title: string;
			description?: string;
			category: string;
			tags: string[];
			date: string;
			thumbnail?: string;
			image?: {
				en?: string;
			};
		}

		return {
			all() {
				const thumbnails: Record<string, string> = {};
				const contents = traverse(
					{ entry: 'content/sites/dev.mauss/posts', depth: 1 },
					({ breadcrumb: [file, slug], buffer, parse }) => {
						if (file !== '+article.md') {
							if (!/\.(jpe?g|png|svg)$/.test(file)) return;
							const name = file.replace(/\.[^/.]+$/, '.webp');
							const path = `/uploads/posts/${slug}/${name}`;
							if (file.startsWith('thumbnail.')) thumbnails[slug] = path;
							return void optimize(buffer).to(ROOT + path);
						}

						const { metadata } = parse(buffer.toString('utf-8'));
						const specified: FrontMatter = {
							slug,
							title: metadata.title,
							category: metadata.tags[0],
							tags: metadata.tags,
							date: metadata.date,
						};
						return { ...metadata, ...specified };
					},
					chain({
						base: 'posts/',
						sort({ date: xd }, { date: yd }) {
							return compare.date(xd, yd);
						},
					})
				);

				return contents.map((v) => ({ ...v, thumbnail: thumbnails[v.slug] || v.thumbnail }));
			},
			get(slug: string) {
				const memo: Array<[find: RegExp, url: string]> = [];
				const article = traverse(
					{ entry: `content/sites/dev.mauss/posts/${slug}` },
					({ breadcrumb: [file], buffer, parse }) => {
						if (file !== '+article.md') {
							if (!/\.(jpe?g|png|svg)$/.test(file)) return;
							const name = file.replace(/\.[^/.]+$/, '.webp');
							const path = `/uploads/posts/${slug}/${name}`;
							memo.push([regexp(`./${file}`, 'g'), path]);
							return void optimize(buffer).to(ROOT + path);
						}
						const { content, metadata } = parse(buffer.toString('utf-8'));
						const specified: FrontMatter = {
							slug,
							title: metadata.title,
							category: metadata.tags[0],
							tags: metadata.tags,
							date: metadata.date,
						};
						return { ...metadata, ...specified, content };
					}
				)[0];

				const content = memo.reduce(
					(content, [find, url]) => content.replace(find, url),
					article.content
				);

				return { ...article, content };
			},
		};
	},

	get 'quotes/'() {
		return {
			all() {
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
					(items) => items.flat()
				);
			},
		};
	},

	get 'reviews/'() {
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
			verdict: (typeof VERDICTS)[number];

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
			link?: Record<string, string | string[]>;

			spoilers?: string;
			closing?: string;
		}

		const VERDICTS = [
			'pending',
			'not-recommended',
			'contextual',
			'recommended',
			'must-watch',
		] as const;

		function contentParser<T extends Record<string, any>>(data: T, content: string): string {
			const traverse = (meta: T | string, properties: string): string => {
				for (const key of properties.split(':')) {
					if (typeof meta !== 'string') {
						meta = meta[Number.isNaN(Number(key)) ? key : Number(key)];
					}
				}
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

		return {
			VERDICTS,

			all() {
				return traverse(
					{ entry: 'content/sites/dev.mauss/reviews', depth: -1 },
					({ breadcrumb: [file, slug, category], buffer, parse }) => {
						if (file !== '+article.md') {
							const target = `${ROOT}/uploads/reviews/${category}/${slug}`;
							if (/\.(mp4)$/.test(file)) {
								return void write(buffer).to(`${target}/${file}`);
							}

							if (!/\.(jpe?g|png|svg)$/.test(file)) return;
							const name = file.replace(/\.[^/.]+$/, '.webp');
							return void optimize(buffer).to(`${target}/${name}`);
						}

						const { metadata } = parse(buffer.toString('utf-8'));
						if (metadata.draft) return;

						const specified: FrontMatter = {
							slug: `${category}/${slug}`,
							category: category,
							composed: metadata.composed,
							released: metadata.released,
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
			},
			get(category: string, slug: string) {
				const memo: Array<[find: RegExp, url: string]> = [];
				const article = traverse(
					{ entry: `content/sites/dev.mauss/reviews/${category}/${slug}` },
					({ breadcrumb: [file], buffer, parse }) => {
						if (file !== '+article.md') {
							if (/\.(mp4)$/.test(file)) {
								const path = `/uploads/reviews/${category}/${slug}/${file}`;
								memo.push([regexp(`./${file}`, 'g'), path]);
								return void write(buffer).to(ROOT + path);
							}
							if (!/\.(jpe?g|png|svg)$/.test(file)) return;
							const name = file.replace(/\.[^/.]+$/, '.webp');
							const path = `/uploads/reviews/${category}/${slug}/${name}`;
							memo.push([regexp(`./${file}`, 'g'), path]);
							return void optimize(buffer).to(ROOT + path);
						}

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
				)[0];

				const content = memo.reduce(
					(content, [find, url]) => content.replace(find, url),
					article.content
				);

				return { ...article, content };
			},
		};
	},
} as const;
