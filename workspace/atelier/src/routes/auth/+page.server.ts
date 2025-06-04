import { redirect } from '@sveltejs/kit';
import { attempt } from 'mauss';

export async function load({ fetch, locals, url, cookies }) {
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
	async github({ fetch, locals, url, cookies }) {
		const { oauth2 } = await locals.pb.collection('users').listAuthMethods({ fetch });
		const github = oauth2.providers.find((p) => p.name === 'github');
		if (!github) return { error: 'GitHub OAuth provider not configured' };

		cookies.set('auth_state', github.state, { path: '/' });
		cookies.set('auth_verifier', github.codeVerifier, { path: '/' });
		cookies.set('auth_provider', github.name, { path: '/' });
		redirect(302, github.authURL + `${url.origin}/auth/verify`);
	},
};
