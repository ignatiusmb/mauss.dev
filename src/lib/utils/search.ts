import type { Entries } from 'mauss/typings';
import { compare, regexp } from 'mauss';

const IGNORED = /[(){}[\]<>"']/g;
function normalize(str: string) {
	str = str.replace(IGNORED, '');
	return str.toLowerCase();
}

const EXP = Object.create(null) as { [k: string]: RegExp };
function tokenizer(query: string) {
	const tokens = [];
	for (const q of normalize(query).split(' ')) {
		if (q === '') continue;
		if (!EXP[q]) EXP[q] = regexp(q);
		tokens.push({ q, rgx: EXP[q] });
	}
	return tokens;
}

function record(set: Set<string>, entries: string[]) {
	entries.forEach((entry) => set.add(entry));
}

function sifter(query = '') {
	const tokens = tokenizer(query);

	return <Data, Transformer extends (i: Data) => Set<string>>(
		data: Array<string | Data>,
		transform?: Transformer,
	) => {
		if (!tokens.length) return data;

		const sifted = [];
		for (let i = 0, t = 0; i < data.length; i += 1, t = 0) {
			const refs = transform ? transform(data[i] as Data) : new Set((data[i] as string).split(' '));

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
	};
}

type Metadata = { title: string | Record<string, any>; description?: string };

export const sift = <T extends Metadata>(query = '', data: T[]) =>
	sifter(query)(data, (item) => {
		const { title, description } = item;
		const refs = new Set(
			(typeof title === 'string' && normalize(title).split(' ')) ||
				Object.values(title).flatMap((t) => normalize(t).split(' ')),
		);
		if (description) record(refs, normalize(description).split(' '));
		return refs;
	});

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

	return compare.inspect(x, y);
}

const sortBy: Record<string, (x: any, y: any) => number> = {
	rating(x, y) {
		const xr = Number.isNaN(+x.rating) ? +!!x.rating : x.rating;
		const yr = Number.isNaN(+y.rating) ? +!!y.rating : y.rating;
		return xr === yr ? sortCompare(x, y) : yr - xr;
	},
	seen(x, y) {
		const xd = x.seen.last || x.completed || x.seen.first;
		const yd = y.seen.last || y.completed || y.seen.first;
		return compare.date(xd, yd) || sortCompare(x, y);
	},
	released(x, y) {
		return compare.date(x.released, y.released) || sortCompare(x, y);
	},
	updated(x, y) {
		const xd = x.date.updated || x.date.published;
		const yd = y.date.updated || y.date.published;
		return compare.date(xd, yd) || sortCompare(x, y);
	},
	published(x, y) {
		const xd = x.date.published || x.date.updated;
		const yd = y.date.published || y.date.updated;
		return compare.date(xd, yd) || sortCompare(x, y);
	},
};

export const sort = <T extends Record<string, any>>(type: string, data: T[]): T[] =>
	type in sortBy ? data.sort(sortBy[type]) : data.sort(sortCompare);

interface SieveDict {
	categories?: string[];
	genres?: string[];
	tags?: string[];
	verdict?: string[];
	sort_by: string;
}

export function sieve<T extends Record<string, any>>(meta: SieveDict, data: T[]): T[] {
	const identical = ['tags', 'genres'];
	const intersect = ['categories', 'verdict'];

	const { sort_by = 'updated', ...dict } = meta;
	const entries = Object.entries(dict) as Entries<Required<typeof dict>>;
	const cleaned = entries.filter(([k, v]) => !intersect.includes(k) && v.length);
	const category = entries.find(([k, v]) => k === 'categories' && v.length) || [];
	const verdict = entries.find(([k, v]) => k === 'verdict' && v.length) || [];
	const checked = entries.filter(([, v]) => v.length).length;

	const cross = (post: T, [key, val]: (typeof cleaned)[number]) => {
		const method = identical.includes(key) ? 'every' : 'some';
		if (Array.isArray(post[key])) return val[method]((v) => post[key].includes(v));

		const fallback = sifter(post[key])(val).length;
		return method === 'some' ? fallback : fallback === val.length;
	};
	const dFilter = (post: T) =>
		(verdict.length ? verdict[1].includes(post.verdict) : 1) &&
		(category.length ? sifter(post.category)(category[1]).length : 1) &&
		(cleaned.length ? cleaned.some((item) => cross(post, item)) : 1);
	return sort(sort_by, checked ? data.filter(dFilter) : data);
}
