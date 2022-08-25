<script lang="ts">
	export let data: import('./$types').PageData;
	import MetaHead from '$lib/pages/MetaHead.svelte';
	import Article from '$lib/pages/Article.svelte';
</script>

<MetaHead
	post={data}
	canonical="uses"
	title="Uses"
	description="Ignatius Bagussuputra's collections, detailing his setup, applications, workstations, and other stuffs."
/>

<Article header post={data}>
	{@html data.content}
</Article>
