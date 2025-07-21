<script lang="ts">
	import Article from '$lib/pages/Article.svelte';

	const { data } = $props();
</script>

<Article post={data.article} path={data.source}>
	{#snippet header()}
		<!-- render the title -->
	{/snippet}

	{@html data.article.content}
</Article>
