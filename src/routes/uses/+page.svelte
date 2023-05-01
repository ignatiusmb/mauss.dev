<script lang="ts">
	import Article from '$lib/pages/Article.svelte';

	export let data: import('./$types').PageData;
</script>

<Article header post={data.article}>
	{@html data.article.content}
</Article>
