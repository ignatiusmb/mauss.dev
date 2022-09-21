import type { Post } from '$lib/types';
import { existsSync } from 'fs';
import { join } from 'path';
import { traverse } from 'marqua';
import { fillSiblings } from '$lib/utils/article';

export function all() {
	const posts = traverse<{ entry: string }, Post>(
		'content/src/posts',
		({ frontMatter, breadcrumb: [filename] }) => {
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

			const updated = frontMatter.date && frontMatter.date.updated;
			return { slug, ...frontMatter, category, date: { published, updated } };
		}
	);

	return fillSiblings(posts.reverse(), 'posts/');
}

export function get(slug: string) {
	const [body] = traverse<{ entry: string }, Post>(
		'content/src/posts',
		({ frontMatter, content, breadcrumb: [filename] }) => {
			const [published, filename_slug] = filename.split('.');
			if (filename.includes('draft') || filename_slug !== slug) return;
			const date = { published, updated: frontMatter.date && frontMatter.date.updated };
			return { slug, ...frontMatter, category: frontMatter.tags[0], date, content };
		}
	);

	return body;
}
