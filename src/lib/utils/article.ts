import type { Child } from '$lib/types';
import { tryNumber } from 'mauss/utils';

export function countAverageRating(ratings?: string[] | number): number | undefined {
	if (typeof ratings === 'number') return ratings;
	if (!ratings || ratings.some((n) => Number.isNaN(+n))) return;
	const total = ratings.reduce((acc, cur) => +cur + acc, 0);
	return Math.round((total / ratings.length + Number.EPSILON) * 100) / 100;
}

export function contentParser<T extends Record<string, any>>(data: T, content: string): string {
	const traverse = (meta: T | string, properties: string): string => {
		for (const key of properties.split(':'))
			if (typeof meta !== 'string') meta = meta[tryNumber(key)];
		return meta as string;
	};

	return content.replace(/#{(.+)}!/g, (s, c) => (c && traverse(data, c)) || s);
}

export function fillSiblings<T extends Child>(
	articles: T[],
	base: string,
	breakpoint?: (next: T) => boolean
): T[] {
	for (let i = 0; i < articles.length; i++) {
		if (!articles[i]['siblings']) articles[i]['siblings'] = {};
		const [prev, next] = [articles[i - 1], articles[i + 1]];
		if (prev) articles[i]['siblings']['prev'] = { slug: base + prev.slug, title: prev.title };
		if (breakpoint && breakpoint(next)) return articles;
		if (next) articles[i]['siblings']['next'] = { slug: base + next.slug, title: next.title };
	}
	return articles;
}
