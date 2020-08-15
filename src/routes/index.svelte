<script context="module">
	import { compareDate, randomInt } from '../utils/helper';
	export async function preload() {
		const data = {
			about: await this.fetch('about.json').then((r) => r.json()),
			curated: await this.fetch('curated.json').then((r) => r.json()),
			posts: await this.fetch('posts.json').then((r) => r.json()),
			reviews: await this.fetch('reviews.json').then((r) => r.json()),
		};

		data['curated'] = data['curated'].sort((x, y) => compareDate(x.date.updated, y.date.updated));
		data['reviews'] = data['reviews'].filter((p) => p.rating && p.verdict);
		for (const key in data) if (Array.isArray(data[key])) data[key] = data[key].slice(0, 4);

		return { data, quotes: await this.fetch('quotes.json').then((r) => r.json()) };
	}
</script>

<script>
	export let data, quotes;
	const sections = [
		{ key: 'posts', heading: 'Recent Posts 📚', desc: "What's on my mind (or life) recently:" },
		{ key: 'reviews', heading: 'Recent Reviews ⭐', desc: "Creative contents I've been consuming recently:" },
		{ key: 'curated', heading: 'Recently Curated ⚖️', desc: "Stuffs I've been curating recently:" },
	];

	import { Link, Image } from '@ignatiusmb/elements/essentials';
	import MetaHead from '../pages/MetaHead.svelte';
	import Article from '../pages/Article.svelte';
	import Quote from '../svelte/Quote.svelte';
	import Navigation from '../components/Navigation.svelte';
	import { mobile } from '../stores';
	let quoteIndex = randomInt(quotes.length);
	let scrollY, innerHeight;
	const getNewQuote = () => {
		let newIndex;
		do newIndex = randomInt(quotes.length);
		while (newIndex === quoteIndex);
		quoteIndex = newIndex;
	};
	$: scrolled = scrollY >= innerHeight * 0.6;
</script>

<svelte:window bind:scrollY bind:innerHeight />
<MetaHead
	title="Ignatius Bagussuputra"
	description="DevMauss. Personal website of Ignatius Bagussuputra. A Computer Science undergraduate from University of
	Indonesia." />

<div class:fixed-nav={!$mobile} class:scrolled>
	<Navigation mobile={$mobile} bind:scrolled />
</div>

<Article>
	<header slot="header">
		<Link href="about">
			<div class="dashed-border" />
			<Image src="profile/mauss.jpeg" alt="DevMauss Profile" ratio={1} />
		</Link>
		<h2>Ignatius Bagussuputra</h2>
		<h4>CS Student at University of Indonesia</h4>
		<h3>I create and engineer graphics</h3>

		{#each [quotes[quoteIndex]] as { author, quote, from }}
			<Quote {author} on:click={getNewQuote}>
				<p>{quote}</p>
				{#if from}
					<p class="from">{from}</p>
				{/if}
			</Quote>
		{/each}
	</header>

	<section>
		<h2>About Me</h2>
		<p>
			Hey there 👋! My name is Ignatius Bagussuputra, a student at the University of Indonesia pursuing a Computer
			Science degree.
		</p>
		<p>
			Have been developing since I started college, I love Open Source and enjoy making applications I think would be
			helpful or especially useful for me. Building interfaces is also something I love, that's why I'm passionate about
			my websites. I also like to build things IRL.
		</p>
		<br />
		<Link href="about">More info...</Link>
	</section>

	{#each sections as { key, heading, desc }}
		<section>
			<h2>{heading}</h2>
			<p>{desc}</p>
			<ul>
				{#each data[key] as { slug, title }}
					<li>
						<Link href="{key}/{slug}">{typeof title === 'string' ? title : title.short ? title.short : title.en}</Link>
					</li>
				{/each}
				<li>
					<Link href={key}>More {key}{key === 'curated' ? ' stuffs ' : ''}...</Link>
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
		text-align: center;
		font-family: var(--aqua-heading);
	}
	header h2,
	header h3,
	header h4 {
		width: 100%;
	}
	header > :global(a) {
		position: relative;
		width: 14em;
		height: 14em;
		justify-self: center;
		border-radius: 50%;
		margin-top: 25%;
	}
	header > h3 {
		margin-bottom: auto;
	}
	header :global(.elements.image img) {
		padding: 0.5em;
		border: none;
		border-radius: inherit;
	}
	header .dashed-border {
		position: absolute;
		width: 100%;
		height: 100%;
		border: 0.25em dashed rgba(var(--theme-primary), 1);
		border-radius: inherit;
		animation: 28s infinite linear rotate;
	}
	header > :global(blockquote) {
		margin-bottom: 4em;
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
		background-color: rgba(var(--theme-secondary), 1);
	}

	.fixed-nav > :global(nav) {
		position: fixed;
		bottom: unset;
		transform: translateY(-100%);
	}
	.fixed-nav.scrolled > :global(nav) {
		transform: translateY(0);
	}

	@media only screen and (min-width: 600px) {
		header > :global(blockquote) {
			margin-bottom: revert;
		}
	}
</style>
