<script lang="ts">
	import Link from '$lib/components/Link.svelte';
	import TagBadge from '$lib/components/TagBadge.svelte';
	import MetaHead from '$lib/pages/MetaHead.svelte';
	import Article from '$lib/pages/Article.svelte';

	export let data: import('./$types').PageData;
</script>

<MetaHead post={data} canonical="posts/{data.slug}" title={data.title} />

<Article
	post={data}
	header
	path="src/posts/{data.date.published}.{data.slug}.md"
	flank={data.flank}
>
	<svelte:fragment slot="header">
		<small class="tags">
			{#each data.tags as tag}
				<TagBadge {tag} />
			{/each}
		</small>
	</svelte:fragment>

	{#if data.title.startsWith('Accessibility!')}
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

	{@html data.content}
</Article>
