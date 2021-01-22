import type { Curated, Post, Review } from './types';
import { writable } from 'svelte/store';

export const page = writable<unknown>(null);
export const cSlice = writable<Curated[]>([]);
export const pSlice = writable<Post[]>([]);
export const rSlice = writable<Review[]>([]);
