import { redirect } from '@sveltejs/kit';
import { attempt } from 'mauss';

export async function load({ fetch, locals, url, cookies }) {
	// if (locals.pb.authStore.isValid) redirect(303, '/');

	cookies.set('next', url.searchParams.get('next') || '/', { path: '/' });

	const { data } = await attempt(
		async () => await locals.pb.collection('users').listAuthMethods({ fetch }),
	);

	const oauth2 = data?.oauth2.providers.map(({ name, displayName }) => ({
		name,
		display: displayName,
	}));

	return {
		providers: oauth2 || [],
		meta: {
			title: 'Login',
		},
	};
}

export const actions = {
	async oauth2({ fetch, locals, request, url, cookies }) {
		const { provider } = Object.fromEntries(await request.formData());
		const { oauth2 } = await locals.pb.collection('users').listAuthMethods({ fetch });
		const o = oauth2.providers.find((p) => p.name === provider);
		if (!o) return { error: `${provider} OAuth provider not configured` };

		cookies.set('auth_state', o.state, { path: '/' });
		cookies.set('auth_verifier', o.codeVerifier, { path: '/' });
		cookies.set('auth_provider', o.name, { path: '/' });
		redirect(302, o.authURL + `${url.origin}/auth/verify`);
	},

	async purge({ locals, cookies }) {
		locals.pb.authStore.clear();
		cookies.delete('amu', { path: '/' });
		redirect(303, '/auth');
	},
};
