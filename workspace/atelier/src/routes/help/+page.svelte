<script lang="ts">
	import Article from '$lib/pages/Article.svelte';
</script>

<Article>
	<h1>you've made port.</h1>

	<!-- prettier-ignore -->
	<p>this space is a diary of sorts — a reflection of my experiences, inspirations, and evolving thoughts. a virtual abode shaped with intent, where i try to express myself with clarity and honesty.</p>
	<!-- prettier-ignore -->
	<p>i'm embracing the idea of a digital garden here. the site is always under construction, slowly growing as i plant new seeds and tend to older ones. over time, i hope it becomes a space worth visiting — imperfect, but alive.</p>

	<h2 id="writing">
		<i data-icon="feather"></i>
		<span>how i write</span>
	</h2>
	<!-- prettier-ignore -->
	<p>most of my writing on this site is done in lowercase. it's not about being rebellious or trying to look a certain way — it's just how my thoughts come out. writing this way helps me stay grounded, honest, and personal. it removes the feeling of performance and lets me focus on what i'm trying to say, not how it's dressed up.</p>
	<!-- prettier-ignore -->
	<p>writing isn't just a way to communicate — it's a way to understand. it's a reflective and enriching practice that can support our mental, emotional, and even physical well-being. with the right mindset, it becomes a tool to process what we've been through, how we feel, and how we see the world.</p>
	<!-- prettier-ignore -->
	<p>that said, some sections — like the landing page or anything meant to introduce myself professionally — still follow proper casing. these are for clarity and to meet expectations when communicating with potential collaborators. the rest, though, is written as freely and naturally as i think it. no filters, no polish — just me, trying to make sense of things in words.</p>

	<section data-info="warning" style:margin="2rem 0">
		<!-- prettier-ignore -->
		<em>policies, stances, and small-but-important stuff — it's all in the <a href="/fine-print">fine print</a>.</em>
	</section>

	<h2 id="curated">
		<i data-icon="books"></i>
		<a href="/curated">/curated</a>
	</h2>
	<!-- prettier-ignore -->
	<p>the curated route is a home for things i find meaningful enough to deserve their own timeless post — content that holds up no matter when it's read.</p>

	<h2 id="posts">
		<i data-icon="article"></i>
		<a href="/posts">/posts</a>
	</h2>
	<!-- prettier-ignore -->
	<p>these are blog entries for moments, thoughts, or things worth sharing. you'll find reflections on life, occasional tutorials, and observations on technology — sometimes specific, sometimes just wandering.</p>

	<h2 id="reviews">
		<i data-icon="list-star"></i>
		<a href="/reviews">/reviews</a>
	</h2>
	<!-- prettier-ignore -->
	<p>reviews are where i express myself most freely. i try to approach each piece — whether anime, film, games, or more — with honesty and care, treating reviews as a way to reflect and show appreciation for the work, even if i don't recommend it. there's always something to learn.</p>
	<!-- prettier-ignore -->
	<p>many entries come with a spoilers sub-page — a space for overanalysis, loose theorizing, or simply discussing the big moments that deserve more than a vague summary. some of them are written to spark conversation, others just to get thoughts out of my head.</p>

	<h3>attributions to TMDB</h3>
	<p>
		<img
			src="https://www.themoviedb.org/assets/2/v4/logos/v2/blue_short-8e7b30f73a4020692ccca9c88bafe5dcb6f8a62a4c6bc55cd9ba82bb2cd95f6c.svg"
			alt="TMDB logo"
		/>
	</p>
	<!-- prettier-ignore -->
	<p>images and metadata are sourced from <a href="https://www.themoviedb.org/" target="_blank">TMDB</a>, used in accordance with their <a href="https://www.themoviedb.org/about/logos-attribution" target="_blank">terms of use for logos and attribution</a>. i'm not affiliated with tmdb in any way — their tools are simply convenient and publicly available. all reviews and opinions are my own. any questions or concerns can be directed to me.</p>

	<h2 id="uses">
		<i data-icon="bookmark"></i>
		<a href="/uses">/uses</a>
	</h2>
	<!-- prettier-ignore -->
	<p>this page is a focused snapshot of my current setup — hardware, apps, and wellness essentials that support my daily workflow and well-being. it also serves as a personal reference point, a benchmark for longevity and future upgrades. if it's listed, it's what i trust and rely on every day.</p>
	<!-- prettier-ignore -->
	<p>i spend hours or even days researching and testing before settling on something, i want the best for the job so i won't have to worry about its longevity. once i find the right fit, i stick with it to avoid constant switching and to build familiarity and comfort over time.</p>

	<h2 id="rss">
		<i data-icon="rss"></i>
		<a href="/rss.xml">/rss.xml</a>
	</h2>
	<!-- prettier-ignore -->
	<p>for those who prefer to keep up the old-school way, this site has a dedicated rss feed. you can find the link by clicking the rss icon in the navigation bar — subscribe to get the latest posts, reviews, or curated entries as soon as they go live.</p>
	<p>no algorithms. no noise. just updates.</p>

	<h2 id="colophon">
		<i data-icon="stack"></i>
		<span>colophon</span>
	</h2>
	<!-- prettier-ignore -->
	<p>credit where it's due. this site is built using open-source tools and thoughtfully chosen components that make it what it is.</p>
	<ul>
		<li>
			<strong><a href="https://svelte.dev/" target="_blank">sveltekit</a></strong>
			<span>the web framework that makes all of this feel effortless.</span>
		</li>
		<li>
			<strong><a href="https://phosphoricons.com/" target="_blank">phosphor</a></strong>
			<span>clean, beautiful, and versatile open-source icons.</span>
		</li>
		<li>
			<strong><a href="https://fontsource.org/" target="_blank">fontsource</a></strong>
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
		&[data-icon='feather'] {
			--svg: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"><line x1="184" y1="72" x2="32" y2="224"/><path d="M146.34,189.66a8,8,0,0,1-5.65,2.34H64V115.31a8,8,0,0,1,2.34-5.65L136.4,40.4a56,56,0,0,1,79.2,79.2Z"/><line x1="112" y1="64.52" x2="112" y2="144"/><line x1="136" y1="120" x2="215.2" y2="120"/></svg>');
		}
		&[data-icon='stack'] {
			--svg: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"><polyline points="32 176 128 232 224 176"/><polyline points="32 128 128 184 224 128"/><polygon points="32 80 128 136 224 80 128 24 32 80"/></svg>');
		}
	}
</style>
