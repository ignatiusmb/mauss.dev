import type { Request, Response } from 'express';
import type { Curated } from '$utils/types';
import { generateId } from '$utils/helper';
import { parseFile } from '$utils/parser';

export async function get(req: Request, res: Response): Promise<void> {
	const { category, slug } = req.params;
	const filepath = `content/curated/${category}/${slug}.md`;

	const file = parseFile<Curated>(filepath, ({ frontMatter, content }) => {
		const headings = Array.from(content.matchAll(/^## (.*)/gm), (v) => v[1]);
		const toc = headings.map((raw) => ({ id: generateId(raw), cleaned: raw.split(' | ')[0] }));
		return { slug: `${category}/${slug}`, ...frontMatter, category, toc, content };
	});

	res.writeHead(200, { 'Content-Type': 'application/json' });
	res.end(JSON.stringify(file));
}
