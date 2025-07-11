import { traverse } from 'aubade/compass';
import { chain } from 'aubade/transform';
// import { exec } from 'node:child_process';
import { date, define, drill, sum } from 'mauss';
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
		const schema = define(({ optional, string }) => ({
			date: string(),
			title: string(),
			tags: optional(string()),
		}));

		const items = await traverse('../content/routes/curated', ({ breadcrumb: [file, slug] }) => {
			if (file !== '+article.md') return;

			return async ({ buffer, marker, parse, siblings, task }) => {
				const { body, frontmatter } = parse(buffer.toString('utf-8'));
				if (!frontmatter || frontmatter.draft) return;
				const metadata = schema(frontmatter);

				const umbrella = `curated/${slug}`;
				const content = body.replace(/\.\/([^\s)]+)/g, (m, relative) => {
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
					const { body, frontmatter: extras } = parse((await branch.buffer).toString('utf-8'));
					if (!extras || extras.draft) return;
					return {
						slug,
						...frontmatter,
						...metadata,
						...extras,
						branch: branch.filename.slice(1, -3),
						content: marker.render(body),
					};
				});

				return {
					slug,
					...frontmatter,
					...metadata,
					content: marker.render(content),
					branches: (await Promise.all(branches)).filter((b) => b != null),
				};
			};
		});

		return items.sort(drill('date', date.sort.newest));
	},

	async '/posts'() {
		const schema = define(({ optional, string, array }) => ({
			date: string(),
			title: string(),
			description: optional(string()),
			tags: array(string()),
			thumbnail: optional(string()),
			image: optional(string()),
		}));

		const items = await traverse('../content/routes/posts', ({ breadcrumb: [file, slug] }) => {
			if (file !== '+article.md') return;

			return async ({ buffer, marker, parse, siblings, task }) => {
				const { body, frontmatter } = parse(buffer.toString('utf-8'));
				if (!frontmatter || frontmatter.draft) return;
				const metadata = schema(frontmatter);

				const umbrella = `posts/${slug}`;
				const content = body.replace(/\.\/([^\s)]+)/g, (m, relative) => {
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
					...frontmatter,
					...metadata,
					content: marker.render(content),
				};
			};
		});

		return chain(items, {
			sort: drill('date', date.sort.newest),
			transform: ({ slug, title }) => ({ slug: `/posts/${slug}`, title }),
		});
	},

	async '/quotes'() {
		const items = await traverse('../content/routes/quotes', ({ breadcrumb: [file] }) => {
			return async ({ buffer, parse }) => {
				const content: Array<{ author: string; quote: string; from: string }> = [];
				const author = file.slice(0, -3).replace(/-/g, ' ');
				const { body } = parse(buffer.toString('utf-8'));
				for (const line of body.split(/\r?\n/).filter(exists)) {
					const [quote, from] = line.split('#!/');
					content.push({ author, quote, from });
				}
				return content;
			};
		});
		return items.flat();
	},

	async '/reviews'() {
		const schema = define(({ optional, array, record, literal, string, number }) => ({
			date: string(),
			title: string(),
			romaji: optional(string()),
			alias: optional(array(string())),

			released: string(),
			tier: optional(literal('S', 'A', 'B', 'C', 'D', '?'), '?'),
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
			verdict: optional(
				literal('pending', 'not-recommended', 'contextual', 'recommended', 'must-watch'),
				'pending',
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

			image: { en: string(), jp: optional(string()) },
			backdrop: optional(string()),
			link: optional(record(string())),
		}));

		const items = await traverse(
			'../content/routes/reviews',
			({ breadcrumb: [file, slug, category] }) => {
				if (file !== '+article.md') return;

				return async ({ buffer, marker, parse, siblings, task }) => {
					const { body, frontmatter } = parse(buffer.toString('utf-8'));
					if (!frontmatter || frontmatter.draft) return;
					const metadata = schema(frontmatter);

					const umbrella = `reviews/${category}/${slug}`;
					const content = body.replace(/\.\/([^\s)]+)/g, (m, relative) => {
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
						const { body, frontmatter: extras } = parse(payload);
						if (!extras || extras.draft) return;
						return {
							slug: `${category}/${slug}`,
							category,
							...frontmatter,
							...metadata,
							...extras,
							branch: branch.filename.slice(1, -3),
							content: marker.render(body),
						};
					});

					return {
						draft: date(metadata.date).is.before('2020-06-25'),
						slug: `${category}/${slug}`,
						category,
						...frontmatter,
						...metadata,
						composed: date(metadata.date).delta(metadata.seen.first).days,
						content: marker.render(content),
						branches: (await Promise.all(branches)).filter((b) => b != null),
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
		return await traverse<[umbrella: string, files: string[]]>(
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
} as const;

export type Items = {
	[key in keyof typeof ROUTES]: Awaited<ReturnType<(typeof ROUTES)[key]>>;
};
