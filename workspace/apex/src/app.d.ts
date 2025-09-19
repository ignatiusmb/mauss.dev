import type { TypedPocketBase } from '$lib/db.server';

declare global {
	namespace App {
		interface Locals {
			user?: TypedPocketBase['authStore']['record'];
		}

		interface PageData {
			meta: {
				title: string;
				canonical: `/${string}`;
				description?: string;
				og?: {
					title: string;
					url?: string;
					description?: string;
					image?: string;
				};
			};
		}

		interface PageState {
			dialog?: boolean;
		}
	}
}

export {};
