/// <reference types="@sveltejs/kit" />

declare module 'markdown-it-texmath';
declare module 'katex';

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
