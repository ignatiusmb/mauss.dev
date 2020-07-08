<script>
	export let to = '';
	export let hover = false;

	import { stores } from '@sapper/app';
	const { page } = stores();

	$: segment = $page.path.split('/')[1];
	$: isCurrent = (to) => (segment === to ? 'page' : undefined);
</script>

<a rel="prefetch" aria-current={isCurrent(to)} href="/{to}" class:hover>
	<slot />
</a>

<style>
	a[aria-current]::after {
		width: 100%;
		background-color: var(--mauss-primary);
	}

	a {
		position: relative;
		padding: 0.1em 0.2em;
		color: var(--fg-color);
		text-transform: capitalize;
	}
	.hover::after {
		content: '';
		position: absolute;
		right: 0;
		bottom: 0;
		width: 0;
		height: 0.25em;
		border-radius: 0.8em;
		background-color: var(--mauss-secondary);
		transition: width var(--transition-duration) ease;
		transform: translateY(100%);
	}
	.hover:hover::after,
	.hover:focus::after {
		left: 0;
		right: auto;
		width: 100%;
	}
</style>
