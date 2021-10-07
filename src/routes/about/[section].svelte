<script context="module">
	export async function load({ fetch, page }) {
		const { section } = page.params;
		const articles = await fetch('/about.json').then((r) => r.json());
		if (!articles[section]) return { status: 404, error: 'Section not found' };
		return {
			props: { section, post: articles[section] },
		};
	}
</script>

<script>
	export let section, post;
	import { capitalize } from 'mauss/utils';
	import { Link, WeavedImage } from 'syv';
	import MetaHead from '$lib/pages/MetaHead.svelte';
	import Article from '$lib/pages/Article.svelte';
</script>

<MetaHead
	{post}
	canonical="about/{section}"
	title="About - {capitalize(section)}"
	description="Get to know Ignatius Bagussuputra from his About page."
/>

<Article {post}>
	<WeavedImage src="/assets/profile/mauss.jpeg" alt="Mauss Profile" />

	<section>
		<Link href="/about">
			<h2>About</h2>
		</Link>
	</section>

	{@html post.content}
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
