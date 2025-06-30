import type { Items } from '$content/builder';
import { commander, type Dispatch } from 'syv/worker';
import { sift, type Query } from './search.svelte';

let dataset: Items['/posts'] = [];
const commands = {
	init(payload: Items['/posts']) {
		dataset = payload;
		return true;
	},
	search(payload: Query) {
		return sift(dataset, payload);
	},
};

export type Commands = Dispatch<typeof commands>;
addEventListener('message', commander(commands));
