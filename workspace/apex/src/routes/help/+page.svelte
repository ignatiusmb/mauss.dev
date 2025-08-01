<script lang="ts">
	import Index from '$lib/components/Index.svelte';
	import Article from '$lib/pages/Article.svelte';
</script>

<header>
	<h1>safe harbor</h1>
	<small>calm shores, charted for you.</small>
</header>

<Article>
	<!-- prettier-ignore -->
	<p><strong>welcome</strong> — you've made port at the harbor of my digital garden, a kind of virtual abode nestled in a quiet corner of the internet. i hope this page can be your guiding compass, should you lose your bearings or wonder where to go next.</p>
	<!-- prettier-ignore -->
	<p>the garden is always <em>under construction</em>, slowly taking shape as i plant new seeds and tend old growth. in time, whether wandered by many or none, it may become a garden worth returning to.</p>

	<hr />

	<!-- prettier-ignore -->
	<p>the index is a <em>collapsible</em> overview of the page and a way to jump between sections or sub-sections. you'll mostly see this in articles with headings, so you can navigate with ease.</p>
	<Index
		summary="Dockside Chart"
		items={[
			{ id: 'atelier', title: '/atelier' },
			{ id: 'curated', title: '/curated' },
			{ id: 'curated-harvest', title: 'harvest', level: 3 },
			{ id: 'posts', title: '/posts' },
			{ id: 'reviews', title: '/reviews' },
			{ id: 'reviews-how-i-review', title: 'how i review', level: 3 },
			{ id: 'reviews-attributions', title: 'attributions', level: 3 },
			{ id: 'other-paths', title: 'other paths' },
			{ id: 'other-paths-help', title: '/help', level: 3 },
			{ id: 'other-paths-about', title: '/about', level: 3 },
			{ id: 'other-paths-uses', title: '/uses', level: 3 },
			{ id: 'other-paths-fine-print', title: '/fine-print', level: 3 },
			{ id: 'other-paths-sponsor', title: '/sponsor', level: 3 },
			{ id: 'other-paths-rss', title: '/rss.xml', level: 3 },
			{ id: 'colophon', title: 'colophon' },
		]}
	/>

	<h2 id="atelier">
		<i data-icon="flask"></i>
		<a href="/atelier">/atelier</a>
	</h2>
	<!-- prettier-ignore -->
	<p>the gallery for my digital garden. it's still sparse at the moment — there are seedlings i'm still tending to behind the scenes; some are just beginning to root, and a few shy ones are waiting for their time to open. for now, these are the ones that have bloomed.</p>

	<h2 id="curated">
		<i data-icon="bookmarks"></i>
		<a href="/curated">/curated</a>
	</h2>
	<!-- prettier-ignore -->
	<p>this index is where i keep recurring series and entries that aren't bound to the time they were written — pieces that hold up no matter when they're read. marked by lasting relevance, not by urgency, each one is meant to hold meaning long after the moment has passed.</p>

	<h3 id="curated-harvest">
		<i data-icon="basket"></i>
		<a href="/curated?series=the-harvest">harvest</a>
	</h3>
	<!-- prettier-ignore -->
	<p>the harvest series is a monthly snapshot of memorable experiences. making this <em>monthly digest</em> at the start of each month helps me reflect on what has passed; to record what i've learned and preserve the moments that stayed with me. it's also a way to share what i found meaningful, in hopes that something here might resonate with you.</p>
	<ul>
		<li>
			<strong>headlines</strong>
			<!-- prettier-ignore -->
			<span>personal moments and global happenings; news, milestones, and cultural shifts that stood out and shaped the month.</span>
		</li>
		<li>
			<strong>stories</strong>
			<!-- prettier-ignore -->
			<span>the lives and worlds i stepped into; mostly anime and movies, but open to any medium that tells a compelling story.</span>
		</li>
		<li>
			<strong>pieces</strong>
			<!-- prettier-ignore -->
			<span>articles, essays, and posts; thoughtful writing that lingered in my head or stirred something within me.</span>
		</li>
		<li>
			<strong>tracks</strong>
			<!-- prettier-ignore -->
			<span>music that stayed with me; sounds and songs that guides my mood throughout the month.</span>
		</li>
		<li>
			<strong>clips</strong>
			<!-- prettier-ignore -->
			<span>videos worth remembering; spontaneous finds full of insight, craft, or pure delight.</span>
		</li>
	</ul>

	<h2 id="posts">
		<i data-icon="feather"></i>
		<a href="/posts">/posts</a>
	</h2>
	<!-- prettier-ignore -->
	<p>this index is where i gather passing thoughts and small revelations — a journal of the days as they unfold. some entries are personal reflections, others trace my work and technical curiosities. i write to understand, remember, and leave a trail through the thoughts that shaped me.</p>

	<h2 id="reviews">
		<i data-icon="flower-lotus"></i>
		<a href="/reviews">/reviews</a>
	</h2>
	<!-- prettier-ignore -->
	<p>the world through a kaleidoscope — this index collects reflections refracted through a shifting lens, shaped by my own experiences. each piece tries to capture what i saw, felt, and learned. i write not to dictate your view, but to share mine in order to better understand the stories and moments that moved me.</p>

	<h3 id="reviews-how-i-review">
		<i data-icon="strategy"></i>
		<span>how i review</span>
	</h3>
	<!-- prettier-ignore -->
	<p>i believe stories are best experienced blind — you'll find no spoilers here, not even summaries or plot breakdowns. i try to preserve the surprise and emotional weight, so you (or future me) can enter each story with the same excitement i did.</p>
	<!-- prettier-ignore -->
	<p>for anime, i usually give it three or four episodes — just enough for a vibe check before deciding whether to continue or drop it. if you prefer knowing the premise first, i've linked sources like MyAnimeList, <abbr title="The Movie Database">TMDB</abbr>, <abbr title="Internet Movie Database">IMDb</abbr>, and other relevant pages on each review.</p>
	<!-- prettier-ignore -->
	<p>if you've already seen it or are curious about what it reveals, most entries include a <strong>/deep-dive</strong> sub-page where i unpack the story and reflect more freely.</p>

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
	<p>most images are sourced from <a href="https://www.themoviedb.org" target="_blank">TMDB</a>, used under their <a href="https://www.themoviedb.org/about/logos-attribution" target="_blank">attribution terms</a>. i'm not affiliated — they're just excellent and convenient. all reviews are my own; if you have concerns, feel free to reach out.</p>

	<hr />

	<h2 id="other-paths">
		<i data-icon="squares-four"></i>
		<span>other paths</span>
	</h2>
	<!-- prettier-ignore -->
	<p>the cozy corners of the site. not the main plots — more like footpaths and trellises that give the garden its form.</p>

	<h3 id="other-paths-help">
		<i data-icon="lifebuoy"></i>
		<a href="/help">/help</a>
	</h3>
	<!-- prettier-ignore -->
	<p>you're here now — the dedicated guide to what the site offers, how to find your way, and a quiet place for me to remember why it's shaped this way.</p>

	<h3 id="other-paths-about">
		<i data-icon="pen-nib"></i>
		<a href="/about">/about</a>
	</h3>
	<!-- prettier-ignore -->
	<p>who i am, what i do, what i'm <a href="/about#now">currently doing</a> (/now), and where to find me in <a href="/about#elsewhere">other corners of the internet</a>.</p>

	<h3 id="other-paths-uses">
		<i data-icon="suitcase"></i>
		<a href="/uses">/uses</a>
	</h3>
	<!-- prettier-ignore -->
	<p>a snapshot of my setup — <a href="/uses#hardware">hardware</a>, <a href="/uses#software">software</a>, and <a href="/uses#wellness">wellness</a> picks that support my day-to-day. also serves as a reference for myself, a benchmark for what works and what lasts.</p>

	<h3 id="other-paths-fine-print">
		<i data-icon="scroll"></i>
		<a href="/fine-print">/fine-print</a>
	</h3>
	<!-- prettier-ignore -->
	<p>the formalities — disclaimers, affiliate notes, personal views, and disclosures. not exactly fun, but part of keeping things clear and honest.</p>

	<h3 id="other-paths-sponsor">
		<i data-icon="hand-heart"></i>
		<a href="/sponsor">/sponsor</a>
	</h3>
	<!-- prettier-ignore -->
	<p>a redirect to <a href="https://github.com/sponsors/ignatiusmb">GitHub Sponsors</a>. support, whether through funds, feedback, sharing my work, or behind-the-scenes encouragement, means a lot.</p>

	<h3 id="other-paths-rss">
		<i data-icon="rss"></i>
		<a href="/rss.xml">/rss.xml</a>
	</h3>
	<!-- prettier-ignore -->
	<p>if you're one of the cool kids with your own curated feeds, you can subscribe via the rss icon — or straight from <code>/rss.xml</code> — and get updates the moment they're live.</p>

	<hr />

	<h2 id="colophon">
		<i data-icon="stack"></i>
		<span>colophon</span>
	</h2>
	<!-- prettier-ignore -->
	<p>built with open-source tools and thoughtfully chosen parts.</p>
	<ul>
		<li>
			<strong><a href="https://svelte.dev" target="_blank">sveltekit</a></strong>
			<span>the framework that makes all of this feel effortless.</span>
		</li>
		<!-- re-enable when it's actually used
		<li>
			<strong><a href="https://pocketbase.io" target="_blank">pocketbase</a></strong>
			<span>the minimal and lightweight all-in-one backend.</span>
		</li>
		-->
		<li>
			<strong><a href="https://phosphoricons.com" target="_blank">phosphor</a></strong>
			<span>clean, beautiful, and versatile open-source icons.</span>
		</li>
		<li>
			<strong><a href="https://fontsource.org" target="_blank">fontsource</a></strong>
			<span>self-hosted fonts for performance and privacy.</span>
			<ul>
				<li>
					<strong>
						<a href="https://fontsource.org/fonts/newsreader" target="_blank">newsreader</a>
					</strong>
					<span>a thoughtfully crafted serif for long-form reading.</span>
				</li>
				<li>
					<strong>
						<a href="https://fontsource.org/fonts/recursive" target="_blank">recursive</a>
					</strong>
					<span>a powerful and flexible five-axis variable font.</span>
				</li>
			</ul>
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
		gap: 1rem;
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
		&[data-icon='scroll'] {
			--svg: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="12"><path d="M200,176V64a24,24,0,0,0-24-24H40"/><line x1="104" y1="104" x2="168" y2="104"/><line x1="104" y1="136" x2="168" y2="136"/><path d="M24,80s-8-6-8-16a24,24,0,0,1,48,0V192a24,24,0,0,0,48,0c0-10-8-16-8-16H216s8,6,8,16a24,24,0,0,1-24,24H88"/></svg>');
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
