<script lang="ts">
	import * as feather from 'syv/icons/feather';
	import Feather from 'syv/icons/Feather.svelte';
	import TextIcon from '$lib/components/TextIcon.svelte';

	import { dt } from 'mauss';

	export let path = '';
	export let post: {
		title: string | { en?: string; jp?: string };
		date: string | { published?: string; updated?: string };
		table: Array<{ id: string; title: string }>;
		estimate: number;

		author?: { name?: string; link?: string; img?: string };
	};

	const scale = 1;
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
		<a href={post.author?.link || '/about/'}>
			<img src={post.author?.img || '/assets/profile/mauss.jpg'} alt="author profile" />
		</a>
		<div class="details">
			<span style:font-weight="500">{post.author?.name || 'Ignatius Bagussuputra'}</span>

			<div>
				<TextIcon>
					<Feather icon={feather.Calendar} {scale} />
					{#if typeof post.date === 'object'}
						{@const { published, updated } = post.date}
						<time datetime={updated || published}>
							{dt.format(updated || published)('DDDD, DD MMMM YYYY')}
						</time>
					{:else}
						<time datetime={post.date}>{dt.format(post.date)('DDDD, DD MMMM YYYY')}</time>
					{/if}
				</TextIcon>
			</div>

			<div>
				<TextIcon>
					<Feather icon={feather.Clock} {scale} />
					<span>{post.estimate} min read</span>
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
					<Feather icon={feather.Share2} {scale} />
				</TextIcon>

				{#if path}
					<TextIcon href="https://github.com/alchemauss/content/blob/master/{path}">
						<span>Edit</span>
						<Feather icon={feather.Edit} {scale} />
					</TextIcon>
				{/if}
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
		font-family: var(--mrq-heading);
	}

	h1 {
		margin: 1em 0 0.5em;
		font-size: clamp(2rem, 5vw, 2.5rem);
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
		font-weight: 600;
	}
	small > :global(span.no-tilde::before) {
		content: '' !important;
		margin: 0 !important;
	}

	header > :global(small.tags) {
		display: flex;
		flex-wrap: wrap;
	}
	header > :global(small.tags:last-of-type :not(:last-child)) {
		margin-right: 0.5em;
	}
</style>
