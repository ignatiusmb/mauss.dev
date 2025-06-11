import type PocketBase, { RecordService } from 'pocketbase';

declare global {
	namespace App {
		interface Locals {
			pb: TypedPocketBase;
			user?: TypedPocketBase['authStore']['record'];
		}
		interface PageData {
			meta: {
				title: string;
				canonical?: string;
				description?: string;
				og?: {
					title: string;
					url?: string;
					description?: string;
					// TODO
				};
			};
		}
	}
}

interface TypedPocketBase extends PocketBase {
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
		author?: RecordIdString;
		ancestry?: string;
		body?: string;
		/** ISODateString */
		created?: string;
		/** ISODateString */
		updated?: string;
	}>;
}

export {};
