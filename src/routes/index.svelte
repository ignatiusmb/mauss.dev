<script context="module">
	import { compareDate } from '$utils/helper';
	export async function preload() {
		const quotes = this.fetch('quotes.json').then((r) => r.json());
		const data = {};
		for (const seg of ['posts', 'reviews', 'curated']) {
			data[seg] = await this.fetch(`${seg}.json`).then((r) => r.json());
			if (seg === 'curated') data[seg].sort((x, y) => compareDate(x.date.updated, y.date.updated));
			if (seg === 'reviews') data[seg].filter(({ rating, verdict }) => rating && verdict);
			if (Array.isArray(data[seg])) data[seg] = data[seg].slice(0, 4);
		}

		return { data, quotes: await quotes };
	}
</script>

<script>
	export let data, quotes;
	const section = {
		posts: { heading: 'Recent Posts 📚', desc: "What's on my mind (or life) recently:" },
		reviews: { heading: 'Recent Reviews ⭐', desc: "Contents I've been reviewing recently:" },
		curated: { heading: 'Recently Curated ⚖️', desc: "Stuffs I've been curating recently:" },
	};

	import { Link, Image } from 'svelement';
	import { random } from 'mauss/utils';
	import MetaHead from '$pages/MetaHead.svelte';
	import Article from '$pages/Article.svelte';
	import Quote from '$components/Quote.svelte';
	import Navigation from '$components/Navigation.svelte';

	let quoteIndex = random.int(quotes.length);
	let scrollY, innerHeight;
	const getNewQuote = () => {
		let newIndex;
		do newIndex = random.int(quotes.length);
		while (newIndex === quoteIndex);
		quoteIndex = newIndex;
	};
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
		<Link href="about">
			<div class="dashed-border" />
			<Image src="assets/profile/mauss.jpeg" alt="DevMauss Profile" ratio={1} />
		</Link>
		<h2>Ignatius Bagussuputra</h2>
		<span>Developer on Weekdays, Avid Writer on Weekends</span>
		<h3>I can make any design come true</h3>

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
			Hey there 👋! My name is Ignatius Bagussuputra, a student at the University of Indonesia
			pursuing a Computer Science degree.
		</p>
		<p>
			Have been developing since I started college, I love Open Source and enjoy making applications
			I think would be helpful or especially useful for me. Building interfaces is also something I
			love, that's why I'm passionate about my websites. I also like to build things IRL.
		</p>
		<br />
		<Link href="about">More info...</Link>
	</section>

	{#each Object.keys(data) as seg}
		<section>
			<h2>{section[seg]['heading']}</h2>
			<p>{section[seg]['desc']}</p>
			<ul>
				{#each data[seg] as { slug, title }}
					<li>
						<Link href="{seg}/{slug}">
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

	.fixed-nav > :global(nav) {
		position: fixed;
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
