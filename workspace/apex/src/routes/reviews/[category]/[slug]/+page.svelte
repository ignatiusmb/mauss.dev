<script lang="ts">
	import Piece from '$lib/components/Piece.svelte';
	import LinkSpread from './[branch]/LinkSpread.svelte';
	import Backdrop from './Backdrop.svelte';
	import { write } from '$lib/prose';

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
		{@html write(
			'*[intentionally](/help#reviews-style) written without synopsis or summary. these are my thoughts; for more context, see the [fine print](/fine-print).*',
		)}
	</section>

	{@html data.article.content}
</Piece>
