<script lang="ts">
	export let data: import('./$types').PageData;

	import { capitalize } from 'mauss/utils';
	import { page } from '$app/stores';

	import { Link, WeavedImage } from 'syv';
	import MetaHead from '$lib/pages/MetaHead.svelte';
	import Article from '$lib/pages/Article.svelte';
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
	section:first-of-type {
		border: 0.2em solid var(--fg-surface);
		border-radius: var(--b-radius);
	}
	section:first-of-type h2 {
		margin-top: 0;
		text-align: center;
	}
</style>
