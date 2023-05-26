<script lang="ts">
	import WeavedImage from 'syv/core/WeavedImage.svelte';
	import Link from '$lib/components/Link.svelte';
	import Article from '$lib/pages/Article.svelte';

	export let data: import('./$types').PageData & {
		article: { title: string }; // need to extend `Compiled`
	};
</script>

<Article post={data.article}>
	<WeavedImage src="/assets/profile/mauss.jpg" alt="Mauss Profile" />

	<section>
		{#each data.sections as section}
			<Link href="/about/{section}/">
				<h2>{section}</h2>
			</Link>
		{/each}
	</section>

	{@html data.article.content}
</Article>

<style>
	section {
		display: grid;
		gap: 1rem;
		grid-template-columns: repeat(3, 1fr);
		grid-auto-flow: row;
	}
	section :global(a) {
		padding: 0 0.5em;
		border: 2px solid var(--fg-surface);
		border-radius: var(--b-radius);
	}
	section h2 {
		margin-top: 0;
		text-transform: capitalize;
		text-align: center;
	}
</style>
