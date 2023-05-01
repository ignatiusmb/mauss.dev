/// <reference types="@sveltejs/kit" />

declare module 'markdown-it-texmath';
declare module 'katex';

declare namespace App {
	interface PageData {
		meta: {
			title: string;
			description: string;
			canonical?: string;
			og?: {
				title: string;
				url?: string;
				description?: string;
				// TODO
			};
		};
	}
}
