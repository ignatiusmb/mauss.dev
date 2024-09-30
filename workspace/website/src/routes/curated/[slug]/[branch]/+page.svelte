<script lang="ts">
	import Badge from '$lib/components/Badge.svelte';
	import Article from '$lib/pages/Article.svelte';
	import { page } from '$app/stores';

	const { data } = $props();
</script>

<Article post={data.article} path="curated/{data.article.slug}/+{$page.params.branch}.md">
	{#snippet header()}
		{#if data.article.tags}
			<small class="tags">
				{#each data.article.tags as tag}
					<Badge {tag} />
				{/each}
			</small>
		{/if}
	{/snippet}

	{@html data.article.content}
</Article>
