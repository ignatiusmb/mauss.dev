import type { Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
	const { pathname: path } = event.url;
	event.locals = {
		entry: path.includes('.') ? `content/src/${path.slice(1, path.lastIndexOf('.'))}` : '',
	};
	return await resolve(event);
};
