import { existsSync } from 'fs';
import { join } from 'path';
import { traverse } from 'marqua/fs';
import { chain } from 'marqua/transform';

export type Post = ReturnType<typeof get>;
export type PostIndex = ReturnType<typeof all>;

export interface frontMatter {
	slug: string;
	title: string;
	description?: string;
	category: string;
	tags: string[];
	date: {
		published: string | Date;
		updated?: string | Date;
	};
	image?: {
		en?: string;
	};
}

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

			const specified: frontMatter = {
				slug,
				title: frontMatter.title,
				category,
				tags: frontMatter.tags,
				date: {
					published,
					updated: frontMatter.date && frontMatter.date.updated,
				},
			};

			return { ...frontMatter, ...specified };
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

			const specified: frontMatter = {
				slug,
				title: frontMatter.title,
				category: frontMatter.tags[0],
				tags: frontMatter.tags,
				date: {
					published,
					updated: frontMatter.date && frontMatter.date.updated,
				},
			};

			return { ...frontMatter, ...specified, content };
		}
	)[0];
}
