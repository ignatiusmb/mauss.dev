import { Client, query as q } from 'faunadb';
const client = new Client({ secret: process.env.FAUNADB_SECRET });

module.exports = async (req, res) => {
	const query = req.query.slug;
	if (!query) return res.status(400).json({ message: 'Slug not provided' });

	// Trim trailing slash
	const slug = (query.endsWith('/') && query.slice(0, -1)) || query;

	// Create new doc if it does not exist
	if (!(await client.query(q.Exists(q.Match(q.Index('hits_by_slug'), slug)))))
		await client.query(q.Create(q.Collection('hits'), { data: { slug, hits: 0 } }));

	// Fetch the document for-real
	const document = await client.query(q.Get(q.Match(q.Index('hits_by_slug'), slug)));

	// Increment hit if method is POST
	if (req.method === 'POST')
		await client.query(q.Update(document.ref, { data: { hits: document.data.hits + 1 } }));

	return res.status(200).json({ hits: document.data.hits });
};