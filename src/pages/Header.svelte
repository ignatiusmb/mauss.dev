<script>
	export let path = null;
	export let post;
	const size = 16;

	import { createPrettyDate } from '../utils/helper';
	import { Feather, Link } from '@ignatiusmb/elements';
	import TextIcon from '../components/TextIcon.svelte';

	$: ({ author, published, updated } = post.date || {});
	$: ({ name, img, link } = author || {});
	$: pretty = {
		published: createPrettyDate(published),
		updated: createPrettyDate(updated),
	};
</script>

<header>
	{#if typeof post.title === 'string'}
		<h1>{post.title}</h1>
	{:else if post.title.jp}
		<h1>{post.title.jp}</h1>
	{:else}
		<h1>{post.title.en}</h1>
	{/if}

	<small>
		<Link href={link || 'about'}>
			<img src={img || 'profile/mauss.jpeg'} alt="author profile" />
		</Link>
		<div class="details">
			<span style="font-weight: bolder">{name || 'Ignatius Bagussuputra'}</span>

			{#if published}
				<div>
					<TextIcon>
						<Feather.Calendar {size} />
						<time datetime={published}>
							{#if updated && updated !== published}Published on{/if}
							{pretty.published.weekday}, {pretty.published.complete}
						</time>
					</TextIcon>
					{#if path && (!updated || (updated && updated === published))}
						<TextIcon href="https://github.com/ignatiusmb/mauss/edit/master/{path}">
							<span>Edit</span>
							<Feather.Edit {size} />
						</TextIcon>
					{/if}
				</div>
			{/if}

			{#if updated && updated !== published}
				<div>
					{#if path}
						<TextIcon href="https://github.com/ignatiusmb/mauss/commits/master/{path}">
							<Feather.GitCommit {size} />
							<time datetime={updated}>Updated {pretty.updated.complete}</time>
						</TextIcon>
					{:else}
						<span>
							<time datetime={updated}>Updated {pretty.updated.complete}</time>
						</span>
					{/if}
					{#if path}
						<TextIcon href="https://github.com/ignatiusmb/mauss/edit/master/{path}">
							<span>Edit</span>
							<Feather.Edit {size} />
						</TextIcon>
					{/if}
				</div>
			{/if}

			<div>
				<TextIcon>
					<Feather.Clock {size} />
					<span>{post.read_time} min read</span>
				</TextIcon>
				<TextIcon
					style="cursor:pointer"
					on:click={async () => {
						if (!process.browser && !navigator.share) return;
						navigator.share({ title: document.title, url: window.location.href });
					}}>
					<span>Share</span>
					<Feather.Share2 {size} />
				</TextIcon>
			</div>
		</div>
	</small>

	<slot />
</header>

<style>
	header,
	header > :global(div) {
		display: grid;
		gap: 0.8em;
		line-height: 1;
		font-family: var(--aqua-heading);
	}

	h1 {
		margin: 1em 0 0.5em;
		font-size: clamp(2rem, 4vw, 2.5rem);
	}
	small,
	header > :global(div > small) {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		font-size: clamp(0.9rem, 2vw, 1rem);
	}

	small:first-of-type {
		display: grid;
		gap: 0.75em;
		grid-template-columns: 3em 1fr;
	}
	small:first-of-type > :global(:first-child) {
		align-self: flex-start;
	}
	small:first-of-type img {
		border-radius: 50%;
	}
	small:first-of-type > .details {
		display: grid;
		gap: 0.5em;
	}
	.details :global(.text-icon) {
		align-items: flex-end;
	}
	.details > div {
		display: flex;
		align-items: center;
	}

	.details > div > :global(:not(:first-child)::before),
	header > :global(small:not(:first-of-type):not([slot]) > :not(:first-child)::before),
	header > :global(div > small:not([slot]) > :not(:first-child)::before) {
		content: '~';
		margin: 0 0.5em;
		color: var(--theme-secondary);
		font-weight: bolder;
	}
	small > :global(span.no-tilde::before) {
		content: '' !important;
		margin: 0 !important;
	}
	small time + :global(.lmns-link) {
		font: 90% var(--aqua-monospace);
	}
</style>
