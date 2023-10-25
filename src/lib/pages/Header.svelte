<script lang="ts">
	import { dt } from 'mauss';

	export let post: {
		title: string | { en?: string; jp?: string };
		date: string | { published?: string; updated?: string };
		table: Array<{ id: string; title: string }>;
		estimate: number;

		author?: { name?: string; link?: string; img?: string };
		description?: string;
	};
</script>

<header>
	<aside>
		{#if typeof post.date === 'object'}
			{@const { published, updated } = post.date}
			<time datetime={updated || published}>
				{dt.format(updated || published)('DD MMMM YYYY')}
			</time>
		{:else}
			<time datetime={post.date}>{dt.format(post.date)('DD MMMM YYYY')}</time>
		{/if}

		<span class="dash">&mdash;</span>

		<span>{post.estimate} min read</span>
	</aside>

	{#if typeof post.title === 'string'}
		<h1>{post.title}</h1>
	{:else if post.title.jp}
		<h1>{post.title.jp}</h1>
	{:else}
		<h1>{post.title.en}</h1>
	{/if}

	<a href={post.author?.link || '/about/'}>
		<img src={post.author?.img || '/assets/profile/mauss.jpg'} alt="author profile" />
		<span>{post.author?.name || 'Ignatius Bagussuputra'}</span>
	</a>

	<slot />
</header>

<style>
	header {
		z-index: 0;
		position: relative;
		display: grid;
		gap: 0.8rem;
		justify-items: center;
		margin-top: 3rem;

		line-height: 1;
		font-family: var(--mrq-heading);
	}

	aside,
	header a {
		display: grid;
		gap: 0.5rem;
		grid-auto-flow: column;
		align-items: center;
		font-size: 0.875rem;
	}
	header a {
		grid-template-columns: 1.5rem 1fr;
		margin: 0.5rem 0;
		font-size: 1rem;
	}
	header a img {
		border-radius: 50%;
	}

	h1 {
		font-size: clamp(2.5rem, 4vw, 3rem);
		text-align: center;
		text-wrap: balance;
	}

	header :global(.dash) {
		color: var(--theme-secondary);
		font-weight: 600;
	}
</style>
