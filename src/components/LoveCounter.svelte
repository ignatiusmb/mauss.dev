<script>
	import { fly } from 'svelte/transition';
	import { stores } from '@sapper/app';
	const { page: local } = stores();
	$: path = ($local.path.endsWith('/') && $local.path.slice(0, 1)) || $local.path;
	$: url = `api/page?slug=${path}`;
	const PostData = {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ love: 1 }),
	};

	import { Feather } from 'svelement/icons';
	import { page } from '../utils/stores';
	let localCounter, disabled;

	async function increment() {
		if (disabled || localStorage[path] >= 10) return;
		localStorage[path] = localCounter = ++localStorage[path];
		disabled = true;
		$page = fetch(url, PostData).then((r) => r.json());
		disabled = false;
	}

	$: if (process.browser) {
		if (!localStorage[path]) localStorage[path] = 0;
		localCounter = +localStorage[path];
	}
</script>

{#await $page}
	<div class="disabled">
		<button
			disabled
			aria-label="heart incrementer"
			class:outlined={localCounter >= 5}
			class:filled={localCounter >= 10}>
			<Feather.Heart />
		</button>
	</div>
{:then data}
	<div on:click={increment} class:disabled>
		<button
			aria-label="heart incrementer"
			class:outlined={localCounter >= 5}
			class:filled={localCounter >= 10}>
			<Feather.Heart />
		</button>
		<span in:fly={{ y: 10 }}>{(data && data.loves) || 0}</span>
	</div>
{/await}

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
