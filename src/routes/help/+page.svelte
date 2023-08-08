<script lang="ts">
	import Link from '$lib/components/Link.svelte';
	import Article from '$lib/pages/Article.svelte';

	export let data;
</script>

<Article>
	<section class="info-box warning">
		<Link href="/disclaimer/" style="danger">
			<h2>READ DISCLAIMER</h2>
		</Link>
	</section>

	{@html data.article.content}
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
