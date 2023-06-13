import { traverse } from 'marqua/fs';
import { chain } from 'marqua/transform';
import { compare, regexp } from 'mauss';
import { optimize } from './media';

interface FrontMatter {
	slug: string;
	title: string;
	description?: string;
	category: string;
	tags: string[];
	date: string;
	thumbnail?: string;
	image?: {
		en?: string;
	};
}

const ROOT = `${process.cwd()}/static`;

export function all() {
	const thumbnails: Record<string, string> = {};
	const contents = traverse(
		{ entry: 'content/sites/dev.mauss/posts', depth: 1 },
		({ breadcrumb: [file, slug], buffer, parse }) => {
			if (file !== '+article.md') {
				if (!/\.(jpe?g|png|svg)$/.test(file)) return;
				const name = file.replace(/\.[^/.]+$/, '.webp');
				const path = `/uploads/posts/${slug}/${name}`;
				if (file.startsWith('thumbnail.')) thumbnails[slug] = path;
				return void optimize(buffer).to(ROOT + path);
			}

			const { metadata } = parse(buffer.toString('utf-8'));
			const specified: FrontMatter = {
				slug,
				title: metadata.title,
				category: metadata.tags[0],
				tags: metadata.tags,
				date: metadata.date,
			};
			return { ...metadata, ...specified };
		},
		chain({
			base: 'posts/',
			sort({ date: xd }, { date: yd }) {
				return compare.date(xd, yd);
			},
		})
	);

	return contents.map((v) => ({ ...v, thumbnail: thumbnails[v.slug] || v.thumbnail }));
}

export function get(slug: string) {
	const memo: Array<[find: RegExp, url: string]> = [];
	const article = traverse(
		{ entry: `content/sites/dev.mauss/posts/${slug}` },
		({ breadcrumb: [file], buffer, parse }) => {
			if (file !== '+article.md') {
				if (!/\.(jpe?g|png|svg)$/.test(file)) return;
				const name = file.replace(/\.[^/.]+$/, '.webp');
				const path = `/uploads/posts/${slug}/${name}`;
				memo.push([regexp(`./${file}`, 'g'), path]);
				return void optimize(buffer).to(ROOT + path);
			}
			const { content, metadata } = parse(buffer.toString('utf-8'));
			const specified: FrontMatter = {
				slug,
				title: metadata.title,
				category: metadata.tags[0],
				tags: metadata.tags,
				date: metadata.date,
			};
			return { ...metadata, ...specified, content };
		}
	)[0];

	const content = memo.reduce(
		(content, [find, url]) => content.replace(find, url),
		article.content
	);

	return { ...article, content };
}

export type Post = ReturnType<typeof get>;
export type PostIndex = ReturnType<typeof all>;
