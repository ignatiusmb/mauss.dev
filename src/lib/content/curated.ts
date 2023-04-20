import { marker } from 'marqua/artisan';
import { compile, traverse } from 'marqua/fs';

import TexMath from 'markdown-it-texmath';
import KaTeX from 'katex';
export function init() {
	marker.use(TexMath, {
		engine: KaTeX,
		delimiters: 'dollars',
		katexOptions: {
			strict: (code: string) => (code === 'newLineInDisplayMode' ? 'ignore' : 'warn'),
		},
	});
}

export interface Curated {
	slug: string;

	title: string;
	category: string;
	tags?: string[];
	date: {
		updated: string;
		published?: string;
	};

	content?: string;
}

export function all(): Curated[] {
	const curated = traverse(
		{ entry: 'content/sites/dev.mauss/curated', depth: -1 },
		({ breadcrumb: [filename, folder], frontMatter }) => {
			if (frontMatter.draft || filename.includes('draft')) return;
			return {
				...frontMatter,
				slug: `${folder}/${filename.split('.')[0]}`,
				category: folder,
				content: '',
			};
		}
	);

	return curated as any;
}

export function get(category: string, slug: string): Curated {
	const content = compile(
		`content/sites/dev.mauss/curated/${category}/${slug}.md`,
		({ frontMatter, content }) => {
			return { ...frontMatter, slug: `${category}/${slug}`, category, content };
		}
	);

	return content as any;
}
