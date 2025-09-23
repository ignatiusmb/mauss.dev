import { redirect } from '@sveltejs/kit';
import { attempt } from 'mauss';
import { pocketbase } from '$lib/server/db';

export async function GET({ url, cookies }) {
	const expected = {
		state: cookies.get('auth_state') || '',
		verifier: cookies.get('auth_verifier') || '',
		provider: cookies.get('auth_provider') || '',
	};
	if (!expected.provider || !expected.verifier) {
		redirect(303, '/auth');
	}

	const provider = {
		state: url.searchParams.get('state') || '',
		code: url.searchParams.get('code') || '',
	};
	if (!provider.code || provider.state !== expected.state) {
		redirect(303, '/auth');
	}

	const { instance } = await pocketbase();
	const { error } = await attempt(async () => {
		const users = instance.collection('users');
		return await users.authWithOAuth2Code(
			expected.provider,
			provider.code,
			expected.verifier,
			`${url.origin}/auth/verify`,
		);
	});
	if (error) redirect(303, '/auth');

	const next = cookies.get('next');
	redirect(303, next || '/');
}
