<script lang="ts">
	import Article from '$lib/pages/Article.svelte';
	import LinkSpread from './[branch]/LinkSpread.svelte';
	import Backdrop from './Backdrop.svelte';
	import Verdict from './Verdict.svelte';

	const { data } = $props();
</script>

<Article post={data.article} path={data.source} flank={data.article.flank}>
	{#snippet header()}
		<Backdrop post={data.article} />

		{#if data.article.link}
			<LinkSpread links={data.article.link} />
		{/if}
	{/snippet}

	<Verdict verdict={data.article.verdict} size="1.25rem" />

	<section data-info="warning" style:margin="1rem 0">
		<!-- prettier-ignore -->
		<em>no summaries, no key details — by design. see <a href="/help#reviews-how-i-review">how i review</a>. and yes, these are just my thoughts — read the <a href="/fine-print">fine print</a> for more.</em>
	</section>

	{@html data.article.content}
</Article>
