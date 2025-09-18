<script lang="ts">
	import Piece from '$lib/components/Piece.svelte';

	const { data } = $props();
</script>

<Piece source={data.source} post={data.article} collection={data.collection}>
	{@html data.article.content}
</Piece>
