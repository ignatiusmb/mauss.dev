import { redirect } from '@sveltejs/kit';
import { attempt } from 'mauss';
import { pocketbase } from '$lib/db.server';

export async function load({ request, fetch, url, cookies }) {
	const { instance } = await pocketbase({ cookie: request.headers.get('cookie') || '' });
	if (instance.authStore.isValid) redirect(303, '/');

	cookies.set('next', url.searchParams.get('next') || '/', { path: '/' });
	const { data } = await attempt(() => instance.collection('users').listAuthMethods({ fetch }));

	const oauth2 = data?.oauth2.providers.map((p) => ({ name: p.name, display: p.displayName }));

	return {
		providers: oauth2 || [],
		meta: {
			title: 'Login',
		},
	};
}

export const actions = {
	async oauth2({ fetch, request, url, cookies }) {
		const { provider } = Object.fromEntries(await request.formData());
		const { instance } = await pocketbase({ cookie: request.headers.get('cookie') || '' });
		const { oauth2 } = await instance.collection('users').listAuthMethods({ fetch });
		const o = oauth2.providers.find((p) => p.name === provider);
		if (!o) return { error: `${provider} OAuth provider not configured` };

		cookies.set('auth_state', o.state, { path: '/' });
		cookies.set('auth_verifier', o.codeVerifier, { path: '/' });
		cookies.set('auth_provider', o.name, { path: '/' });
		redirect(302, o.authURL + `${url.origin}/auth/verify`);
	},

	async purge({ request, cookies }) {
		const { instance } = await pocketbase({ cookie: request.headers.get('cookie') || '' });
		instance.authStore.clear();
		cookies.delete('amu', { path: '/' });
		redirect(303, '/auth');
	},
};
