import type { Curated, Post, Review } from './types';
import { readable, writable } from 'svelte/store';

export const page = writable<Promise<{ loves: number }> | null>(null);
export const cSlice = writable<Curated[]>([]);
export const pSlice = writable<Post[]>([]);
export const rSlice = writable<Review[]>([]);

export const mobile = readable(false, (set) => {
	const browser = typeof window !== 'undefined';
	set(browser && window.matchMedia('only screen and (max-width: 760px)').matches);
});
