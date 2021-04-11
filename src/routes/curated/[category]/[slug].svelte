<script context="module">
	export async function load({ fetch, page: { path } }) {
		const res = await fetch(`${path}.json`);
		if (!res.ok) return { status: 404, error: 'Curated post not found' };
		return { props: { post: await res.json() } };
	}
</script>

<script>
	export let post;
	import { Link } from 'svelement';
	import MetaHead from '$lib/pages/MetaHead.svelte';
	import Article from '$lib/pages/Article.svelte';
	import TagBadge from '$lib/components/TagBadge.svelte';
	import '$lib/styles/katex.css';
	$: ({ slug, title, content } = post);
</script>

<MetaHead {post} canonical="curated/{slug}" {title} />

<Article {post} header path="content/curated/{slug}.md">
	<slot slot="header">
		{#if post.tags}
			<small class="tags">
				{#each post.tags as tag}
					<TagBadge {tag} />
				{/each}
			</small>
		{/if}
	</slot>

	{@html content}
</Article>
