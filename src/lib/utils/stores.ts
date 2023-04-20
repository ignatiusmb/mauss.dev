import { readable, writable } from 'svelte/store';

export const current = writable<Promise<{ loves: number }> | null>(null);

export const mobile = readable(false, (set) => {
	const browser = typeof window !== 'undefined';
	const media = 'only screen and (max-width: 760px)';
	const update = () => set(window.matchMedia(media).matches);
	browser && window.addEventListener('resize', update);
	return () => browser && window.removeEventListener('resize', update);
});
