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

interface FrontMatter {
	slug: string;
	title: string;
	category: string;
	tags?: string[];
	date: string | Date;

	content?: string;
}

export function all() {
	const curated = traverse(
		{ entry: 'content/sites/dev.mauss/curated', depth: -1 },
		({ breadcrumb: [filename, folder], buffer, parse }) => {
			const { metadata } = parse(buffer.toString('utf-8'));
			if (metadata.draft || filename.includes('draft')) return;
			const specified: FrontMatter = {
				slug: `${folder}/${filename.split('.')[0]}`,
				title: metadata.title,
				category: folder,
				date: metadata.date,
			};
			return { ...metadata, ...specified };
		}
	);

	return curated;
}

export function get(category: string, slug: string) {
	const content = compile(
		`content/sites/dev.mauss/curated/${category}/${slug}.md`,
		({ buffer, parse }) => {
			const { content, metadata } = parse(buffer.toString('utf-8'));

			const specified: FrontMatter = {
				slug: `${category}/${slug}`,
				title: metadata.title,
				category,
				date: metadata.date,
			};
			return { ...metadata, ...specified, content };
		}
	);

	return content;
}
