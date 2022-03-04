import type { Entries } from 'mauss/typings';
import type { Child, SieveDict } from '../types';
import { comparator, compare, regexp } from 'mauss';

const exists = (source: string | any, query: string | any): boolean =>
	typeof source !== 'string' ? source === query : regexp(query, 'i').test(source);
const cmp = (source: string[] | string, queries: string[]): number =>
	Array.isArray(source)
		? source.filter((s) => cmp(s, queries)).length
		: queries.filter((q) => exists(source, q)).length;

const IGNORED = /[(){}[\]<>"']/g;
function normalize(str: string) {
	str = str.replace(IGNORED, '');
	return str.toLowerCase();
}

const EXP = Object.create(null) as { [k: string]: RegExp };
function tokenizer(query: string) {
	const tokens = [];
	for (const q of normalize(query).split(' ')) {
		if (!EXP[q]) EXP[q] = regexp(q);
		tokens.push({ q, rgx: EXP[q] });
	}
	return tokens;
}

function record(set: Set<string>, entries: string[]) {
	entries.forEach((entry) => set.add(entry));
}

export function sift<T extends Child>(query: string, data: T[]): T[] {
	const tokens = tokenizer(query);

	const sifted = [];
	for (let i = 0, t = 0; i < data.length; i++, t = 0) {
		const { title, description } = data[i];
		const refs = new Set(
			(typeof title === 'string' && normalize(title).split(' ')) ||
				Object.values(title).flatMap((t) => normalize(t).split(' '))
		);
		if (description) record(refs, normalize(description).split(' '));

		let valid = true;
		while (valid && t < tokens.length) {
			const { q, rgx } = tokens[t++];
			let matched = false;
			for (const ref of refs.values()) {
				if (q.length > ref.length) continue;
				if (rgx.test(ref)) matched = true;
				if (matched) break;
			}
			if (!matched) valid = false;
		}
		if (!valid) continue;
		sifted.push(data[i]);
	}

	return sifted;
}

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
