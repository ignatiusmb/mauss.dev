<script lang="ts">
	export let post: import('$lib/types').PageMeta;
	import MetaHead from '$lib/pages/MetaHead.svelte';
	import Article from '$lib/pages/Article.svelte';
</script>

<MetaHead
	{post}
	canonical="uses"
	title="Uses"
	description="Ignatius Bagussuputra's collections, detailing his setup, applications, workstations, and other stuffs."
/>

<Article header {post}>
	{@html post.content}
</Article>
