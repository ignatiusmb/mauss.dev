import type { RecordService } from 'pocketbase';
import { createHmac, randomUUID } from 'crypto';
import { attempt } from 'mauss';
import PocketBase from 'pocketbase';
import { dev } from '$app/environment';
import { getRequestEvent } from '$app/server';
import { AM_SECRET, PB_INSTANCE } from '$env/static/private';

interface Context {
	cookie?: string;
}
export async function pocketbase({ cookie = '' }: Context = {}) {
	const { request } = getRequestEvent();
	const pb = new PocketBase(PB_INSTANCE);
	pb.beforeSend = function (url, options) {
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

	pb.authStore.loadFromCookie(request.headers.get('cookie') || cookie, 'amu');

	const { data, error } = await attempt(async () => {
		if (!pb.authStore.isValid) return;
		await pb.collection('users').authRefresh();
		return pb.authStore.record;
	});
	if (error) pb.authStore.clear();

	return {
		cookie: pb.authStore.exportToCookie({ sameSite: 'lax', secure: !dev }, 'amu'),
		instance: pb as TypedPocketBase,
		user: data,
	};
}

export interface TypedPocketBase extends PocketBase {
	collection(idOrName: string): RecordService; // fallback type
	collection(idOrName: 'users'): RecordService<{
		id: string;
		password: string;
		tokenKey: string;
		email: string;
		emailVisibility?: boolean;
		verified?: boolean;
		name?: string;
		avatar?: string;
		/** ISODateString */
		created?: string;
		/** ISODateString */
		updated?: string;
	}>;
	collection(idOrName: 'comments'): RecordService<{
		id: string;
		slug: string;
		author?: string;
		ancestry?: string;
		body?: string;
		/** ISODateString */
		created?: string;
		/** ISODateString */
		updated?: string;
	}>;
}
