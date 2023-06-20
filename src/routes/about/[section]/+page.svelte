<script lang="ts">
	import WeavedImage from 'syv/core/WeavedImage.svelte';
	import Article from '$lib/pages/Article.svelte';

	export let data: import('./$types').PageData & {
		title: string; // need to extend `Compiled`
	};
</script>

<Article post={data}>
	<WeavedImage src="/assets/profile/mauss.jpg" alt="Mauss Profile" />

	<section>
		<a href="/about/">
			<h2>About</h2>
		</a>
	</section>

	{@html data.content}
</Article>

<style>
	section {
		display: grid;
		gap: 1rem;
		grid-auto-flow: row;
	}
	section :global(a) {
		border: 2px solid var(--fg-surface);
		border-radius: var(--b-radius);
	}
	section h2 {
		margin-top: 0;
		text-align: center;
	}
</style>
