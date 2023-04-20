<script lang="ts">
	import MetaHead from '$lib/pages/MetaHead.svelte';
	import Article from '$lib/pages/Article.svelte';
	import TagBadge from '$lib/components/TagBadge.svelte';

	import '$lib/styles/katex.css';

	export let data: import('./$types').PageData;

	$: ({ slug, title, content } = data);
</script>

<MetaHead post={data} {title} canonical="curated/{slug}" />

<Article post={data} header path="src/curated/{slug}.md">
	<svelte:fragment slot="header">
		{#if data.tags}
			<small class="tags">
				{#each data.tags as tag}
					<TagBadge {tag} />
				{/each}
			</small>
		{/if}
	</svelte:fragment>

	{@html content}
</Article>
