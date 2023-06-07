<script lang="ts">
	import Article from '$lib/pages/Article.svelte';
	import TagBadge from '$lib/components/TagBadge.svelte';

	export let data: import('./$types').PageData;
</script>

<Article post={data.article} path="sites/dev.mauss/curated/{data.article.slug}.md">
	<svelte:fragment slot="header">
		{#if data.article.tags}
			<small class="tags">
				{#each data.article.tags as tag}
					<TagBadge {tag} />
				{/each}
			</small>
		{/if}
	</svelte:fragment>

	{@html data.article.content}
</Article>
