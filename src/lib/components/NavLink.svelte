<script>
	export let to = '';
	export let path = '';
	export let hover = false;

	$: isCurrent = (p) => (path === p ? 'page' : undefined);
</script>

<a sveltekit:prefetch aria-current={isCurrent(to)} href="/{to}" class:hover>
	<slot />
</a>

<style>
	a[aria-current]::after {
		width: 100%;
		background-color: var(--theme-primary);
	}

	a {
		position: relative;
		padding: 0.1em 0.2em;
		color: var(--fg-surface);
		text-transform: capitalize;
	}
	.hover::after {
		content: '';
		position: absolute;
		right: 0;
		bottom: 0;
		width: 0;
		height: 0.25em;
		border-radius: 0.5em;
		background-color: var(--theme-secondary);
		transition: width var(--t-duration) ease;
		transform: translateY(100%);
	}
	.hover:hover::after,
	.hover:focus::after {
		left: 0;
		right: auto;
		width: 100%;
	}
</style>
