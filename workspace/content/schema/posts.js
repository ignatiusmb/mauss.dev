import { orchestrate } from 'aubade/conductor';
import { stringify } from 'aubade/manifest';
import { attempt, define } from 'mauss';

export const schema = define(({ optional, array, literal, string }) => ({
	updated: optional(string()),
	date: string(),
	theme: literal(
		'reflection', // personal thoughts or reflections on a topic
		'essay', // opinionated long-form exploration of a subject
		'guide', // practical instructions or how-to
		'moment', // brief observation or thought, short or small insight
		'archive', // republishing or preserving content for reference
	),
	title: string(),
	series: optional({
		title: string(),
		chapter: optional(string()),
	}),
	description: string(),
	tags: array(string()),
	thumbnail: optional(string()),
	image: optional(string()),
}));

/** @type {string[]} */
const trashed = [];
await orchestrate('./routes/posts', ({ breadcrumb: [file, slug], path }) => {
	if (file !== '+article.md') return;
	const validate = attempt.wrap(schema);
	return async ({ assemble, buffer, task }) => {
		const { manifest, meta } = assemble(buffer.toString('utf-8'));
		if (!manifest) throw new Error(`Manifest not found in ${slug}`);
		const { data, error } = validate(manifest);
		if (data) {
			const unexpected = Object.keys(manifest).filter((key) => {
				if (key in data) return false;
				console.log(`\x1b[33m⚠\x1b[0m [${slug}] "${key}" is removed`);
				return true;
			});
			if (unexpected.length) trashed.push(slug);
			task(async ({ fs }) => {
				const body = meta.body.trim();
				const gutter = body.length ? '\n\n' : '';
				await fs.writeFile(path, `---\n${stringify(data)}\n---${gutter + body}\n`);
			});
		} else {
			const path = `\x1b[31m✘\x1b[0m ${slug}`;
			console.error(path, /** @type {any} */ (error).issues);
		}
		return [slug, !error];
	};
});

if (!trashed.length) console.log(`\x1b[32m✓\x1b[0m posts is all good!`);
else console.log(`\x1b[33m⚠\x1b[0m ${trashed.length} post(s) were modified`);
