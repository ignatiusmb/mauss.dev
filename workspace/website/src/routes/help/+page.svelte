<script lang="ts">
	import Link from '$lib/components/Link.svelte';
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

	<section class="info-box warning">
		<Link href="/disclaimer/" style="danger">
			<h2>DISCLAIMER</h2>
		</Link>
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
		<a href="https://www.themoviedb.org/" target="_blank">
			<img
				src="https://www.themoviedb.org/assets/2/v4/logos/v2/blue_short-8e7b30f73a4020692ccca9c88bafe5dcb6f8a62a4c6bc55cd9ba82bb2cd95f6c.svg"
				alt="TMDB logo"
			/>
		</a>
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
</Article>

<style>
	section {
		text-align: center;

		h2 {
			margin-top: 0;
			color: inherit;
		}
	}

	h2,
	h3 {
		display: flex;
		align-items: center;

		i[data-icon] {
			margin-right: 0.5rem;
		}
	}
</style>
