import { existsSync } from 'fs';
import { join } from 'path';
import { traverse } from 'marqua/fs';
import { chain } from 'marqua/transform';

export type Post = ReturnType<typeof get>;
export type PostIndex = ReturnType<typeof all>;

export function all() {
	return traverse(
		{ entry: 'content/sites/dev.mauss/posts' },
		({ breadcrumb: [filename], frontMatter }) => {
			if (filename.includes('draft')) return;

			const [published, slug] = filename.split('.');
			const [category] = frontMatter.tags;

			if (!frontMatter.image) {
				const imagePath = `/assets/uploads/${category.toLowerCase()}/thumbnail/${slug}`;
				const rootFolder = `${process.cwd()}/static`;
				for (const ext of ['png', 'jpg']) {
					const image = join(rootFolder, `${imagePath}.${ext}`);
					if (existsSync(image)) frontMatter.image = { en: `${imagePath}.${ext}` };
				}
			}

			return {
				slug,
				category,
				title: frontMatter.title,
				tags: frontMatter.tags,
				description: frontMatter.description,
				date: {
					published,
					updated: frontMatter.date && frontMatter.date.updated,
				},
				image: frontMatter.image,
			};
		},
		chain({ base: 'posts/' })
	);
}

export function get(slug: string) {
	return traverse(
		{ entry: 'content/sites/dev.mauss/posts' },
		({ breadcrumb: [filename], frontMatter, content }) => {
			const [published, id] = filename.split('.');
			if (filename.includes('draft') || id !== slug) return;

			return {
				slug,
				category: frontMatter.tags[0],
				title: frontMatter.title,
				tags: frontMatter.tags,
				description: frontMatter.description,
				date: {
					published,
					updated: frontMatter.date && frontMatter.date.updated,
				},
				image: frontMatter.image,
				content,
			};
		}
	)[0];
}
