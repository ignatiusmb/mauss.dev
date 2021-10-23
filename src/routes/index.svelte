<script context="module">
	import { compare } from 'mauss';
	export async function load({ fetch }) {
		const quotes = await fetch('/quotes.json').then((r) => r.json());
		const data = {
			curated: (await fetch('/curated.json').then((r) => r.json()))
				.sort((x, y) => compare.date(x.date.updated, y.date.updated))
				.slice(0, 4),
			posts: (await fetch('/posts.json').then((r) => r.json())).slice(0, 4),
			reviews: (await fetch('/reviews.json').then((r) => r.json()))
				.filter((x) => x.rating && x.verdict !== -2)
				.slice(0, 4),
		};

		return {
			props: { data, quotes: quotes.slice(0, quotes.length / 2) },
		};
	}
</script>

<script>
	export let data, quotes;
	const section = {
		curated: { heading: '⚖️ Recently Curated', desc: "Stuffs I've been curating" },
		posts: { heading: '📚 Recent Posts', desc: "What's on my mind (or life)" },
		reviews: { heading: '⭐ Recent Reviews', desc: "Contents I've been reviewing" },
	};

	import { Link, Image } from 'syv';
	import MetaHead from '$lib/pages/MetaHead.svelte';
	import Article from '$lib/pages/Article.svelte';
	import Quote from '$lib/components/Quote.svelte';
	import Navigation from '$lib/components/Navigation.svelte';
	import RotatingBorder from '$lib/components/RotatingBorder.svelte';

	let scrollY, innerHeight;
	$: scrolled = scrollY > 0;
</script>

<svelte:window bind:scrollY bind:innerHeight />
<MetaHead title="Ignatius Bagussuputra" description="Alchemauss - Mauss Studio" />

<div class="fixed-nav" class:scrolled>
	<Navigation bind:scrolled />
</div>

<Article>
	<header slot="header">
		<Link href="/about">
			<RotatingBorder />
			<Image src="/assets/profile/mauss.jpeg" alt="Mauss Profile" ratio={1} />
		</Link>
		<h2>Ignatius Bagussuputra</h2>
		<span>Developer on Weekdays, Avid Writer on Weekends</span>
		<h3>Software Alchemist</h3>

		<Quote {quotes} />
	</header>

	<section>
		<h2>👋 About Me</h2>
		<p>
			Hello! I've been enjoying creating stuff that makes life easier ever since I learn software
			engineering, this is one of the reasons why I love Open Source, to give back and make stuff
			that can hopefully be useful to others as well.
		</p>
		<p>
			I'm passionate about my websites, code and design-wise. I like nice interfaces and treat them
			as challenges. I also like to build/assemble things IRL, especially those do-it-yourself IKEA
			style furnitures, it calms my mind and forces me to relax for a while.
		</p>
		<br />
		<Link href="/about">More info...</Link>
	</section>

	{#each Object.entries(data) as [seg, item]}
		<section>
			<h2>{section[seg]['heading']}</h2>
			<p>{section[seg]['desc']} recently:</p>
			<ul>
				{#each item as { slug, title }}
					<li>
						<Link href="/{seg}/{slug}">
							{typeof title === 'string' ? title : title.short || title.en}
						</Link>
					</li>
				{/each}
				<li>
					<Link href={seg}>More {seg}{seg === 'curated' ? ' stuffs ' : ''}...</Link>
				</li>
			</ul>
		</section>
	{/each}
</Article>

<style>
	header {
		counter-reset: title;
		min-height: 100vh;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		text-align: center;
		font-family: var(--aqua-heading);
	}
	header h2,
	header h3 {
		width: 100%;
		color: inherit;
	}
	header h3 {
		margin: 1.5em 0 2em;
	}
	header > :global(a) {
		position: relative;
		width: 14em;
		height: 14em;
		justify-self: center;
		border-radius: 50%;
	}
	header :global(.syv-core-image img) {
		padding: 0.5em;
		border: none;
		border-radius: inherit;
	}

	h2 {
		display: grid;
		gap: 0.5em;
		align-items: center;
	}
	header h2 {
		grid-template-columns: 1fr auto 1fr;
	}

	section h2 {
		grid-template-columns: auto auto 1fr;
		font-family: 'Inconsolata';
		font-family: var(--aqua-monospace);
	}
	section h2::before {
		counter-increment: title;
		content: '0' counter(title) '.';
		margin-right: -0.15em;
		color: var(--aqua-primary);
		font-size: 90%;
	}

	header h2::after,
	header h2::before,
	section h2::after {
		content: '';
		height: 0.1em;
		background-color: var(--theme-secondary);
	}

	.fixed-nav {
		z-index: 9;
		position: fixed;
		width: 100%;
	}

	@media only screen and (min-width: 600px) {
		.fixed-nav > :global(nav) {
			bottom: unset;
			transform: translateY(-100%);
		}
		.fixed-nav.scrolled > :global(nav) {
			transform: translateY(0);
		}
	}
</style>
