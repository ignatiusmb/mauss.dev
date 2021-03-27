<script context="module">
	export async function load({ fetch, page: { path } }) {
		const post = await fetch(`${path}.json`).then((r) => r.json());
		return { props: { post } };
	}
</script>

<script>
	export let post;
	import MetaHead from '$lib/pages/MetaHead.svelte';
	import Article from '$lib/pages/Article.svelte';
	import Disclaimer from '$lib/components/Disclaimer.svelte';
</script>

<MetaHead canonical="help" title="Help" description="DevMauss help page." />

<Article>
	<Disclaimer link />

	{@html post.content}
</Article>
