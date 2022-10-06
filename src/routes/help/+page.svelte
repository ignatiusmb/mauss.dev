<script lang="ts">
	export let data: import('./$types').PageData;

	import MetaHead from '$lib/pages/MetaHead.svelte';
	import Article from '$lib/pages/Article.svelte';
	import Disclaimer from '$lib/components/Disclaimer.svelte';
</script>

<MetaHead canonical="help" title="Help" description="Alchemauss help page." />

<Article>
	<Disclaimer link />

	{@html data.content}
</Article>
