<script lang="ts">
	export let path = '';
	export let post: any = {};
	const size = 16;

	import { dt } from 'mauss/utils';
	import { Feather } from 'syv/icons';
	import Link from '$lib/components/Link.svelte';
	import TextIcon from '$lib/components/TextIcon.svelte';

	$: ({ author = {}, date = {} } = post);
	$: ({ published, updated } = date);
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
		<Link href={author.link || '/about/'}>
			<img src={author.img || '/assets/profile/mauss.jpeg'} alt="author profile" />
		</Link>
		<div class="details">
			<span style="font-weight: bolder">{author.name || 'Ignatius Bagussuputra'}</span>

			{#if published}
				<div>
					<TextIcon>
						<Feather.Calendar {size} />
						<time datetime={published}>
							{#if updated && updated !== published}Published on{/if}
							{dt.format(published)('DDDD, DD MMMM YYYY')}
						</time>
					</TextIcon>
					{#if path && (!updated || (updated && updated === published))}
						<TextIcon href="https://github.com/alchemauss/content/edit/master/{path}">
							<span>Edit</span>
							<Feather.Edit {size} />
						</TextIcon>
					{/if}
				</div>
			{/if}

			{#if updated && updated !== published}
				{@const formatted = dt.format(updated)('DD MMMM YYYY')}

				<div>
					{#if path}
						<TextIcon href="https://github.com/alchemauss/content/commits/master/{path}">
							{#if published}
								<Feather.GitCommit {size} />
							{:else}
								<Feather.Calendar {size} />
							{/if}
							<time datetime={updated}>Updated {formatted}</time>
						</TextIcon>
					{:else}
						<span>
							<time datetime={updated}>Updated {formatted}</time>
						</span>
					{/if}
					{#if path}
						<TextIcon href="https://github.com/alchemauss/content/edit/master/{path}">
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
					style="cursor: pointer"
					on:click={async () => {
						// TODO: show snackbar that navigator.share is not available
						if (typeof window !== 'undefined' && !navigator.share) return;
						navigator.share({ title: document.title, url: location.href });
					}}
				>
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
	header > :global(small:not(:first-of-type):not([class]) > :not(:first-child)::before),
	header > :global(div > small:not([class]) > :not(:first-child)::before),
	header > :global([slot] > small > :not(:first-child)::before) {
		content: '~';
		margin: 0 0.5em;
		color: var(--theme-secondary);
		font-weight: bolder;
	}
	small > :global(span.no-tilde::before) {
		content: '' !important;
		margin: 0 !important;
	}
	small time + :global(.syv-link) {
		font: 90% var(--aqua-monospace);
	}

	header > :global(small.tags) {
		display: flex;
		flex-wrap: wrap;
	}
	header > :global(small.tags:last-of-type :not(:last-child)) {
		margin-right: 0.5em;
	}
</style>
