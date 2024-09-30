<script>
	import Article from '$lib/pages/Article.svelte';
</script>

<Article>
	<section class="info-box warning">
		<h1>DISCLAIMER</h1>

		<!-- prettier-ignore -->
		<p>All views expressed here are entirely my own opinion and personal take on the subject and do not represent the opinion of any entity whatsoever with which I have been, am now, or will be affiliated.</p>

		<h2>Affiliate Discretion</h2>
		<!-- prettier-ignore -->
		<p>Alchemauss is a participant in a couple of affiliate advertising program designed to proved a means for sites and creators to earn fees by using their personal links. This means that I may earn a small commission if you make a purchase through one of the affiliate links, without any additional cost to you.</p>
		<!-- prettier-ignore -->
		<p>I have not been compensated to recommend any products or services mentioned anywhere in any articles, and Alchemauss only recommends products and services that have either been personally used or thoroughly researched and believe can add value to you. The editorial content is not influenced by advertisers or affiliate partnerships.</p>

		<h2>Content Reviews</h2>
		<!-- prettier-ignore -->
		<p>Any reviews are done in spare time and mostly as a hobby to express gratitude with the intent of supporting the authors and the team behind all of the creative content that has been produced. The reviews are made as a guide to help you decide whether you choose to consume the content or not.</p>
	</section>

	<!-- prettier-ignore -->
	<p>If you disagree with something, I would welcome a discussion. It would be interesting to learn what and how we come up with our conclusions. Direct contributions are also welcome, take a look at the <a href="https://github.com/ignatiusmb/mauss.dev">source code</a> for both the website and content.</p>
</Article>

<style>
	h1 {
		font-size: clamp(2rem, 6vw, 3rem);
		font-weight: 500;
	}
	h2 {
		margin-top: 0.5rem;
		font-size: clamp(1.5rem, 4vw, 2rem);
		font-weight: 500;
	}
</style>
