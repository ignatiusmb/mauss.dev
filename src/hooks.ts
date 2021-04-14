import type { GetContext } from '@sveltejs/kit';

export const getContext: GetContext = async ({ path }) => {
	return {
		entry: `content/src/${path.slice(1, path.lastIndexOf('.'))}`,
	};
};
