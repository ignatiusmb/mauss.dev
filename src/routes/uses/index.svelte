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
</script>

<MetaHead
	{post}
	canonical="uses"
	title="Uses"
	description="Ignatius Bagussuputra's collections, detailing his setup, applications, workstations,
	and other stuffs." />

<Article header {post}>
	{@html post.content}
</Article>
