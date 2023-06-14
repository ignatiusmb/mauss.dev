<script lang="ts">
	import Article from '$lib/pages/Article.svelte';

	export let data: import('./$types').PageData & {
		article: { title: string; date: string }; // need to extend `Compiled`
	};
</script>

<Article post={data.article}>
	<!-- to make $$slots truthy and enable header -->
	<div slot="header" style:display="contents" />

	{@html data.article.content}
</Article>
