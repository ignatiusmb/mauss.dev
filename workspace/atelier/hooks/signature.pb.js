// @ts-nocheck

routerUse((e) => {
	const path = e.request.url.path;
	if (path.startsWith('/api/collections/') || ['/api/batch', '/api/realtime'].includes(path)) {
		if (path.includes('/_') || e.hasSuperuserAuth()) return e.next();

		const { headers } = e.requestInfo();
		const id = headers['am_client_id'];
		const ts = headers['am_timestamp'];
		const sig = headers['am_signature'];

		if (!id || !ts || !sig) throw e.unauthorizedError('No signature provided');

		const now = new DateTime().unix(); // in seconds
		const diff = Math.abs(now - Math.round(+ts / 1000));
		if (diff > 5 * 60) throw e.unauthorizedError('Signature expired');

		const expected = $security.hs256(`${id}:${ts}`, $os.getenv('AM_SECRET'));
		if (sig !== expected) throw e.unauthorizedError('Signature mismatch');
	}

	return e.next();
});
