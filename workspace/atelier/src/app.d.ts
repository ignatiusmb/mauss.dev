import PocketBase from 'pocketbase';

declare global {
	namespace App {
		interface Locals {
			pb: PocketBase;
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

export {};
