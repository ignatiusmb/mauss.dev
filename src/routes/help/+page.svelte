<script lang="ts">
	export let data: import('./$types').PageData;

	import MetaHead from '$lib/pages/MetaHead.svelte';
	import Article from '$lib/pages/Article.svelte';
	import Link from '$lib/components/Link.svelte';
</script>

<MetaHead canonical="help" title="Help" description="Alchemauss help page." />

<Article>
	<section class="info-box warning">
		<Link href="/disclaimer/" style="danger">
			<h2>READ DISCLAIMER</h2>
		</Link>
	</section>

	{@html data.content}
</Article>

<style>
	section {
		text-align: center;
	}
	section h2 {
		margin-top: 0;
		color: inherit;
	}
</style>
