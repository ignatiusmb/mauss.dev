import { Client, query as q } from 'faunadb';
const server = new Client({ secret: process.env.FAUNADB_SECRET });

module.exports = async (req, res) => {
	const query = req.query.slug;
	if (!query) return res.status(400).json({ message: 'Slug not provided' });

	const slug = (query.endsWith('/') && query.slice(0, -1)) || query;
	const match = q.Match(q.Index('pages_by_slug'), slug);
	const exists = await server.query(q.Exists(match));

	if (!exists && req.method === 'POST') {
		const initial = { data: { slug, hits: 1 } };
		server.query(q.Create(q.Collection('pages'), initial));
		return res.status(200).json({ hits: 1 });
	} else if (!exists) return res.status(200).json({ hits: 0 });

	const doc = await server.query(q.Get(match));
	delete doc.data.slug;

	if (req.method === 'POST') {
		if (!req.body) {
			const data = { hits: doc.data.hits + 1 };
			server.query(q.Update(doc.ref, { data }));
			return res.status(200).json(data);
		}

		const data = {
			hits: doc.data.hits,
			loves: req.body.love && (doc.data.loves || 0) + 1,
		};

		server.query(q.Update(doc.ref, { data }));
		return res.status(200).json(data);
	}

	return res.status(200).json(...doc.data);
};
