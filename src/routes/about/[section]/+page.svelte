<script lang="ts">
	export let data: import('./$types').PageData;

	import { capitalize } from 'mauss/utils';
	import { page } from '$app/stores';

	import { WeavedImage } from 'syv';
	import MetaHead from '$lib/pages/MetaHead.svelte';
	import Article from '$lib/pages/Article.svelte';
	import Link from '$lib/components/Link.svelte';
</script>

<MetaHead
	post={data}
	canonical="about/{$page.params.section}"
	title="About - {capitalize($page.params.section)}"
	description="Get to know Ignatius Bagussuputra from his About page."
/>

<Article post={data}>
	<WeavedImage src="/assets/profile/mauss.jpeg" alt="Mauss Profile" />

	<section>
		<Link href="/about/">
			<h2>About</h2>
		</Link>
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
