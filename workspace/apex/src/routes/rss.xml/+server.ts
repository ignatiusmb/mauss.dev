import { traverse } from 'aubade/compass';
import { compare, date } from 'mauss';
import { RSS, channel } from './builder';

const everything = await traverse(
	'../content/routes',
	({ breadcrumb: [file, ...rest], parent }) => {
		if (!file.endsWith('+article.md')) return;

		return async ({ buffer, parse }) => {
			const { frontmatter } = parse(buffer.toString('utf-8'));
			if (!frontmatter || frontmatter.draft) return;
			const { title, description: info } = frontmatter;

			switch (true) {
				case parent.includes('/curated/'): {
					const slug = `curated/${rest[0]}`;
					const description = `${title} curated by Alkamauss`;
					return { slug, title, description, date: frontmatter.date };
				}
				case parent.includes('/reviews/'): {
					if (date(frontmatter.date).is.before('2020-06-25')) return;
					const slug = `reviews/${rest[1]}/${rest[0]}`;
					const name = typeof title === 'string' ? title : title.en;
					const description = `${name} reviewed by Alkamauss`;
					return { slug, title: name, description, date: frontmatter.date };
				}
				case parent.includes('/posts/'): {
					const slug = `posts/${rest[0].replace('.md', '')}`;
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
	const headers = { 'Content-Type': 'application/xml' };
	return new Response(RSS(channel, items), { headers });
}
