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
