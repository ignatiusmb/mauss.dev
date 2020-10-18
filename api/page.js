import { Client, query as q } from 'faunadb';
const server = new Client({ secret: process.env.FAUNADB_SECRET });

module.exports = async (req, res) => {
	const query = req.query.slug;
	if (!query) return res.status(400).json({ message: 'Slug not provided' });

	// Trim trailing slash
	const slug = (query.endsWith('/') && query.slice(0, -1)) || query;

	const match = q.Match(q.Index('pages_by_slug'), slug);

	// Create new doc if it does not exist
	const initial = { data: { slug, hits: 0 } };
	if (!(await server.query(q.Exists(match))))
		await server.query(q.Create(q.Collection('pages'), initial));

	// Fetch the document for-real
	const { ref, data } = await server.query(q.Get(match));

	// Update document only if method is POST
	if (req.method === 'POST') {
		// Increment hit if it does not have a body
		if (!req.body) await server.query(q.Update(ref, { data: { hits: data.hits + 1 } }));

		const { love } = req.body || {};
		if (love) await server.query(q.Update(ref, { data: { loves: data.loves + 1 || 1 } }));
	}

	return res.status(200).json({ hits: data.hits, loves: data.loves });
};
