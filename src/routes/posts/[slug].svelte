<script context="module">
	export async function preload({ params }) {
		const list = this.fetch('posts.json').then((r) => r.json());
		const res = await this.fetch(`posts/${params.slug}.json`);
		if (res.status !== 200) return this.error(404, 'Post not found');

		const post = await res.json();
		for (const review of await list) {
			if (review.slug !== post.slug) continue;
			post.siblings = review.siblings;
			return { post };
		}
	}
</script>

<script>
	export let post;
	import { Link } from 'svelement';
	import MetaHead from '$pages/MetaHead.svelte';
	import Article from '$pages/Article.svelte';
	import TagBadge from '$components/TagBadge.svelte';
</script>

<MetaHead {post} canonical="posts/{post.slug}" title={post.title} />

<Article
	{post}
	header
	path="content/posts/{post.date.published}.{post.slug}.md"
	siblings={post.siblings}>
	<slot slot="header">
		<small class="tags">
			{#each post.tags as tag}
				<TagBadge {tag} />
			{/each}
		</small>
	</slot>

	{#if post.title.startsWith('Accessibility!')}
		<blockquote>
			<p>
				Making the web accessible isn't doing anyone a favor, it's you doing your job properly as a
				web developer, in the front end.
			</p>
		</blockquote>

		<section class="info-box warning">
			<p>
				<strong>Accessible Rich Internet Applications (ARIA)</strong>
				is a set of attributes that define ways to make web content and web applications (especially
				those developed with JavaScript) more accessible to people with disabilities.
			</p>

			<p>
				Many of these widgets were later incorporated into HTML5, and
				<strong>
					developers should prefer using the correct semantic HTML element over using ARIA,
				</strong>
				if such an element exists. For instance, native elements have built-in keyboard accessibility,
				roles and states. However, if you choose to use ARIA, you are responsible for mimicking (the
				equivalent) browser behavior in script. Source:
				<Link href="https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA">MDN</Link>
			</p>
		</section>
	{/if}

	{#if post.toc.length}
		<section id="objective" class="info-box">
			<h3>Outline & Focus</h3>
			<ul>
				{#each post.toc as { id, cleaned }}
					<li style="color: #f48fb1">
						<Link href="posts/{post.slug}#{id}" inherit>{cleaned}</Link>
					</li>
				{/each}
			</ul>
		</section>
	{/if}

	{@html post.content}
</Article>
