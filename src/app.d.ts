/// <reference types="@sveltejs/kit" />
/// <reference types="marqua" />

declare namespace App {
	interface PageData {
		meta: {
			canonical?: string;
			title: string;
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
