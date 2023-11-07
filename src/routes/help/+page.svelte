<script lang="ts">
	import Link from '$lib/components/Link.svelte';
	import Article from '$lib/pages/Article.svelte';
</script>

<Article>
	<section class="info-box warning">
		<Link href="/disclaimer/" style="danger">
			<h2>DISCLAIMER</h2>
		</Link>
	</section>

	<!-- prettier-ignore -->
	<p>Having trouble navigating through the page? Don't know what or where to look first? Read the brief explanation for each pages below, perhaps there's something for you in those pages.</p>

	<h2 id="about"><a href="/about">About</a></h2>
	<p>This includes an explanation for who I am and what the website is.</p>

	<h2 id="curated"><a href="/curated">Curated</a></h2>
	<!-- prettier-ignore -->
	<p>Curated page consists of things I find interesting or worthwhile to be compiled into its own dedicated timeless post, so it shouldn't matter when it's being read. It also hosts the special <a href="/curated/digest">Monthly Digests</a>, subscribe so you'll get the latest digests at the start of every month.</p>

	<h3>Monthly Digests</h3>
	<!-- prettier-ignore -->
	<p>See the world through my eyes. A compilation of everything I find interesting, informative, thought-provoking, or just something relevant happening in that month. I'll try my best to always keep it around 10 minutes read, but you can also skip to the sections you're interested in. The post is divided into 3 main sections with a couple bonus sections:</p>
	<ol>
		<li>
			<span>[Article | Content | Music | Video] of the month</span>
			<ul>
				<li>Each accompanied with their own honorable mentions</li>
				<li>There will only be 3 mentions and 4 at max on some occasion</li>
			</ul>
		</li>

		<li>
			<span>Headlines of the month</span>
			<ul>
				<li>Hot topics and news that happened in that month</li>
				<li>Articles or relevant sources will be linked below the summary</li>
			</ul>
		</li>

		<li>
			<span>Detailed monthly recap</span>
			<ul>
				<li>List of some news or activity on that day</li>
				<li>Limited to 3 items at max per day</li>
				<li>No guarantee that every day will have a list</li>
			</ul>
		</li>
	</ol>
	<!-- prettier-ignore -->
	<p>These sections above can be accessed or shared immediately by linking their hashes, for example you could add <code>#music-of-the-month</code> at the end of the URL to immediately jump to the section. Available for headlines as well, and for detailed monthly recap, just add the date number at the end of it <code>#24</code>, but as mentioned before there's no guarantee that every day would have it.</p>

	<h2 id="posts"><a href="/posts">Posts</a></h2>
	<!-- prettier-ignore -->
	<p>Posts page are just blog posts for various stuff happening or has happened. Would talk about life in general, have a tutorial post, or just discussing general technology or programming specific.</p>
	<!-- prettier-ignore -->
	<section class="info-box tip">You can get the link and subscribe to this site's RSS by clicking on the icon at the navigation bar so you don't miss out on any new stuff.</section>

	<h2 id="reviews"><a href="/reviews">Reviews</a></h2>
	<!-- prettier-ignore -->
	<p>Reviews page is the place where I try to express myself the most. I try to review all content I consume as objectively as possible and treat each review as a way to show my appreciation for the content that has been made. Even if I don't recommend it, I'm sure there's always something to learn from and take the positive out of it.</p>
	<!-- prettier-ignore -->
	<p>Most reviews will be accompanied by a **Spoilers Section**, which is just basically me theorizing and overanalyzing everything, or in some rare cases, a place where I could freely talk about the important events that happen there and open a discussion to all readers (or at least intrigue some of you about the topic).</p>

	<h3>Attributions - TMDB</h3>
	<p>
		<img
			src="https://www.themoviedb.org/assets/2/v4/logos/v2/blue_short-8e7b30f73a4020692ccca9c88bafe5dcb6f8a62a4c6bc55cd9ba82bb2cd95f6c.svg"
			alt="TMDB logo"
		/>
	</p>
	<!-- prettier-ignore -->
	<p>I pull most of my images from <a href="https://www.themoviedb.org/">TMDB</a> and according to their <a href="https://www.themoviedb.org/about/logos-attribution">TOC for Logos & Attribution</a>, <em>"every application that uses our data or images is required to properly attribute TMDb as the source"</em>. Although I don't necessarily use their API, rather linking them directly because I can choose it personally, here's an appropriate attribution for their high quality images and database.</p>
	<!-- prettier-ignore -->
	<p>I don't have any affiliation with TMDB nor any connection whatsoever, the usage of TMDB here is purely my personal choice and convenience it provides. The reviews, images used, and other stuff I chose does not represent TMDB, any further questions should be asked directly to me.</p>

	<h2 id="uses"><a href="/uses">Uses</a></h2>
	<!-- prettier-ignore -->
	<p>Uses page are somewhat <a href="https://uses.tech/">a trend for people who have their own blog or website</a>. Although, I've added a personal touch to my uses page. It doubles down as a living document for all the things I've researched and bought. I could spend hours or days before truly settling on one thing because I'm lazy and I prefer sticking to one thing rather than frequently changing them.</p>
	<!-- prettier-ignore -->
	<p>Because of that, I want the best for the job so I won't have to worry about its longevity, stick with just that one thing and get comfortable with it. Even if it somehow broke after 5 years or more, I would still have a benchmark I could compare it to for future replacements.</p>
	<!-- prettier-ignore -->
	<p>It could also serve as my personal reviews with testimonies for your reference on deciding what to use. Also, it induces a bit of personal nostalgia knowing your old stuffs.</p>
</Article>

<style>
	section {
		text-align: center;
	}
	section h2 {
		margin-top: 0;
		color: inherit;
	}
</style>
