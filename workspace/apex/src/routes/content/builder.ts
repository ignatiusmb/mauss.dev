import type { Options } from 'aubade/artisan';
import { typography } from 'aubade/artisan';
import { orchestrate } from 'aubade/conductor';
import { codeblock } from 'aubade/palette';
import { chain } from 'aubade/transform';
import { attempt, date, define } from 'mauss';
import sharp from 'sharp';

const ROOT = `${process.cwd()}/static/uploads`;
export const ROUTES = {
	async '/curated'() {
		const schema = attempt.wrap(
			define(({ optional, string, boolean }) => ({
				date: string(),
				title: string(typography),
				series: {
					title: string(typography),
					chapter: optional(string()),
				},
				description: optional(string(typography)),

				meta: optional({
					index: optional(boolean()),
				}),
			})),
		);

		const items = await orchestrate(
			'../content/routes/curated',
			({ breadcrumb: [file, slug], path }) => {
				if (file !== '+article.md') return;

				return async ({ assemble, buffer, siblings, task }) => {
					const { doc, manifest, meta } = assemble(buffer.toString('utf-8'));
					if (manifest.draft) return;
					const { data: metadata, error } = schema(manifest);
					if (!metadata) {
						console.log(`workspace/${path.slice(3)}`, (error as any).issues);
						return;
					}

					function materialize(source: string): string {
						const asset = siblings.find(({ filename }) => source.endsWith(filename));
						if (!asset || !/\.(jpe?g|png|svg|mp4)$/.test(asset.filename)) return source;

						const umbrella = `curated/${slug}`;
						const output = /\.(svg|mp4)$/.test(asset.filename)
							? asset.filename
							: asset.filename.replace(/\.[^/.]+$/, '.webp');
						task(async ({ fs }) => {
							await fs.mkdir(`${ROOT}/${umbrella}`, { recursive: true });
							const payload = await asset.buffer;
							const filename = `${ROOT}/${umbrella}/${output}`;
							if (['.svg', '.mp4'].some((ext) => output.endsWith(ext))) {
								return fs.writeFile(filename, payload);
							}
							return void sharp(payload).webp().toFile(filename);
						});
						return `/uploads/${umbrella}/${output}`;
					}

					const visitors: Options['transform'] = {
						'aubade:directive'(token) {
							if (token.meta.type !== 'video') return token;
							const { src } = token.meta.data;
							token.meta.data.src = materialize(src);
							return token;
						},
						'block:image'(token) {
							const { src } = token.attr;
							token.attr.src = materialize(src);
							return token;
						},
						'inline:image'(token) {
							const { src } = token.attr;
							token.attr.src = materialize(src);
							return token;
						},
					};

					const branches = siblings.map(async (branch) => {
						if (branch.filename[0] !== '+') return;
						const { doc, manifest, meta } = assemble((await branch.buffer).toString('utf-8'));
						if (!manifest || manifest.draft) return;
						doc.tokens = doc.visit(visitors);
						return {
							...manifest,
							table: meta.table,
							branch: branch.filename.slice(1, -3),
							content: doc.html({ 'block:code': codeblock }),
						};
					});

					doc.tokens = doc.visit(visitors);
					return {
						slug,
						...metadata,
						table: meta.table,
						content: doc.html({ 'block:code': codeblock }),
						branches: (await Promise.all(branches)).filter((b) => b != null),
					};
				};
			},
		);

		return items.sort((x, y) => date.sort.newest(x.date, y.date));
	},

	async '/posts'() {
		const schema = attempt.wrap(
			define(({ optional, array, literal, string }) => ({
				updated: optional(string()),
				date: string(),
				theme: optional(
					literal(
						'reflection', // personal thoughts or reflections on a topic
						'essay', // opinionated long-form exploration of a subject
						'guide', // practical instructions or how-to
						'moment', // brief observation or thought, short or small insight
						'archive', // republishing or preserving content for reference
						'pending', // unassigned or awaiting categorization
					),
					'pending',
				),
				title: string(typography),
				series: optional({
					title: string(typography),
					chapter: optional(string()),
				}),
				description: string(typography),
				tags: array(string()),
				thumbnail: optional(string()),
				image: optional(string()),
			})),
		);

		const items = await orchestrate(
			'../content/routes/posts',
			({ breadcrumb: [file, slug], path }) => {
				if (file !== '+article.md') return;

				return async ({ assemble, buffer, siblings, task }) => {
					const { doc, manifest, meta } = assemble(buffer.toString('utf-8'));
					if (manifest.draft) return;
					const { data: metadata, error } = schema(manifest);
					if (!metadata) {
						console.log(`workspace/${path.slice(3)}`, (error as any).issues);
						return;
					}

					function materialize(source: string): string {
						const asset = siblings.find(({ filename }) => source.endsWith(filename));
						if (!asset || !/\.(jpe?g|png|svg|mp4)$/.test(asset.filename)) return source;

						const umbrella = `posts/${slug}`;
						const output = /\.(svg|mp4)$/.test(asset.filename)
							? asset.filename
							: asset.filename.replace(/\.[^/.]+$/, '.webp');
						task(async ({ fs }) => {
							await fs.mkdir(`${ROOT}/${umbrella}`, { recursive: true });
							const payload = await asset.buffer;
							const filename = `${ROOT}/${umbrella}/${output}`;
							if (['.svg', '.mp4'].some((ext) => output.endsWith(ext))) {
								return fs.writeFile(filename, payload);
							}
							return void sharp(payload).webp().toFile(filename);
						});
						return `/uploads/${umbrella}/${output}`;
					}

					const thumbnail = siblings.find((s) => s.filename.startsWith('thumbnail.'));
					if (thumbnail) metadata.thumbnail = materialize(thumbnail.filename);

					doc.tokens = doc.visit({
						'aubade:directive'(token) {
							if (token.meta.type !== 'video') return token;
							const { src } = token.meta.data;
							token.meta.data.src = materialize(src);
							return token;
						},
						'block:image'(token) {
							const { src } = token.attr;
							token.attr.src = materialize(src);
							return token;
						},
						'inline:image'(token) {
							const { src } = token.attr;
							token.attr.src = materialize(src);
							return token;
						},
					});

					return {
						slug,
						...metadata,
						table: meta.table,
						content: doc.html({ 'block:code': codeblock }),
					};
				};
			},
		);

		return chain(items, {
			sorter: () => (x, y) => date.sort.newest(x.date, y.date),
			transform: ({ slug, title }) => ({ slug: `/posts/${slug}`, title }),
		});
	},

	async '/quotes'() {
		const items = await orchestrate('../content/routes/quotes', ({ breadcrumb: [file] }) => {
			return async ({ assemble, buffer }) => {
				const content: Array<{ author: string; quote: string; from: string }> = [];
				const author = file.slice(0, -3).replace(/-/g, ' ');
				const { meta } = assemble(buffer.toString('utf-8'));
				for (const line of meta.body.split(/\r?\n/).filter(Boolean)) {
					const [quote, from] = line.split('#!/');
					content.push({ author, quote, from });
				}
				return content;
			};
		});
		return items.flat();
	},

	async '/reviews'() {
		const schema = attempt.wrap(
			define(({ optional, array, record, literal, string }) => ({
				date: string(),
				title: string(typography),
				alias: optional(array(string()), []),

				tier: literal('S', 'A', 'B', 'C', 'D', '?'),
				released: string(),
				progress: optional(
					string((ratio) => {
						const [watched, episodes] = ratio.split('/');
						const total: number | '?' = episodes === '?' ? '?' : +episodes;
						return { watched: +watched, total };
					}),
				),
				completed: optional(
					string((ratio) => {
						if (!ratio) return 80;
						const [watched, total] = ratio.split('/');
						return Math.round((+watched / +total) * 80);
					}),
				),
				genres: array(string()),
				seen: { first: string(), last: optional(string()) },
				rating: optional(literal('peak', 'solid', 'mid', 'weak', 'trash')),

				poster: { source: literal('url', 'tmdb'), path: string() },
				backdrop: { source: literal('url', 'tmdb'), path: string() },
				link: optional(record(string())),
			})),
		);

		const items = await orchestrate(
			'../content/routes/reviews',
			({ breadcrumb: [file, slug, category], path }) => {
				if (file !== '+article.md') return;

				return async ({ assemble, buffer, siblings, task }) => {
					const { doc, manifest, meta } = assemble(buffer.toString('utf-8'));
					if (manifest.draft) return;
					const { data: metadata, error } = schema(manifest);
					if (!metadata) {
						console.log(`workspace/${path.slice(3)}`, (error as any).issues);
						return;
					}

					function materialize(source: string): string {
						const asset = siblings.find(({ filename }) => source.endsWith(filename));
						if (!asset || !/\.(jpe?g|png|svg|mp4)$/.test(asset.filename)) return source;

						const umbrella = `reviews/${category}/${slug}`;
						const output = /\.(svg|mp4)$/.test(asset.filename)
							? asset.filename
							: asset.filename.replace(/\.[^/.]+$/, '.webp');
						task(async ({ fs }) => {
							await fs.mkdir(`${ROOT}/${umbrella}`, { recursive: true });
							const payload = await asset.buffer;
							const filename = `${ROOT}/${umbrella}/${output}`;
							if (['.svg', '.mp4'].some((ext) => output.endsWith(ext))) {
								return fs.writeFile(filename, payload);
							}
							return void sharp(payload).webp().toFile(filename);
						});
						return `/uploads/${umbrella}/${output}`;
					}

					const visitors: Options['transform'] = {
						'aubade:directive'(token) {
							if (token.meta.type !== 'video') return token;
							const { src } = token.meta.data;
							token.meta.data.src = materialize(src);
							return token;
						},
						'block:image'(token) {
							const { src } = token.attr;
							token.attr.src = materialize(src);
							return token;
						},
						'inline:image'(token) {
							const { src } = token.attr;
							token.attr.src = materialize(src);
							return token;
						},
					};

					const branches = siblings.map(async (branch) => {
						if (branch.filename[0] !== '+') return;
						const payload = (await branch.buffer).toString('utf-8');
						const { doc, manifest, meta } = assemble(payload);
						if (!manifest || manifest.draft) return;
						doc.tokens = doc.visit(visitors);
						return {
							...manifest,
							table: meta.table,
							branch: branch.filename.slice(1, -3),
							content: doc.html({ 'block:code': codeblock }),
						};
					});

					doc.tokens = doc.visit(visitors);
					return {
						draft: date(metadata.date).is.before('2020-06-25'),
						slug: `${category}/${slug}`,
						category,
						...metadata,
						table: meta.table,
						composed: date(metadata.date).delta(metadata.seen.first).days,
						branches: (await Promise.all(branches)).filter((b) => b != null),
						content: doc.html({ 'block:code': codeblock }),
					};
				};
			},
		);

		return chain(items, {
			sorter: () => (x, y) => date.sort.newest(x.date, y.date),
			breakpoint: ({ draft }) => draft,
			transform: ({ slug, title }) => ({ slug: `/reviews/${slug}`, title }),
		});
	},

	async '/uploads'() {
		return await orchestrate<[umbrella: string, files: string[]]>(
			'../content/routes',
			({ breadcrumb, depth }) => {
				if (breadcrumb[0] !== '+article.md') return;
				const paths = breadcrumb.slice(1, depth + 1).reverse();
				return async ({ siblings, task }) => {
					if (siblings.length === 0) return;
					const umbrella = `${ROOT}/${paths.join('/')}`;
					const uploaded = siblings.flatMap((asset) => {
						if (!/\.(jpe?g|png|svg|mp4)$/.test(asset.filename)) return [];
						const output = /\.(svg|mp4)$/.test(asset.filename)
							? asset.filename
							: asset.filename.replace(/\.[^/.]+$/, '.webp');
						task(async ({ fs }) => {
							await fs.mkdir(umbrella, { recursive: true });
							const payload = await asset.buffer;
							if (['.svg', '.mp4'].some((ext) => output.endsWith(ext))) {
								return fs.writeFile(`${umbrella}/${output}`, payload);
							}
							const webp = sharp(payload).webp();
							return void webp.toFile(`${umbrella}/${output}`);
						});
						return output;
					});

					if (uploaded.length === 0) return;
					return [umbrella, uploaded];
				};
			},
		);
	},
};

export type Items = {
	[key in keyof typeof ROUTES]: Awaited<ReturnType<(typeof ROUTES)[key]>>;
};

export interface SeriesTable {
	[title: string]: Record<'slug' | 'title' | 'chapter', string>[];
}
