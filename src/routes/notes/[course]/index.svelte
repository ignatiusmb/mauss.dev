<script context="module">
	export async function preload({ params }) {
		const res = await this.fetch(`notes/${params.course}.json`);
		if (res.status !== 200) return this.error(404, 'Course not found');
		const notes = await res.json();
		return { notes, post: notes.find((n) => n.slug === params.course) };
	}
</script>

<script>
	export let notes, post;
	import { ButtonLink } from '@ignatiusmb/elements';
	import MetaHead from '../../../pages/MetaHead.svelte';
	import Article from '../../../pages/Article.svelte';
	import LayoutPicker from '../../../pages/LayoutPicker.svelte';
	$: ({ slug, title, content } = post);
</script>

<MetaHead {post} canonical="notes/{slug}" {title} />

<Article {post} header path="content/notes/{slug}.md">
	<LayoutPicker class="half-bleed" view="column">
		{#each notes.slice(1) as note}
			<section>
				<span>{note.order}</span>
				<span>{note.title}</span>
				<ButtonLink href="notes/{note.slug}">view</ButtonLink>
			</section>
		{/each}
	</LayoutPicker>
	{@html content}
</Article>

<style>
	section {
		width: 100%;
		min-height: 3em;
		display: grid;
		gap: 0.5em;
		align-items: center;
		grid-template-columns: auto 1fr auto;
		padding: 0.5em;
		border-radius: var(--b-radius);
		margin-top: 0 !important;
		box-shadow: 0 2px 1px -1px rgba(0, 0, 0, 0.2), 0 1px 1px 0 rgba(0, 0, 0, 0.14),
			0 1px 3px 0 rgba(0, 0, 0, 0.12);
		background-color: var(--bg-overlay);
		text-align: center;
	}
	section > :first-child {
		width: 2em;
		height: 2em;
		display: flex;
		align-items: center;
		justify-content: center;
		border-radius: 50%;
		background-color: var(--bg-cover);
	}
</style>
