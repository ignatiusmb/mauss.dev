import type { Items } from '$lib/content';
import { commander, type Dispatch } from 'syv';
import { sift, type Query } from './search.svelte';

let dataset: Items['reviews/'] = [];
const commands = {
	init(payload: Items['reviews/']) {
		dataset = payload;
		return true;
	},
	search(payload: Query) {
		return sift(dataset, payload);
	},
};

export type Commands = Dispatch<typeof commands>;
addEventListener('message', commander(commands));
