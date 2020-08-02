<script>
	export let post;
	import { Image } from '@ignatiusmb/elements/essentials';
	import { ButtonLink } from '@ignatiusmb/elements/styled';
	import { createPrettyDate } from '../utils/helper';
	const date = createPrettyDate(post.date_published);
	const updated = createPrettyDate(post.date_updated);
</script>

<section>
	<Image src={post.image ? post.image.en : null} alt={post.title} overlay>
		<span>{post.title}</span>
	</Image>

	<div class="content">
		<h3>{post.title}</h3>
		{#if post.description}
			<small>{post.description}</small>
		{/if}
	</div>

	<aside>
		{#if post.date_updated && post.date_updated !== post.date_published}
			<small>Updated {updated.day} {updated.month} {updated.year}</small>
		{:else}
			<small>{date.day} {date.month} {date.year}</small>
		{/if}
		<small>{post.read_time} min read</small>
		<ButtonLink href="posts/{post.slug}">read</ButtonLink>
	</aside>
</section>

<style>
	section {
		display: grid;
		grid-template-rows: auto 1fr 3em;
		border-radius: 0.25em;
		box-shadow: 0 2px 1px -1px rgba(0, 0, 0, 0.2), 0 1px 1px 0 rgba(0, 0, 0, 0.14), 0 1px 3px 0 rgba(0, 0, 0, 0.12);
		background-color: rgba(var(--bg-color-secondary, 1));
		transform: translate(0%);
	}
	section > :global(.elements.image) {
		cursor: pointer;
		border-bottom-right-radius: 0;
		border-bottom-left-radius: 0;
		background-color: rgba(0, 0, 0, 0.15);
	}
	.content {
		display: grid;
		gap: 1em;
		align-content: flex-start;
		padding: 1em;
		line-height: 1.5;
	}
	aside {
		display: grid;
		gap: 0.5em;
		grid-template-columns: auto auto 1fr;
		align-items: center;
		padding: 0.5em;
		padding-left: 1em;
		border-radius: 0.25em;
	}
	aside small:not(:first-of-type)::before {
		content: '•';
		color: rgba(var(--theme-secondary), 1);
		margin-right: 0.5em;
	}
	aside :global(:last-child) {
		justify-self: end;
	}
</style>
