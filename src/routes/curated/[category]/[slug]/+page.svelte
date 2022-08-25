<script context="module" lang="ts">
	export const load: import('@sveltejs/kit').Load = async ({ fetch, params }) => {
		const { category, slug } = params;
		const res = await fetch(`/curated/${category}/${slug}.json`);
		if (!res.ok) return { status: 404, error: 'Curated post not found' };
		return { props: { post: await res.json() } };
	};
</script>

<script lang="ts">
	export let post: import('$lib/types').Curated;

	import MetaHead from '$lib/pages/MetaHead.svelte';
	import Article from '$lib/pages/Article.svelte';
	import TagBadge from '$lib/components/TagBadge.svelte';
	import '$lib/styles/katex.css';

	$: ({ slug, title, content } = post);
</script>

<MetaHead {post} {title} canonical="curated/{slug}" />

<Article {post} header path="src/curated/{slug}.md">
	<svelte:fragment slot="header">
		{#if post.tags}
			<small class="tags">
				{#each post.tags as tag}
					<TagBadge {tag} />
				{/each}
			</small>
		{/if}
	</svelte:fragment>

	{@html content}
</Article>
