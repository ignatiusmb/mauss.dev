<script lang="ts">
	import Article from '$lib/pages/Article.svelte';
	import LinkSpread from './[branch]/LinkSpread.svelte';
	import Backdrop from './Backdrop.svelte';

	const { data } = $props();
</script>

<Article post={data.article} path={data.source} flank={data.article.flank}>
	{#snippet header()}
		<Backdrop review={data.article} />

		{#if data.article.link}
			<LinkSpread links={data.article.link} />
		{/if}
	{/snippet}

	<section data-info="warning" style:margin-bottom="1rem">
		<!-- prettier-ignore -->
		<p><em>see <a href="/help#reviews-how-i-review">how i review</a>. intentionally written without synopsis, plot, or summary. and yes, these are just my thoughts — for more context, see the <a href="/fine-print">fine print</a>.</em></p>
	</section>

	{@html data.article.content}
</Article>
