import type { Query, Schema } from './search.svelte';
import { commander, type Dispatch } from 'syv/worker';
import { sift } from './search.svelte';

let dataset: Schema[] = [];
const commands = {
	init(payload: Schema[]) {
		dataset = payload;
		return true;
	},
	search(payload: Query) {
		return sift(dataset, payload);
	},
};

export type Commands = Dispatch<typeof commands>;
addEventListener('message', commander(commands));
