<script lang="ts">
	import GradientBorder from 'syv/core/GradientBorder.svelte';

	import { random } from 'mauss';
	import { fly } from 'svelte/transition';

	export let quotes: any;

	let quoteIndex = random.int(quotes.length);
	$: newQuote = quotes[quoteIndex];
	$: ({ author, quote, from } = newQuote);
</script>

{#key quoteIndex}
	<blockquote in:fly={{ y: -10 }}>
		<p>{quote}</p>
		{#if from}
			<p class="from">{from}</p>
		{/if}
		<button
			on:click={() => {
				let newIndex = quoteIndex;
				do newIndex = random.int(quotes.length);
				while (newIndex === quoteIndex);
				quoteIndex = newIndex;
			}}
		>
			<GradientBorder>&mdash;{author}</GradientBorder>
		</button>
	</blockquote>
{/key}

<style>
	blockquote {
		width: calc(100% - 2rem);
		position: relative;
		padding: 0.5rem 1rem 0.75rem;
		border: 0.25rem solid;
		border-left: none;
		border-image-slice: 1;
		border-image-source: linear-gradient(-45deg, var(--theme-secondary), transparent);
		margin: 1rem;
		text-align: justify;
		font-size: 1.25rem;
	}
	blockquote button {
		user-select: none;
		position: absolute;
		right: -1.5rem;
		bottom: -0.125rem;
		padding: 0.5rem;
		transform: translateY(50%);
		background-color: var(--bg-base);
		text-transform: uppercase;
		letter-spacing: 0.05rem;
		line-height: 1.5rem;
		font-size: inherit;
		font-weight: 500;
	}
	blockquote > :global(.from) {
		text-align: right;
	}
	blockquote > :global(:first-child) {
		margin: 0;
	}
</style>
