/// <reference types="@sveltejs/kit" />

declare module '@ignatiusmb/aqua';
declare module '@ignatiusmb/aqua/lib/aqua.cbs.js';
declare module 'markdown-it-texmath';
declare module 'katex';

declare namespace App {
	interface Locals {
		entry: string;
	}

	// interface Platform {}

	// interface Session {}

	// interface Stuff {}
}