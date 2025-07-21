<script lang="ts">
	import Article from '$lib/pages/Article.svelte';

	const { data } = $props();
</script>

<Article post={data.article} path={data.source}>
	{@html data.article.content}
</Article>
