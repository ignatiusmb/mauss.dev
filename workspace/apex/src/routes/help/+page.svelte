<script lang="ts">
	import Index from '$lib/components/Index.svelte';
	import Article from '$lib/pages/Article.svelte';
</script>

<Article>
	<header>
		<h1>you've made port</h1>
		<small>always drifting, never adrift</small>
	</header>

	<!-- prettier-ignore -->
	<p>welcome, you've stumbled upon a corner of the internet — my digital garden, a kind of virtual abode. it's a living archive, always <em>under construction</em>, slowly growing as i plant new seeds and tend to older ones. over time, it may become a garden worth wandering through.</p>

	<!-- prettier-ignore -->
	<p>the index is a <em>collapsible</em> overview of the page and a way to jump between sections or sub-sections. you'll mostly see this in articles with headings, so you can navigate with ease.</p>
	<Index
		summary="Help Index"
		items={[
			{ id: 'writing', title: 'how i write' },
			{ id: 'atelier', title: '/atelier' },
			{ id: 'curated', title: '/curated' },
			{ id: 'posts', title: '/posts' },
			{ id: 'reviews', title: '/reviews' },
			{ id: 'reviews-how-i-review', title: 'how i review', level: 3 },
			{ id: 'reviews-attributions', title: 'attributions', level: 3 },
			{ id: 'other-pages', title: 'other pages' },
			{ id: 'about', title: '/about', level: 3 },
			{ id: 'uses', title: '/uses', level: 3 },
			{ id: 'rss', title: '/rss.xml', level: 3 },
			{ id: 'sponsor', title: '/sponsor', level: 3 },
			{ id: 'colophon', title: 'colophon' },
		]}
	/>

	<h2 id="writing">
		<i data-icon="feather"></i>
		<span>how i write</span>
	</h2>
	<!-- prettier-ignore -->
	<p>if you don't see anything weird — perfect. if you do, i hope you get used to it. writing this way helps me be more honest and express my thoughts more clearly. like chatting with a good friend — we just type whatever's on our mind, no need to dress it up. i case the words where it matters and aids readability. the rest is written as freely as i think it, as i try to make sense of things and articulate myself.</p>

	<section data-info="warning">
		<!-- prettier-ignore -->
		<p><em>policies, stances, and other small-but-important details live in the <a href="/fine-print">fine print</a>.</em></p>
	</section>

	<h2 id="atelier">
		<i data-icon="flask"></i>
		<a href="/atelier">/atelier</a>
	</h2>
	<!-- prettier-ignore -->
	<p>the structured map of my digital garden, where ideas are materialized. each entry reflects not just the result, but also the thought process and lessons behind building it.</p>

	<h2 id="curated">
		<i data-icon="books"></i>
		<a href="/curated">/curated</a>
	</h2>
	<!-- prettier-ignore -->
	<p>content that holds up, no matter when it's read. things i found meaningful enough to wish i'd seen sooner.</p>

	<h3>
		<i data-icon="basket"></i>
		<span>harvest</span>
	</h3>
	<!-- prettier-ignore -->
	<p>the harvest series is a snapshot of things that stood out to me each month. it's a way for me to reflect on the past month and record what i've learned and experienced from the passing time.</p>

	<h2 id="posts">
		<i data-icon="article"></i>
		<a href="/posts">/posts</a>
	</h2>
	<!-- prettier-ignore -->
	<p>blog entries for unfiltered moments. sometimes technical, sometimes personal, and often times just wandering.</p>

	<h2 id="reviews">
		<i data-icon="list-star"></i>
		<a href="/reviews">/reviews</a>
	</h2>
	<!-- prettier-ignore -->
	<p>my favorite index. reviews are where i express myself most freely, this is where i reflect and appreciate the stories and experiences i got.</p>
	<!-- prettier-ignore -->
	<p>most entries come with a <strong>/deep-dive</strong> sub-page: a space for nuanced analysis or spotlighting the moments that i want to capture. some are made to start conversation, others just to get the thoughts out.</p>

	<h3 id="reviews-how-i-review">
		<i data-icon="strategy"></i>
		<span>how i review</span>
	</h3>
	<!-- prettier-ignore -->
	<p>i believe stories are best experienced blind. that's why i avoid summaries, spoilers, or even specifics. the goal is to preserve the surprise and emotional weight, so you (or future me) can meet the story with the same excitement i had. i've always enjoyed stories more when i knew nothing going in.</p>
	<!-- prettier-ignore -->
	<p>for anime, i usually give it three or four episodes before deciding to continue or dropping it — just enough to vibe check it. if you prefer knowing the premise first, i've linked sources like MyAnimeList, <abbr title="The Movie Database">TMDB</abbr>, <abbr title="Internet Movie Database">IMDb</abbr>, and other related links on each review.</p>
	<!-- prettier-ignore -->
	<p>if you've gone through the whole thing or don't mind dissecting all the key points, check the <strong>/deep-dive</strong> sub-page. that's where i unpack the story and reflect more freely.</p>

	<h3 id="reviews-attributions">
		<i data-icon="certificate"></i>
		<span>attributions</span>
	</h3>
	<img
		alt="TMDB logo"
		src="https://www.themoviedb.org/assets/2/v4/logos/v2/blue_short-8e7b30f73a4020692ccca9c88bafe5dcb6f8a62a4c6bc55cd9ba82bb2cd95f6c.svg"
		style:border-radius="0"
		style:margin-top="1rem"
	/>
	<!-- prettier-ignore -->
	<p>most images are sourced from <a href="https://www.themoviedb.org" target="_blank">TMDB</a>, used under their <a href="https://www.themoviedb.org/about/logos-attribution" target="_blank">attribution terms</a>. i'm not affiliated — they're just excellent and easy to use. all reviews are mine; if you have concerns, feel free to reach out.</p>

	<h2 id="other-pages">
		<i data-icon="squares-four"></i>
		<span>other pages</span>
	</h2>
	<p>not the main plots, but corners of the garden that give it shape.</p>

	<h3 id="about">
		<i data-icon="id-badge"></i>
		<a href="/about">/about</a>
	</h3>
	<!-- prettier-ignore -->
	<p>a minimal intro to who i am, what i do, and where to find me — including some things you probably didn't ask for. the <a href="/about#now">/now</a> section is here too.</p>

	<h3 id="uses">
		<i data-icon="bookmark"></i>
		<a href="/uses">/uses</a>
	</h3>
	<!-- prettier-ignore -->
	<p>a snapshot of my setup — <a href="/uses#hardware">hardware</a>, <a href="/uses#apps">apps</a>, and <a href="/uses#wellness">wellness</a> picks that support my day-to-day. also serves as a reference for myself, a benchmark for what works and what lasts.</p>

	<h3 id="rss">
		<i data-icon="rss"></i>
		<a href="/rss.xml">/rss.xml</a>
	</h3>
	<!-- prettier-ignore -->
	<p>if you're one of the cool kids with your own curated feeds, there's the rss icon in the footer to subscribe and get updates as soon as they're live.</p>

	<h3 id="sponsor">
		<i data-icon="hand-heart"></i>
		<a href="/sponsor">/sponsor</a>
	</h3>
	<!-- prettier-ignore -->
	<p>a redirect to my <a href="https://github.com/sponsors/ignatiusmb">GitHub Sponsors</a> page. support is welcome — financially, or simply by engaging, giving feedback, or sharing my work.</p>

	<h2 id="colophon">
		<i data-icon="stack"></i>
		<span>colophon</span>
	</h2>
	<!-- prettier-ignore -->
	<p>credit where it's due. this site is built with open-source tools and carefully chosen pieces.</p>
	<ul>
		<li>
			<strong><a href="https://svelte.dev" target="_blank">sveltekit</a></strong>
			<span>the framework that makes all of this feel effortless.</span>
		</li>
		<!-- re-enable when it's actually used
	<li>
		<strong><a href="https://pocketbase.io" target="_blank">pocketbase</a></strong>
		<span>the minimal, lightweight all-in-one backend.</span>
	</li>
	-->
		<li>
			<strong><a href="https://phosphoricons.com" target="_blank">phosphor</a></strong>
			<span>clean, beautiful, and versatile open-source icons.</span>
		</li>
		<li>
			<strong><a href="https://fontsource.org" target="_blank">fontsource</a></strong>
			<span>self-hosted fonts for performance and privacy.</span>
		</li>
		<li>
			<strong><a href="https://github.com">github</a></strong>
			<span>where everything i build and share lives — this site included.</span>
		</li>
		<li>
			<strong><a href="https://vercel.com">vercel</a></strong>
			<span>where this site lives and breathes, fast and reliable.</span>
		</li>
	</ul>
</Article>

<style>
	header {
		display: grid;
		gap: 0.3rem;
		text-align: center;
		text-wrap: balance;
	}

	h2,
	h3 {
		display: flex;
		align-items: center;

		i[data-icon] {
			margin-right: 0.5rem;
		}
	}

	li > strong + span::before {
		content: '— ';
	}

	i[data-icon] {
		&[data-icon='basket'] {
			--svg: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="12"><line x1="128" y1="120" x2="128" y2="176"/><polyline points="184 88 128 24 72 88"/><line x1="180.8" y1="120" x2="175.2" y2="176"/><line x1="75.2" y1="120" x2="80.8" y2="176"/><path d="M24,88H232L216.93,201.06A8,8,0,0,1,209,208H47a8,8,0,0,1-7.93-6.94Z"/></svg>');
		}
		&[data-icon='certificate'] {
			--svg: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="12"><line x1="72" y1="136" x2="120" y2="136"/><line x1="72" y1="104" x2="120" y2="104"/><circle cx="196" cy="124" r="44"/><path d="M168,192H40a8,8,0,0,1-8-8V56a8,8,0,0,1,8-8H216a8,8,0,0,1,8,8V90.06"/><polyline points="168 157.94 168 224 196 208 224 224 224 157.94"/></svg>');
		}
		&[data-icon='feather'] {
			--svg: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="12"><line x1="184" y1="72" x2="32" y2="224"/><path d="M146.34,189.66a8,8,0,0,1-5.65,2.34H64V115.31a8,8,0,0,1,2.34-5.65L136.4,40.4a56,56,0,0,1,79.2,79.2Z"/><line x1="112" y1="64.52" x2="112" y2="144"/><line x1="136" y1="120" x2="215.2" y2="120"/></svg>');
		}
		&[data-icon='stack'] {
			--svg: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="12"><polyline points="32 176 128 232 224 176"/><polyline points="32 128 128 184 224 128"/><polygon points="32 80 128 136 224 80 128 24 32 80"/></svg>');
		}
		&[data-icon='strategy'] {
			--svg: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="12"><circle cx="76" cy="188" r="28"/><line x1="48" y1="72" x2="88" y2="112"/><line x1="88" y1="72" x2="48" y2="112"/><line x1="184" y1="168" x2="224" y2="208"/><line x1="224" y1="168" x2="184" y2="208"/><polyline points="144 80 144 40 184 40"/><path d="M144,40l16,16c40,40,8,88-24,96"/></svg>');
		}
		&[data-icon='squares-four'] {
			--svg: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="12"><rect x="48" y="48" width="64" height="64" rx="8"/><rect x="144" y="48" width="64" height="64" rx="8"/><rect x="48" y="144" width="64" height="64" rx="8"/><rect x="144" y="144" width="64" height="64" rx="8"/></svg>');
		}
	}
</style>
