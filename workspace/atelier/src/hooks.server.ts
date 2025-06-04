import { dev } from '$app/environment';
import { AM_SECRET, PB_INSTANCE } from '$env/static/private';
import { createHmac, randomUUID } from 'crypto';
import { attempt } from 'mauss';
import PocketBase from 'pocketbase';

export async function handle({ event, resolve }) {
	event.locals.pb = new PocketBase(PB_INSTANCE);
	event.locals.pb.beforeSend = function (url, options) {
		const uuid = randomUUID();
		const timestamp = `${Date.now()}`;
		const hmac = createHmac('sha256', AM_SECRET);
		options.headers = Object.assign({}, options.headers, {
			'AM-Client-ID': uuid,
			'AM-Timestamp': timestamp,
			'AM-Signature': hmac.update(`${uuid}:${timestamp}`).digest('hex'),
		});
		return { url, options };
	};

	const pb = event.locals.pb;
	pb.authStore.loadFromCookie(event.request.headers.get('cookie') || '', 'amu');

	const { error } = await attempt(async () => {
		if (!pb.authStore.isValid) return;
		await pb.collection('users').authRefresh();
		event.locals.user = pb.authStore.record;
	});
	if (error) pb.authStore.clear();

	const response = await resolve(event);
	const exported = pb.authStore.exportToCookie({ sameSite: 'lax', secure: !dev }, 'amu');
	response.headers.append('set-cookie', exported);
	return response;
}
