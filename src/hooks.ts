import type { Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ request, render }) => {
	const { path } = request;
	request.locals = {
		entry: `content/src/${path.slice(1, path.lastIndexOf('.'))}`,
	};
	return await render(request);
};
