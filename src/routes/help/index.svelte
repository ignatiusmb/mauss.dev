<script context="module">
	export const load = async ({ fetch }) => ({
		props: { post: await fetch('/help.json').then((r) => r.json()) },
	});
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
