import type { Entries } from 'mauss/typings';
import type { Child, SieveDict } from '../types';
import { comparator, compare, regexp } from 'mauss';
import { truthy } from 'mauss/guards';

const exists = (source: string | any, query: string | any): boolean =>
	typeof source !== 'string' ? source === query : regexp(query, 'i').test(source);
const cmp = (source: string[] | string, queries: string[]): number =>
	Array.isArray(source)
		? source.filter((s) => cmp(s, queries)).length
		: queries.filter((q) => exists(source, q)).length;
const check = (source: string[] | string, queries: string[]): boolean =>
	cmp(source, queries) === queries.length;

const cleanSplit = (data: string): string[] => data.split(' ').filter(truthy);
export const sift = <T extends Child>(query: string, data: T[]): T[] => {
	return data.filter((x) =>
		typeof x.title === 'string'
			? check(x.title, cleanSplit(query))
			: Object.values(x.title).some((val) => check(val, cleanSplit(query)))
	);
};

function sortCompare<T extends Record<string, any>>(x: T, y: T): number {
	if (x.date && y.date) {
		if (typeof x.date === 'string' && typeof y.date === 'string')
			if (x.date !== y.date) return compare.date(x.date, y.date);
		const { updated: xu = '', published: xp = '' } = x.date;
		const { updated: yu = '', published: yp = '' } = y.date;
		if (xu && yu && xu !== yu) return compare.date(xu, yu);
		if (xp && yp && xp !== yp) return compare.date(xp, yp);
	}

	if (x.released && y.released && x.released !== y.released)
		return compare.date(x.released, y.released);

	if (x.author && y.author) return compare.string(x.author, y.author);

	return comparator(x, y);
}

const sortBy: Record<string, (x: any, y: any) => number> = {
	rating(x, y) {
		const xr = Number.isNaN(+x.rating) ? +!!x.rating : x.rating;
		const yr = Number.isNaN(+y.rating) ? +!!y.rating : y.rating;
		return xr === yr ? sortCompare(x, y) : yr - xr;
	},
	seen: (x, y) =>
		compare.date(
			x.seen.last || x.completed || x.seen.first,
			y.seen.last || y.completed || y.seen.first
		) || sortCompare(x, y),
	released: (x, y) => compare.date(x.released, y.released) || sortCompare(x, y),
	updated: (x, y) =>
		compare.date(x.date.updated || x.date.published, y.date.updated || y.date.published) ||
		sortCompare(x, y),
	published: (x, y) =>
		compare.date(x.date.published || x.date.updated, y.date.published || y.date.updated) ||
		sortCompare(x, y),
};

export const sort = <T extends Child>(type: string, data: T[]): T[] =>
	type in sortBy ? data.sort(sortBy[type]) : data.sort(sortCompare);

export function sieve<T extends Child & Record<string, any>>(meta: SieveDict, data: T[]): T[] {
	const identical = ['tags', 'genres'];
	const intersect = ['categories', 'verdict'];

	const { sort_by = 'updated', ...dict } = meta;
	const entries = Object.entries(dict) as Entries<Required<typeof dict>>;
	const cleaned = entries.filter(([k, v]) => !intersect.includes(k) && v.length);
	const category = entries.find(([k, v]) => k === 'categories' && v.length) || [];
	const verdict = entries.find(([k, v]) => k === 'verdict' && v.length) || [];
	const checked = entries.filter(([, v]) => v.length).length;
	const dFilter = (post: T) =>
		(verdict.length ? verdict[1].includes(post.verdict) : 1) &&
		(category.length && !!post.category ? cmp(post.category, category[1]) : 1) &&
		(cleaned.length ? cleaned.some(([k, v]) => identical.includes(k) && cmp(post[k], v)) : 1);
	return sort(sort_by, checked ? data.filter(dFilter) : data);
}
