import { marker } from 'aubade/artisan';
import { orchestrate } from 'aubade/conductor';
import { chain } from 'aubade/transform';
// import { exec } from 'node:child_process';
import { attempt, compare, date, define, drill, sum } from 'mauss';
import { exists } from 'mauss/guards';
import sharp from 'sharp';

// async function updated(path: string): Promise<string> {
// 	return await new Promise((resolve) => {
// 		exec(`git log -1 --format=%ad --date=iso-strict "${path}"`, (_, out) => resolve(out.trim()));
// 	});
// }

const ROOT = `${process.cwd()}/static/uploads`;
export const ROUTES = {
	async '/curated'() {
		const schema = attempt.wrap(
			define(({ optional, literal, string }) => ({
				date: string(),
				title: string(),
				series: optional({
					title: string(),
					type: literal('linear', 'collection'),
				}),
				description: optional(string()),
			})),
		);

		const series: Record<string, string> = {};
		const items = await orchestrate(
			'../content/routes/curated',
			({ breadcrumb: [file, slug], path }) => {
				if (file !== '+article.md') return;

				return async ({ assemble, buffer, siblings, task }) => {
					const { manifest, meta } = assemble(buffer.toString('utf-8'));
					if (manifest.draft) return;
					const { data: metadata, error } = schema(manifest);
					if (!metadata) {
						console.log(`workspace/${path.slice(3)}`, (error as any).issues);
						return;
					}

					if (metadata.series && !series[metadata.series.title]) {
						series[metadata.series.title] = metadata.series.type;
					}

					const umbrella = `curated/${slug}`;
					const content = meta.body.replace(/\.\/([^\s)]+)/g, (m, relative) => {
						const asset = siblings.find(({ filename }) => relative === filename);
						if (!asset || !/\.(jpe?g|png|svg|mp4)$/.test(asset.filename)) return m;

						const output = /\.(mp4)$/.test(asset.filename)
							? asset.filename
							: asset.filename.replace(/\.[^/.]+$/, '.webp');

						task(async ({ fs }) => {
							await fs.mkdir(`${ROOT}/${umbrella}`, { recursive: true });
							const payload = await asset.buffer;
							const filename = `${ROOT}/${umbrella}/${output}`;
							if (output.endsWith('.mp4')) return fs.writeFile(filename, payload);
							return void sharp(payload).webp().toFile(filename);
						});

						return `/uploads/${umbrella}/${output}`;
					});

					const branches = siblings.map(async (branch) => {
						if (branch.filename[0] !== '+') return;
						const { manifest: extras, meta } = assemble((await branch.buffer).toString('utf-8'));
						if (!extras || extras.draft) return;
						return {
							...extras,
							branch: branch.filename.slice(1, -3),
							content: marker.render(meta.body),
						};
					});

					return {
						slug,
						...metadata,
						table: meta.table,
						content: marker.render(content),
						branches: (await Promise.all(branches)).filter((b) => b != null),
					};
				};
			},
		);

		type Schema = NonNullable<ReturnType<typeof schema>['data']>;
		const sort: Record<NonNullable<Schema['series']>['type'], Parameters<typeof items.sort>[0]> = {
			collection: drill('title', compare.string),
			linear: drill('date', date.sort.newest),
		};

		for (const title in series) {
			const filtered = items.filter((i) => i.series?.title === title);
			chain(filtered, {
				sort: sort[series[title] as keyof typeof sort],
				transform: ({ slug, title }) => ({ slug: `/curated/${slug}`, title }),
			});
		}

		return items.sort(drill('date', date.sort.newest));
	},

	async '/posts'() {
		const schema = attempt.wrap(
			define(({ optional, array, literal, string }) => ({
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
				title: string(),
				description: optional(string()),
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
					const { manifest, meta } = assemble(buffer.toString('utf-8'));
					if (manifest.draft) return;
					const { data: metadata, error } = schema(manifest);
					if (!metadata) {
						console.log(`workspace/${path.slice(3)}`, (error as any).issues);
						return;
					}

					const umbrella = `posts/${slug}`;
					const content = meta.body.replace(/\.\/([^\s)]+)/g, (m, relative) => {
						const asset = siblings.find(({ filename }) => relative === filename);
						if (!asset || !/\.(jpe?g|png|svg|mp4)$/.test(asset.filename)) return m;

						const output = /\.(mp4)$/.test(asset.filename)
							? asset.filename
							: asset.filename.replace(/\.[^/.]+$/, '.webp');
						task(async ({ fs }) => {
							await fs.mkdir(`${ROOT}/${umbrella}`, { recursive: true });
							const payload = await asset.buffer;
							const filename = `${ROOT}/${umbrella}/${output}`;
							if (output.endsWith('.mp4')) return fs.writeFile(filename, payload);
							return void sharp(payload).webp().toFile(filename);
						});

						return `/uploads/${umbrella}/${output}`;
					});

					const thumbnail = siblings.find(({ filename }) => filename.startsWith('thumbnail.'));
					if (thumbnail) {
						const output = thumbnail.filename.replace(/\.[^/.]+$/, '.webp');
						task(async ({ fs }) => {
							await fs.mkdir(`${ROOT}/${umbrella}`, { recursive: true });
							const webp = sharp(await thumbnail.buffer).webp();
							return void webp.toFile(`${ROOT}/${umbrella}/${output}`);
						});
						metadata.thumbnail = `/uploads/${umbrella}/${output}`;
					}

					return {
						slug,
						...metadata,
						table: meta.table,
						content: marker.render(content),
					};
				};
			},
		);

		return chain(items, {
			sort: drill('date', date.sort.newest),
			transform: ({ slug, title }) => ({ slug: `/posts/${slug}`, title }),
		});
	},

	async '/quotes'() {
		const items = await orchestrate('../content/routes/quotes', ({ breadcrumb: [file] }) => {
			return async ({ assemble, buffer }) => {
				const content: Array<{ author: string; quote: string; from: string }> = [];
				const author = file.slice(0, -3).replace(/-/g, ' ');
				const { meta } = assemble(buffer.toString('utf-8'));
				for (const line of meta.body.split(/\r?\n/).filter(exists)) {
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
			define(({ optional, array, record, literal, string, number }) => ({
				date: string(),
				title: string(),
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
				rating: optional(
					record(
						array(
							record(number(), (pts) => sum(Object.values(pts))),
							(score) => sum(score) / score.length,
						),
						(rubric) => {
							const ratings = Object.values(rubric);
							return (sum(ratings) / ratings.length).toFixed(2);
						},
					),
				),

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
					const { manifest, meta } = assemble(buffer.toString('utf-8'));
					if (manifest.draft) return;
					const { data: metadata, error } = schema(manifest);
					if (!metadata) {
						console.log(`workspace/${path.slice(3)}`, (error as any).issues);
						return;
					}

					const umbrella = `reviews/${category}/${slug}`;
					const content = meta.body.replace(/\.\/([^\s)]+)/g, (m, relative) => {
						const asset = siblings.find(({ filename }) => relative.endsWith(filename));
						if (!asset || !/\.(jpe?g|png|svg|mp4)$/.test(asset.filename)) return m;

						const output = /\.(mp4)$/.test(asset.filename)
							? asset.filename
							: asset.filename.replace(/\.[^/.]+$/, '.webp');
						task(async ({ fs }) => {
							await fs.mkdir(`${ROOT}/${umbrella}`, { recursive: true });
							const payload = await asset.buffer;
							const filename = `${ROOT}/${umbrella}/${output}`;
							if (output.endsWith('.mp4')) return fs.writeFile(filename, payload);
							return void sharp(payload).webp().toFile(filename);
						});

						return `/uploads/${umbrella}/${output}`;
					});

					const branches = siblings.map(async (branch) => {
						if (branch.filename[0] !== '+') return;
						const payload = (await branch.buffer).toString('utf-8');
						const { manifest: extras, meta } = assemble(payload);
						if (!extras || extras.draft) return;
						return {
							...extras,
							branch: branch.filename.slice(1, -3),
							content: marker.render(meta.body),
						};
					});

					return {
						draft: date(metadata.date).is.before('2020-06-25'),
						slug: `${category}/${slug}`,
						category,
						...metadata,
						table: meta.table,
						composed: date(metadata.date).delta(metadata.seen.first).days,
						branches: (await Promise.all(branches)).filter((b) => b != null),
						content: marker.render(content),
					};
				};
			},
		);

		return chain(items, {
			sort: drill('date', date.sort.newest),
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
					const umbrella = paths.join('/');
					const uploaded = siblings.flatMap((asset) => {
						if (!/\.(jpe?g|png|svg|mp4)$/.test(asset.filename)) return [];
						const output = /\.(mp4)$/.test(asset.filename)
							? asset.filename
							: asset.filename.replace(/\.[^/.]+$/, '.webp');
						task(async ({ fs }) => {
							await fs.mkdir(`${ROOT}/${umbrella}`, { recursive: true });
							const payload = await asset.buffer;
							if (output.endsWith('.mp4')) {
								return fs.writeFile(`${ROOT}/${umbrella}/${asset.filename}`, payload);
							}
							const webp = sharp(payload).webp();
							return void webp.toFile(`${ROOT}/${umbrella}/${output}`);
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
