<script lang="ts">
	import Badge from '$lib/components/Badge.svelte';
	import Article from '$lib/pages/Article.svelte';

	export let data;
</script>

<Article post={data.article} path="sites/dev.mauss/curated/{data.article.slug}.md">
	<svelte:fragment slot="header">
		{#if data.article.tags}
			<small class="tags">
				{#each data.article.tags as tag}
					<Badge {tag} />
				{/each}
			</small>
		{/if}
	</svelte:fragment>

	{@html data.article.content}
</Article>
