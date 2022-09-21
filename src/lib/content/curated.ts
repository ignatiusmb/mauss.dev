import { compile, marker, traverse } from 'marqua';

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
	const curated = traverse(
		{ entry: 'content/src/curated', recurse: true },
		({ frontMatter, breadcrumb: [filename, folder] }) => {
			if (frontMatter.draft || filename.includes('draft')) return;
			return {
				slug: `${folder}/${filename.split('.')[0]}`,
				category: folder,
				...frontMatter,
			};
		}
	);

	return curated;
}

export function get(category: string, slug: string) {
	const content = compile(
		`content/src/curated/${category}/${slug}.md`,
		({ frontMatter, content }) => {
			return { slug: `${category}/${slug}`, ...frontMatter, category, content };
		}
	);

	return content;
}
