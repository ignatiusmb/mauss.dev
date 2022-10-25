import type { Curated } from '$lib/types';
import { compile, forge, marker, traverse } from 'marqua';

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

export function all() {
	const config = forge.traverse({
		entry: 'content/sites/dev.mauss/curated',
		recurse: true,
	});

	const curated = traverse<typeof config, Curated>(
		config,
		({ frontMatter, breadcrumb: [filename, folder] }) => {
			if (frontMatter.draft || filename.includes('draft')) return;
			return {
				...frontMatter,
				slug: `${folder}/${filename.split('.')[0]}`,
				category: folder,
			};
		}
	);

	return curated;
}

export function get(category: string, slug: string) {
	const content = compile<{ entry: string }, Curated>(
		`content/sites/dev.mauss/curated/${category}/${slug}.md`,
		({ frontMatter, content }) => {
			return { slug: `${category}/${slug}`, ...frontMatter, category, content };
		}
	);

	return content;
}
