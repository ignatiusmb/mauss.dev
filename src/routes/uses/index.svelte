<script context="module">
	export async function load({ fetch }) {
		return { post: await fetch('uses.json').then((r) => r.json()) };
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
	<section>
		{@html post.content}
	</section>
</Article>
