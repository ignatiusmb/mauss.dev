<script context="module">
	export async function load({ page, fetch }) {
		const { category, slug } = page.params;
		const res = await fetch(`curated/${category}/${slug}.json`);
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
	import '$styles/katex.css';
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

	{#if post.toc.length}
		<section id="objective" class="info-box">
			<h3>Quick Links</h3>
			<ul>
				{#each post.toc as { id, cleaned }}
					<li style="color: #f48fb1">
						<Link href="curated/{post.slug}#{id}" inherit>{cleaned}</Link>
					</li>
				{/each}
			</ul>
		</section>
	{/if}

	{@html content}
</Article>
