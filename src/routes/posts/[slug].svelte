<script context="module">
	export async function load({ fetch, params: { slug } }) {
		const res = await fetch(`/posts/${slug}.json`);
		if (!res.ok) return { status: 404, error: 'Post not found' };
		const post = await res.json();

		const list = await fetch('/posts.json');
		for (const review of await list.json()) {
			if (review.slug !== post.slug) continue;
			post.siblings = review.siblings;
			return { props: { post } };
		}
	}
</script>

<script>
	export let post;
	import { Link } from 'syv';
	import MetaHead from '$lib/pages/MetaHead.svelte';
	import Article from '$lib/pages/Article.svelte';
	import TagBadge from '$lib/components/TagBadge.svelte';
</script>

<MetaHead {post} canonical="posts/{post.slug}" title={post.title} />

<Article
	{post}
	header
	path="src/posts/{post.date.published}.{post.slug}.md"
	siblings={post.siblings}
>
	<svelte:fragment slot="header">
		<small class="tags">
			{#each post.tags as tag}
				<TagBadge {tag} />
			{/each}
		</small>
	</svelte:fragment>

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

	{@html post.content}
</Article>
