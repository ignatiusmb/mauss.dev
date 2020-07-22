import { compareDate, sortCompare } from './helper';

const exists = (source, query) => source.toLowerCase().includes(query.toLowerCase());
const compare = (source, queries) => queries.filter((q) => exists(source, q)).length;
const check = (source, queries) => compare(source, queries) === queries.length;

export function sieve(query, data) {
	const queries = query.split(' ').filter((q) => q);
	return data.filter((post) => {
		const { title } = post;
		if (typeof title !== 'string') {
			for (const key in title) if (check(title[key], queries)) return post;
		} else if (check(title, queries)) return post;
	});
}

export function filter(dict, data) {
	let filtered = data;
	for (const key in dict) {
		if (!dict[key].length || key === 'sort') continue;
		if (key === 'genres') filtered = data.filter((p) => compare(p.genres, dict.genres));
		if (key === 'categories') filtered = data.filter((p) => compare(p.category, dict.categories));
		if (key === 'verdict') {
			filtered = data.filter((p) => compare(p.verdict, dict.verdict));
			if (dict.verdict.includes('-2')) filtered = [...filtered, ...data.filter((p) => !p.verdict)];
		}
	}
	return sort(dict['sort'] || 'updated', filtered);
}

export function sort(type, data) {
	if (type === 'updated') return data.sort(sortCompare);
	if (type === 'rating') return data.sort((x, y) => y.rating - x.rating || sortCompare(x, y));
	if (type === 'year') return data.sort((x, y) => y.year - x.year || sortCompare(x, y));
	if (type === 'published')
		return data.sort((x, y) => {
			return compareDate(x.date_published, y.date_published) || sortCompare(x, y);
		});
}
