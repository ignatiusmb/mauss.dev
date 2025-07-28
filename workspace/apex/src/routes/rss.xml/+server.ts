import { traverse } from 'aubade/compass';
import { compare, date } from 'mauss';
import { RSS } from './builder';

const everything = await traverse(
	'../content/routes',
	({ breadcrumb: [file, ...breadcrumb], parent }) => {
		if (!file.endsWith('+article.md')) return;

		return async ({ buffer, parse }) => {
			const { frontmatter } = parse(buffer.toString('utf-8'));
			if (!frontmatter || frontmatter.draft) return;
			const { title, description: info } = frontmatter;

			switch (true) {
				case parent.includes('/curated/'): {
					const slug = `curated/${breadcrumb[0]}`;
					const description = info || `${title} curated by Alkamauss`;
					return { slug, title, description, date: frontmatter.date };
				}
				case parent.includes('/reviews/'): {
					if (date(frontmatter.date).is.before('2020-06-25')) return;
					const slug = `reviews/${breadcrumb[1]}/${breadcrumb[0]}`;
					const name = typeof title === 'string' ? title : title.en;
					const description = info || `${name} reviewed by Alkamauss`;
					return { slug, title: name, description, date: frontmatter.date };
				}
				case parent.includes('/posts/'): {
					const slug = `posts/${breadcrumb[0].replace('.md', '')}`;
					const description = info || 'A post by Alkamauss';
					return { slug, title, description, date: frontmatter.date };
				}
				default:
					return;
			}
		};
	},
);

export const prerender = true;
export async function GET() {
	const items = everything.sort((x, y) =>
		date(x.date).is.same(y.date)
			? compare.string(x.title, y.title)
			: date.sort.newest(x.date, y.date),
	);
	return new Response(RSS(items), {
		headers: { 'Content-Type': 'application/xml' },
	});
}
