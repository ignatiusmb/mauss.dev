import { orchestrate } from 'aubade/conductor';
import { stringify } from 'aubade/manifest';
import { attempt, define } from 'mauss';

export const schema = define(({ optional, array, record, literal, string }) => ({
	date: string(),
	title: string(),
	alias: optional(array(string())),

	tier: optional(literal('S', 'A', 'B', 'C', 'D', '?'), '?'),
	released: string(),
	progress: optional(string()),
	completed: optional(string()),
	genres: array(string()),
	seen: { first: string(), last: optional(string()) },
	rating: optional(string()),

	poster: { source: literal('url', 'tmdb'), path: string() },
	backdrop: { source: literal('url', 'tmdb'), path: string() },
	link: optional(record(string())),
	soundtracks: optional(
		array({
			title: string(),
			type: optional(string()),
			artist: optional(string()),
			youtube: optional(string()),
			spotify: optional(string()),
		}),
	),
}));

/** @type {string[]} */
const trashed = [];
await orchestrate('./routes/reviews', ({ breadcrumb: [file, slug, category], path }) => {
	if (file !== '+article.md') return;
	const validate = attempt.wrap(schema);
	return async ({ assemble, buffer, task }) => {
		const { manifest, meta } = assemble(buffer.toString('utf-8'));
		if (!manifest) throw new Error(`Manifest not found in ${category}/${slug}`);
		const { data, error } = validate(manifest);
		if (data) {
			const unexpected = Object.keys(manifest).filter((key) => {
				if (key in data) return false;
				console.log(`\x1b[33m⚠\x1b[0m [${category}/${slug}] "${key}" is removed`);
				return true;
			});
			if (unexpected.length) trashed.push(`${category}/${slug}`);
			task(async ({ fs }) => {
				const body = meta.body.trim();
				const gutter = body.length ? '\n\n' : '';
				await fs.writeFile(path, `---\n${stringify(data)}\n---${gutter + body}\n`);
			});
		} else {
			const path = `\x1b[31m✘\x1b[0m ${category}/${slug}`;
			console.error(path, /** @type {any} */ (error).issues);
		}
		return [`${category}/${slug}`, !error];
	};
});

if (!trashed.length) console.log(`\x1b[32m✓\x1b[0m reviews is all good!`);
else console.log(`\x1b[33m⚠\x1b[0m ${trashed.length} review(s) were modified`);
