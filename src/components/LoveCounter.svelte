<script>
	import { fly } from 'svelte/transition';
	import { stores } from '@sapper/app';
	const { preloading, page } = stores();
	$: path = ($page.path.endsWith('/') && $page.path.slice(0, 1)) || $page.path;
	$: counter = $preloading ? null : counter;
	$: url = `api/page?slug=${path}`;

	import { Feather } from '@ignatiusmb/elements';
	let localCounter, disabled;

	async function increment() {
		if (disabled || localStorage[path] >= 10) return;
		localStorage[path] = localCounter = ++localStorage[path];
		disabled = true;
		const { loves } = await fetch(url, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ love: 1 }),
		}).then((r) => r.json());
		counter = (loves || 0) + 1;
		disabled = false;
	}

	$: if (process.browser) {
		if (!localStorage[path]) localStorage[path] = 0;
		localCounter = +localStorage[path];
	}
</script>

<div on:click={increment} class:disabled>
	<button
		aria-label="heart incrementer"
		class:outlined={localCounter >= 5}
		class:filled={localCounter >= 10}>
		<Feather.Heart />
	</button>
	{#if counter}
		<span in:fly={{ y: 10 }}>{counter}</span>
	{:else if process.browser}
		{#await fetch(url).then((r) => r.json()) then { loves }}
			<span in:fly={{ y: 10 }}>{loves || 0}</span>
		{/await}
	{/if}
</div>

<style>
	div {
		cursor: pointer;
		z-index: 3;

		position: fixed;
		bottom: 0;
		left: 50%;

		display: grid;
		gap: 0.5em;
		grid-auto-flow: column;
		align-items: center;
		padding: 0.8em 1em;
		transform: translateX(-50%);
	}
	div.disabled > button {
		cursor: not-allowed;
		pointer-events: none;
		opacity: 0.4;
	}
	button {
		display: flex;
		padding: 0;
		border: 0;
		background: 0;
		color: var(--fg-surface);
	}
	button.outlined > :global(svg) {
		color: var(--theme-secondary);
	}
	button.filled > :global(svg) {
		fill: var(--theme-secondary);
	}

	@media only screen and (min-width: 600px) {
		div {
			left: 0;
			padding: 1em;
			transform: none;
		}
	}
</style>
