import { orchestrate } from 'aubade/conductor';
import { stringify } from 'aubade/manifest';
import { attempt, define } from 'mauss';

export const schema = define(({ optional, array, record, literal, string, number }) => ({
	date: string(),
	title: string(),
	romaji: optional(string()),
	alias: optional(array(string())),

	released: string(),
	tier: optional(literal('S', 'A', 'B', 'C', 'D', '?'), '?'),
	progress: optional(string()),
	completed: optional(string()),
	verdict: optional(
		literal('pending', 'not-recommended', 'contextual', 'recommended', 'must-watch'),
		'pending',
	),
	genres: array(string()),
	seen: { first: string(), last: optional(string()) },
	rating: optional(record(array(record(number())))),

	image: { en: string(), jp: optional(string()) },
	backdrop: optional(string()),
	link: optional(record(string())),
}));

await orchestrate('./routes/reviews', ({ breadcrumb: [file, slug, category], path }) => {
	if (file !== '+article.md') return;
	const validate = attempt.wrap(schema);
	return async ({ assemble, buffer, task }) => {
		const { manifest, meta } = assemble(buffer.toString('utf-8'));
		if (!manifest) throw new Error(`Manifest not found in ${file}`);
		const { data, error } = validate(manifest);
		if (data) {
			console.log(`\x1b[32m✓\x1b[0m ${category}/${slug}`);
			task(async ({ fs }) => {
				const body = meta.body.trim();
				const gutter = body.length ? '\n\n' : '';
				// @TODO: use `data` instead of `manifest`, but handle additional fields
				await fs.writeFile(path, `---\n${stringify(manifest)}\n---${gutter + body}\n`);
			});
		} else {
			const path = `\x1b[31m✘\x1b[0m ${category}/${slug}`;
			console.error(path, /** @type {any} */ (error).issues);
		}
		return [`${category}/${slug}`, !error];
	};
});
