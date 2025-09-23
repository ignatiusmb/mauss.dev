<script lang="ts">
	import Piece from '$lib/components/Piece.svelte';
	import LinkSpread from './[branch]/LinkSpread.svelte';
	import Backdrop from './Backdrop.svelte';

	const { data } = $props();
</script>

<Piece source={data.source} post={data.article}>
	{#snippet header()}
		<Backdrop review={data.article} />

		{#if data.article.link}
			<LinkSpread links={data.article.link} />
		{/if}
	{/snippet}

	<section data-info="warning" style:margin-bottom="1rem">
		<!-- prettier-ignore -->
		<p><em><a href="/help#reviews-style">intentionally</a> written without synopsis or summary. these are my thoughts; for more context, see the <a href="/fine-print">fine print</a>.</em></p>
	</section>

	{@html data.article.content}
</Piece>
