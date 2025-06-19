<script lang="ts">
	import Index from '$lib/components/Index.svelte';
	import Article from '$lib/pages/Article.svelte';
</script>

<Article>
	<h1>you've made port.</h1>
	<small style:text-align="center">still afloat. always drifting, never adrift.</small>

	<!-- prettier-ignore -->
	<p>Alkamauss is a virtual abode — filled with reflections of my experiences and evolving thoughts, it's a space where i try to express myself with clarity and honesty. embracing the idea of <strong>a digital garden</strong>, i treat this site as a living archive that will always be under construction, slowly growing as i plant new seeds and tend to older ones. over time, i hope it becomes a space worth visiting: <em>imperfect, but alive</em>.</p>

	<hr style:width="100%" />
	<!-- prettier-ignore -->
	<p>here's the index — a quick overview of this page and a way to jump between sections. you'll also see this in any article that has sub-headings, to help you navigate with ease.</p>
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
			{ id: 'about', title: '/about' },
			{ id: 'uses', title: '/uses' },
			{ id: 'rss', title: '/rss.xml' },
			{ id: 'sponsor', title: '/sponsor' },
			{ id: 'colophon', title: 'colophon' },
		]}
	/>

	<h2 id="writing">
		<i data-icon="feather"></i>
		<span>how i write</span>
	</h2>
	<!-- prettier-ignore -->
	<p>most of my writing on this site is in lowercase. it might seem unusual if you're not used to this style, but i feel more grounded and honest as it helps me convey my thoughts and feelings better. like chatting in an instant messenger your good friend, it strips away the pressure to perform and lets me focus on what i'm trying to say, not how it's dressed up.</p>
	<!-- prettier-ignore -->
	<p>that said, <em>i can write formally when it counts</em>. for formal spaces, i switch to proper casing. the rest is almost always an organized mess — written as freely and naturally as i think it, as i try to make sense and articulate myself.</p>

	<section data-info="warning" style:margin="2rem 0">
		<!-- prettier-ignore -->
		<em>policies, stances, and small-but-important stuff are all in the <a href="/fine-print">fine print</a>.</em>
	</section>

	<h2 id="atelier">
		<i data-icon="flask"></i>
		<a href="/atelier">/atelier</a>
	</h2>
	<!-- prettier-ignore -->
	<p>the structured map of my digital garden in the literal sense, where ideas take form. each entry reflects not just the outcome, but also the thinking and lessons i've learned building it.</p>

	<h2 id="curated">
		<i data-icon="books"></i>
		<a href="/curated">/curated</a>
	</h2>
	<!-- prettier-ignore -->
	<p>the content that holds up no matter when it's read. things i find meaningful enough that i wished i had or was able to see back then.</p>

	<h2 id="posts">
		<i data-icon="article"></i>
		<a href="/posts">/posts</a>
	</h2>
	<!-- prettier-ignore -->
	<p>these are blog entries for unadulterated moments. sometimes technical, sometimes personal, and often times just wandering.</p>

	<h2 id="reviews">
		<i data-icon="list-star"></i>
		<a href="/reviews">/reviews</a>
	</h2>
	<!-- prettier-ignore -->
	<p>my favorite index so far, reviews are where i express myself most freely. i approach each piece with care, treating a review as a way to reflect and show appreciation for the work. even if i don't recommend it, i doubt i won't find something to learn.</p>
	<!-- prettier-ignore -->
	<p>almost all entries will be accompanied with a <strong>/deep-dive</strong> sub-page — a space for overanalysis, loose theorizing, or simply discussing the moments that deserve more attention. some of them are written to spark conversation, others just to get the thoughts out of my head.</p>

	<h3 id="reviews-how-i-review">
		<i data-icon="strategy"></i>
		<span>how i review</span>
	</h3>
	<!-- prettier-ignore -->
	<p>i believe stories are best experienced blind — especially anime. that's why i avoid summaries, spoilers, or even naming any specific details. the goal is to preserve the surprise, tension, and emotional impact so you can meet the story with the same curiosity i had. i often find myself enjoying the stories i know nothing of more than those i read about beforehand.</p>
	<!-- prettier-ignore -->
	<p>for anime, i usually give it three to four episodes before deciding to continue or drop it — just enough to get a feel for the pacing, tone, and direction without overcommitting. i'm not one to judge, if you're someone that needs a synopsis or plot summary before diving in, i've linked official sources like <abbr title="The Movie Database">TMDB</abbr>, <abbr title="Internet Movie Database">IMDB</abbr>, or <abbr title="MyAnimeList">MAL</abbr> for each review.</p>
	<!-- prettier-ignore -->
	<p>for a more in-depth discussion, head over to each of the <strong>/deep-dive</strong> sub-page. that's where i'll be doing my <em>actual</em> review where i unpack the story, dissect key moments, and share post-watch reflections — think of it as more like a discussion.</p>

	<h3 id="reviews-attributions">
		<i data-icon="certificate"></i>
		<span>attributions</span>
	</h3>
	<!-- prettier-ignore -->
	<p>images are sourced and linked from <a href="https://www.themoviedb.org" target="_blank">TMDB</a>, used in accordance with their <a href="https://www.themoviedb.org/about/logos-attribution" target="_blank">terms of use for logos and attribution</a>. i'm not affiliated with them in any way — their tools are simply convenient and publicly available. all reviews and opinions are my own, any questions or concerns can be directed to me.</p>
	<p>
		<img
			src="https://www.themoviedb.org/assets/2/v4/logos/v2/blue_short-8e7b30f73a4020692ccca9c88bafe5dcb6f8a62a4c6bc55cd9ba82bb2cd95f6c.svg"
			alt="TMDB logo"
		/>
	</p>

	<h2 id="about">
		<i data-icon="id-badge"></i>
		<a href="/about">/about</a>
	</h2>
	<!-- prettier-ignore -->
	<p>a minimal introduction to who i am, what i do, and where to find me — including a few things you probably didn't ask for. also includes my <a href="/about#now">/now</a> as a small section here, which is usually a page of its own.</p>

	<h2 id="uses">
		<i data-icon="bookmark"></i>
		<a href="/uses">/uses</a>
	</h2>
	<!-- prettier-ignore -->
	<p>this page is a focused snapshot of my current setup — hardware, apps, and wellness essentials that support my daily workflow and well-being. it also serves as my personal reference point, a benchmark for longevity and consideration for future upgrades. if it's listed, it's what i trust and rely on every day.</p>
	<!-- prettier-ignore -->
	<p>i spend hours or even days researching and testing before settling on something, i want the best for the job so i won't have to worry about its longevity. once i find the right fit, i stick with it to avoid constant switching and to build familiarity and comfort over time.</p>

	<h2 id="rss">
		<i data-icon="rss"></i>
		<a href="/rss.xml">/rss.xml</a>
	</h2>
	<!-- prettier-ignore -->
	<p>if you're one of the cool kids with a curated feed and prefer keeping up through rss, you'll find the link via the icon in the footer of the page — subscribe to get the latest entries as soon as they go live, straight to your feed.</p>

	<h2 id="sponsor">
		<i data-icon="hand-heart"></i>
		<a href="/sponsor">/sponsor</a>
	</h2>
	<!-- prettier-ignore -->
	<p>a redirect to my <a href="https://github.com/sponsors/ignatiusmb">GitHub Sponsors</a> page, where you can support me financially. i also accept support in other forms, such as sharing my work, giving feedback, or simply engaging with the content i create.</p>

	<h2 id="colophon">
		<i data-icon="stack"></i>
		<span>colophon</span>
	</h2>
	<!-- prettier-ignore -->
	<p>credit where it's due. this site is built using open-source tools and thoughtfully chosen components that make it what it is.</p>
	<ul>
		<li>
			<strong><a href="https://svelte.dev" target="_blank">sveltekit</a></strong>
			<span>the web framework that makes all of this feel effortless.</span>
		</li>
		<li>
			<strong><a href="https://pocketbase.io" target="_blank">pocketbase</a></strong>
			<span>the minimal and lightweight, all-in-one backend + database.</span>
		</li>
		<li>
			<strong><a href="https://phosphoricons.com" target="_blank">phosphor</a></strong>
			<span>clean, beautiful, and versatile open-source icons.</span>
		</li>
		<li>
			<strong><a href="https://fontsource.org" target="_blank">fontsource</a></strong>
			<span>self-hosted fonts for better performance and privacy.</span>
		</li>
		<li>
			<strong><a href="https://github.com">github</a></strong>
			<span>the home for everything i build and share — this site included.</span>
		</li>
		<li>
			<strong><a href="https://vercel.com">vercel</a></strong>
			<span>where this site lives and breathes. fast, reliable, and free.</span>
		</li>
	</ul>
</Article>

<style>
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
		&[data-icon='certificate'] {
			--svg: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"><line x1="72" y1="136" x2="120" y2="136"/><line x1="72" y1="104" x2="120" y2="104"/><circle cx="196" cy="124" r="44"/><path d="M168,192H40a8,8,0,0,1-8-8V56a8,8,0,0,1,8-8H216a8,8,0,0,1,8,8V90.06"/><polyline points="168 157.94 168 224 196 208 224 224 224 157.94"/></svg>');
		}
		&[data-icon='feather'] {
			--svg: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"><line x1="184" y1="72" x2="32" y2="224"/><path d="M146.34,189.66a8,8,0,0,1-5.65,2.34H64V115.31a8,8,0,0,1,2.34-5.65L136.4,40.4a56,56,0,0,1,79.2,79.2Z"/><line x1="112" y1="64.52" x2="112" y2="144"/><line x1="136" y1="120" x2="215.2" y2="120"/></svg>');
		}
		&[data-icon='stack'] {
			--svg: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"><polyline points="32 176 128 232 224 176"/><polyline points="32 128 128 184 224 128"/><polygon points="32 80 128 136 224 80 128 24 32 80"/></svg>');
		}
		&[data-icon='strategy'] {
			--svg: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"><circle cx="76" cy="188" r="28"/><line x1="48" y1="72" x2="88" y2="112"/><line x1="88" y1="72" x2="48" y2="112"/><line x1="184" y1="168" x2="224" y2="208"/><line x1="224" y1="168" x2="184" y2="208"/><polyline points="144 80 144 40 184 40"/><path d="M144,40l16,16c40,40,8,88-24,96"/></svg>');
		}
	}
</style>
