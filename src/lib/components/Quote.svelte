<script lang="ts">
	export let quotes: import('$lib/types').Quote[];
	import { random } from 'mauss/utils';
	import { fly } from 'svelte/transition';
	import { GradientBorder } from 'syv';

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
		<small
			on:click={() => {
				let newIndex = quoteIndex;
				do newIndex = random.int(quotes.length);
				while (newIndex === quoteIndex);
				quoteIndex = newIndex;
			}}
		>
			<GradientBorder>&mdash;{author}</GradientBorder>
		</small>
	</blockquote>
{/key}

<style>
	blockquote {
		width: calc(100% - 2em);
		position: relative;
		padding: 0.5em 1em 0.75em;
		border: 0.25em solid;
		border-left: none;
		border-image-slice: 1;
		border-image-source: linear-gradient(-45deg, var(--theme-secondary), transparent);
		margin: 1em;
		text-align: justify;
		font-size: 1.25rem;
	}
	blockquote small {
		cursor: pointer;
		user-select: none;
		position: absolute;
		right: -1.5em;
		bottom: -0.125em;
		padding: 0.5em;
		transform: translateY(50%);
		background-color: var(--bg-base);
		text-transform: uppercase;
		letter-spacing: 0.05em;
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
