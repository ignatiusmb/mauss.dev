<script lang="ts">
	import Article from '$lib/pages/Article.svelte';

	const { data } = $props();
</script>

<Article path={data.source} post={data.article}>
	{@html data.article.content}
</Article>
