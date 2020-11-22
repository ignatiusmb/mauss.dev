<script context="module">
	export async function preload({ params }) {
		const { category, slug } = params;
		const res = await this.fetch(`curated/${category}/${slug}.json`);
		if (res.status !== 200) return this.error(404, 'Curated post not found');
		return { post: await res.json() };
	}
</script>

<script>
	export let post;
	import { Link } from 'svelement';
	import MetaHead from '../../../pages/MetaHead.svelte';
	import Article from '../../../pages/Article.svelte';
	$: ({ slug, title, content } = post);
</script>

<MetaHead {post} canonical="curated/{slug}" {title} />

<Article {post} header path="content/curated/{slug}.md">
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
