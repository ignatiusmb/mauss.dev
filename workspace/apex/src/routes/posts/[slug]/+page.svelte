<script lang="ts">
	import Badge from '$lib/components/Badge.svelte';
	import Piece from '$lib/components/Piece.svelte';
	import { write } from '$lib/prose';

	const { data } = $props();
</script>

<Piece source={data.source} post={data.article} collection={data.collection}>
	{#snippet header()}
		<small class="tags">
			{#each data.article.tags as tag}
				<Badge {tag} />
			{/each}
		</small>
	{/snippet}

	{#if data.article.tags.includes('accessibility')}
		<section data-info="important">
			{@html write(
				"Accessibility isn't a bonus or a favor — it's a core responsibility of front-end developers. Need a tip? The dropdown below has one worth checking.",
			)}
			<details>
				<summary>What is ARIA?</summary>
				<div style:padding="0 1rem 0.5rem">
					{@html write(
						'**Accessible Rich Internet Applications (ARIA)** is a set of attributes that define ways to make web content and web applications (especially those developed with JavaScript) more accessible to people with disabilities.',
						'',
						'Many of these widgets were later incorporated into HTML5, and **developers should prefer using the correct semantic HTML element over using ARIA,** if such an element exists. For instance, native elements have built-in [keyboard accessibility](https://developer.mozilla.org/en-US/docs/Web/Accessibility/Keyboard-navigable_JavaScript_widgets), roles and states. However, if you choose to use ARIA, you are responsible for mimicking (the equivalent) browser behavior in script. \\',
						'— [MDN](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA)',
					)}
				</div>
			</details>
		</section>
	{/if}

	{@html data.article.content}
</Piece>

<style>
	small {
		display: flex;
		gap: 0.5rem;
		flex-wrap: wrap;
		justify-content: center;
	}

	section[data-info='important'] {
		margin-top: 0;
		margin-bottom: 1rem;
	}
</style>
