<script lang="ts">
	export let data: import('./$types').PageData;

	import { capitalize } from 'mauss/utils';
	import { Link, WeavedImage } from 'syv';
	import MetaHead from '$lib/pages/MetaHead.svelte';
	import Article from '$lib/pages/Article.svelte';
</script>

<MetaHead
	post={data.article}
	canonical="about"
	title="About"
	description="Get to know Ignatius Bagussuputra from his About page."
/>

<Article post={data.article}>
	<WeavedImage src="/assets/profile/mauss.jpeg" alt="Mauss Profile" />

	<section>
		{#each data.sections as section}
			<Link href="/about/{section}/">
				<h2>{capitalize(section)}</h2>
			</Link>
		{/each}
	</section>

	{@html data.article.content}
</Article>

<style>
	section:first-of-type {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		grid-auto-flow: row;
		border: 0.1em solid var(--fg-surface);
		border-radius: var(--b-radius);
	}
	section:first-of-type :global(a) {
		padding: 0 0.5em;
		border: 0.1em solid var(--fg-surface);
	}
	section:first-of-type h2 {
		margin-top: 0;
		text-align: center;
	}
</style>
