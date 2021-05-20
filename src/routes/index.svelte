<script context="module">
	import { compare } from 'mauss';
	export async function load({ fetch }) {
		const quotes = await fetch('/quotes.json').then((r) => r.json());
		const data = {
			posts: (await fetch('/posts.json').then((r) => r.json())).slice(0, 4),
			reviews: (await fetch('/reviews.json').then((r) => r.json()))
				.filter((x) => x.rating && x.verdict !== -2)
				.slice(0, 4),
			curated: (await fetch('/curated.json').then((r) => r.json()))
				.sort((x, y) => compare.date(x.date.updated, y.date.updated))
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
		posts: { heading: '📚 Recent Posts', desc: "What's on my mind (or life)" },
		reviews: { heading: '⭐ Recent Reviews', desc: "Contents I've been reviewing" },
		curated: { heading: '⚖️ Recently Curated', desc: "Stuffs I've been curating" },
	};

	import { Link, Image } from 'svelement';
	import MetaHead from '$lib/pages/MetaHead.svelte';
	import Article from '$lib/pages/Article.svelte';
	import Quote from '$lib/components/Quote.svelte';
	import Navigation from '$lib/components/Navigation.svelte';

	let scrollY, innerHeight;
	$: scrolled = +(scrollY >= innerHeight * 0.6);
</script>

<svelte:window bind:scrollY bind:innerHeight />
<MetaHead
	title="Ignatius Bagussuputra"
	description="DevMauss. Personal website of Ignatius Bagussuputra. A Computer Science undergraduate
	from University of Indonesia." />

<div class="fixed-nav" class:scrolled>
	<Navigation bind:scrolled />
</div>

<Article>
	<header slot="header">
		<Link href="/about">
			<div class="dashed-border" />
			<Image src="/assets/profile/mauss.jpeg" alt="DevMauss Profile" ratio={1} />
		</Link>
		<h2>Ignatius Bagussuputra</h2>
		<span>Developer on Weekdays, Avid Writer on Weekends</span>
		<h3>I make stuff</h3>

		<Quote {quotes} />
	</header>

	<section>
		<h2>👋 About Me</h2>
		<p>Hello! My name's Ignatius, an undergraduate CS student.</p>
		<p>
			I've been developing ever since I started college. I enjoy creating stuff that makes life
			easier, I'm also an Open Source enthusiast. I'm also passionate about my websites and just
			beautiful interfaces in general. I also like to build things IRL.
		</p>
		<br />
		<Link href="/about">More info...</Link>
	</section>

	{#each Object.keys(data) as seg}
		<section>
			<h2>{section[seg]['heading']}</h2>
			<p>{section[seg]['desc']} recently:</p>
			<ul>
				{#each data[seg] as { slug, title }}
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
		padding-top: 30%;
		padding-bottom: 15%;
		text-align: center;
		font-family: var(--aqua-heading);
	}
	header h2,
	header h3 {
		width: 100%;
		color: inherit;
	}
	header > :global(a) {
		position: relative;
		width: 14em;
		height: 14em;
		justify-self: center;
		border-radius: 50%;
	}
	header > h3 {
		margin-bottom: auto;
	}
	header :global(.lmns-image img) {
		padding: 0.5em;
		border: none;
		border-radius: inherit;
	}
	header .dashed-border {
		position: absolute;
		width: 100%;
		height: 100%;
		border: 0.25em dashed var(--theme-primary);
		border-radius: inherit;
		animation: 28s infinite linear rotate;
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
		header {
			padding-top: 25%;
			padding-bottom: 0;
		}
		.fixed-nav > :global(nav) {
			bottom: unset;
			transform: translateY(-100%);
		}
		.fixed-nav.scrolled > :global(nav) {
			transform: translateY(0);
		}
	}
</style>
