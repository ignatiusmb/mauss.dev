import type { Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ request, resolve }) => {
	const { path } = request;
	request.locals = {
		entry: `content/src/${path.slice(1, path.lastIndexOf('.'))}`,
	};
	return await resolve(request);
};
