import { orchestrate } from 'aubade/conductor';
import { compare, date } from 'mauss';
import { RSS } from './builder';

const everything = await orchestrate(
	'../content/routes',
	({ breadcrumb: [file, ...breadcrumb], parent }) => {
		if (!file.endsWith('+article.md')) return;

		return async ({ assemble, buffer }) => {
			const { manifest } = assemble(buffer.toString('utf-8'));
			if (!Object.keys(manifest).length || manifest.draft) return;
			const { title, description: info } = manifest;

			switch (true) {
				case parent.includes('/curated/'): {
					const slug = `curated/${breadcrumb[0]}`;
					const description = info || `${title} curated by Alkamauss`;
					return { slug, title, description, date: manifest.date };
				}
				case parent.includes('/reviews/'): {
					if (date(manifest.date).is.before('2020-06-25')) return;
					const slug = `reviews/${breadcrumb[1]}/${breadcrumb[0]}`;
					const name = typeof title === 'string' ? title : title.en;
					const description = info || `${name} reviewed by Alkamauss`;
					return { slug, title: name, description, date: manifest.date };
				}
				case parent.includes('/posts/'): {
					const slug = `posts/${breadcrumb[0].replace('.md', '')}`;
					const description = info || 'A post by Alkamauss';
					return { slug, title, description, date: manifest.date };
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
	return new Response(RSS(items.slice(0, 42)), {
		headers: { 'Content-Type': 'application/xml' },
	});
}
