export function sieve(query, data) {
	const queries = query.split(' ').filter((q) => q);
	return data.filter((post) => {
		const { title } = post;
		for (const q of queries) {
			if (title.toLowerCase().includes(q.toLowerCase())) continue;
			else return;
		}
		return post;
	});
}
