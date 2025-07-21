import type { Query, Review } from './search.svelte';
import { commander, type Dispatch } from 'syv/worker';
import { sift } from './search.svelte';

let dataset: Review[] = [];
const commands = {
	init(payload: Review[]) {
		dataset = payload;
		return true;
	},
	search(payload: Query) {
		return sift(dataset, payload);
	},
};

export type Commands = Dispatch<typeof commands>;
addEventListener('message', commander(commands));
