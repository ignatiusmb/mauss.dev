<script lang="ts">
	import Badge from '$lib/components/Badge.svelte';
	import Article from '$lib/pages/Article.svelte';

	const { data } = $props();
</script>

<Article post={data.article} path={data.source} flank={data.article.flank}>
	{#snippet header()}
		<small class="tags">
			{#each data.article.tags as tag}
				<Badge {tag} />
			{/each}
		</small>
	{/snippet}

	{#if data.article.tags.includes('accessibility')}
		<section data-info="important">
			<!-- prettier-ignore -->
			<p>Accessibility isn't a bonus or a favor — it's a core responsibility of front-end developers. Need a tip? The dropdown below has one worth checking.</p>
			<details>
				<summary>What is <abbr title="Accessible Rich Internet Applications">ARIA</abbr>?</summary>
				<div style:padding="0 1rem 0.5rem">
					<!-- prettier-ignore -->
					<p><strong>Accessible Rich Internet Applications (ARIA)</strong> is a set of attributes that define ways to make web content and web applications (especially those developed with JavaScript) more accessible to people with disabilities.</p>

					<!-- prettier-ignore -->
					<p>Many of these widgets were later incorporated into HTML5, and <strong>developers should prefer using the correct semantic HTML element over using ARIA,</strong> if such an element exists. For instance, native elements have built-in <a href="https://developer.mozilla.org/en-US/docs/Web/Accessibility/Keyboard-navigable_JavaScript_widgets" target="_blank">keyboard accessibility</a>, roles and states. However, if you choose to use ARIA, you are responsible for mimicking (the equivalent) browser behavior in script. — <a href="https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA" target="_blank">MDN</a></p>
				</div>
			</details>
		</section>
	{/if}

	{@html data.article.content}
</Article>

<style>
	small {
		display: flex;
		flex-wrap: wrap;

		& :global(:not(:last-child)) {
			margin-right: 0.5rem;
		}
	}
</style>
