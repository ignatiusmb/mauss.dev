import type { Item, Query } from './search.svelte';
import { commander, type Dispatch } from 'syv/worker';
import { sift } from './search.svelte';

let dataset: Item[] = [];
const commands = {
	init(payload: Item[]) {
		dataset = payload;
		return true;
	},
	search(payload: Query) {
		return sift(dataset, payload);
	},
};

export interface Commands extends Dispatch<typeof commands> {}
addEventListener('message', commander(commands));
