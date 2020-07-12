<script context="module">
	import { compareDate } from '../utils/helper';
	export async function preload() {
		const data = {
			about: await this.fetch('about.json').then((r) => r.json()),
			curated: await this.fetch('curated.json').then((r) => r.json()),
			posts: await this.fetch('posts.json').then((r) => r.json()),
			reviews: await this.fetch('reviews.json').then((r) => r.json()),
		};

		data['curated'] = data['curated'].sort((x, y) => compareDate(x.date_updated, y.date_updated));
		data['reviews'] = data['reviews'].filter((p) => p.rating && p.verdict);
		for (const key in data) if (Array.isArray(data[key])) data[key] = data[key].slice(0, 4);

		return { data };
	}
</script>

<script>
	export let data;
	import MetaHead from '../pages/MetaHead.svelte';
	import Article from '../pages/Article.svelte';
	import Link from '../svelte/Link.svelte';

	import { mobile } from '../stores';
	import Navigation from '../components/Navigation.svelte';
	let scrollY, innerHeight;
	$: scrolled = scrollY >= innerHeight * 0.7;
</script>

<svelte:window bind:scrollY bind:innerHeight />
<MetaHead
	title="Ignatius Bagussuputra"
	description="Mauss. Personal website of Ignatius Bagussuputra. A Computer Science undergraduate from University of
	Indonesia." />

<div class:fixed-nav={!$mobile} class:scrolled>
	<Navigation mobile={$mobile} bind:scrolled />
</div>

<Article header={false}>
	<header slot="header">
		<Link href="https://github.com/ignatiusmb/">
			<div class="dashed-border" />
			<img src="profile/mauss.jpeg" alt="Mauss Profile" />
		</Link>
		<h2>
			<Link href="about">Ignatius Bagussuputra</Link>
		</h2>
		<h4>CS Student at University of Indonesia</h4>
		<h3>I create and engineer graphics</h3>
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

	<section>
		<h2>Recent Posts 📚</h2>
		<p>What's on my mind (or life) recently:</p>
		<ul>
			{#each data['posts'] as post}
				<li>
					<Link href="posts/{post.slug}">{post.title}</Link>
				</li>
			{/each}
			<li>
				<Link href="posts">More posts...</Link>
			</li>
		</ul>
	</section>

	<section>
		<h2>Recent Reviews ⭐</h2>
		<p>Creative contents I've been consuming recently:</p>
		<ul>
			{#each data['reviews'] as review}
				<li>
					<Link href="reviews/{review.slug}">{typeof review.title === 'string' ? review.title : review.title.en}</Link>
				</li>
			{/each}
			<li>
				<Link href="reviews">More reviews...</Link>
			</li>
		</ul>
	</section>

	<section>
		<h2>Recently Curated ⚖️</h2>
		<p>Stuffs I've been curating recently:</p>
		<ul>
			{#each data['curated'] as curated}
				<li>
					<Link href="curated/{curated.slug}">{curated.title}</Link>
				</li>
			{/each}
			<li>
				<Link href="curated">More curated stuffs...</Link>
			</li>
		</ul>
	</section>
</Article>

<style>
	header {
		counter-reset: title;
		min-height: 100vh;
		display: grid;
		align-content: center;
		padding-bottom: 10%;
		text-align: center;
		font-family: var(--aqua-heading);
	}
	header > :global(a) {
		position: relative;
		width: 14em;
		height: 14em;
		justify-self: center;
	}
	header .dashed-border,
	header img {
		border-radius: 50%;
	}
	header img {
		padding: 0.5em;
		border: none;
	}
	header .dashed-border {
		position: absolute;
		width: 100%;
		height: 100%;
		border: 0.25em dashed var(--mauss-primary);
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
		background-color: var(--mauss-secondary);
	}

	.fixed-nav > :global(nav) {
		position: fixed;
		bottom: unset;
		transform: translateY(-100%);
	}
	.fixed-nav.scrolled > :global(nav) {
		transform: translateY(0);
	}
</style>
