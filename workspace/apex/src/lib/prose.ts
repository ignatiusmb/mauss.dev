import type { IntersectUnion, Overwrite } from 'mauss/typings';
import type { Items } from '$content/builder';
import { engrave } from 'aubade/artisan';

type Base = Items['/curated' | '/posts' | '/reviews'][number];
type Article = Overwrite<IntersectUnion<Base>, { branches?: string[] }>;

export function phrase(theme: Article['theme']) {
	switch (theme) {
		case 'essay':
			return 'an essay';
		case 'archive':
			return 'archived';
		default:
			return `a ${theme}`;
	}
}

export function write(...texts: string[]): string {
	return engrave(texts.join('\n')).html();
}
