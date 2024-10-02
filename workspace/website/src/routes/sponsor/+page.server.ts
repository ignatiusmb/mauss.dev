import { redirect } from '@sveltejs/kit';

export async function load() {
	// TODO: WIP page, temporary redirect
	redirect(307, 'https://github.com/sponsors/ignatiusmb');
	return {
		meta: {
			canonical: 'sponsor',
			title: 'Sponsor',
		},
	};
}
