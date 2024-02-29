import { traverse } from 'aubade/compass';
import { compare } from 'mauss';
import { RSS, channel } from './builder';

const items = traverse('content/sites/dev.mauss', { depth: -1 }).hydrate(
	({ breadcrumb, buffer, parse }) => {
		if (breadcrumb[0].includes('draft')) return;
		if (!breadcrumb[0].endsWith('.md')) return;

		const { metadata } = parse(buffer.toString('utf-8'));
		const { title, date, description: info } = metadata;

		switch (true) {
			case breadcrumb.includes('curated'): {
				const [file, dir] = breadcrumb;
				const slug = `curated/${dir}/${file.replace('.md', '')}`;
				const description = `${title} curated by Alchemauss`;
				return { slug, title, description, date };
			}
			case breadcrumb.includes('reviews'): {
				if (metadata.verdict === 'pending') return;
				const [file, category] = breadcrumb;
				const slug = `reviews/${category}/${file.replace('.md', '')}`;
				const name = typeof title === 'string' ? title : title.en;
				const description = `${name} reviewed by Alchemauss`;
				return { slug, title: name, description, date };
			}
			case breadcrumb.includes('posts'): {
				const [, dir] = breadcrumb;
				const slug = `posts/${dir.replace('.md', '')}`;
				const description = info || 'A post by Alchemauss';
				return { slug, title, description, date };
			}
			default:
				return;
		}
	},
	(items) => items.sort((x, y) => compare.date(x.date, y.date) || compare.string(x.title, y.title)),
);

export const prerender = true;
export async function GET() {
	const headers = { 'Content-Type': 'application/xml' };
	return new Response(RSS(channel, items), { headers });
}
