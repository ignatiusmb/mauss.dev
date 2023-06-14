<script lang="ts">
	import Link from '$lib/components/Link.svelte';

	export let post: import('./$types').PageData['list'][number];
</script>

<section>
	<small>{post.title}</small>
	<Link href="/curated/{post.slug}/" style="primary">READ</Link>
</section>

<style>
	section {
		width: 100%;
		min-height: 3em;
		display: grid;
		gap: 0.5em;
		align-items: center;
		grid-template-columns: 1fr auto;
		padding: 0.5em;
		border-radius: var(--b-radius);
		box-shadow: 0 2px 1px -1px rgba(0, 0, 0, 0.2), 0 1px 1px 0 rgba(0, 0, 0, 0.14),
			0 1px 3px 0 rgba(0, 0, 0, 0.12);
		background-color: var(--bg-overlay);
	}
	small {
		padding-left: 0.5em;
	}
</style>
