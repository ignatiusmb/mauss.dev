<script>
	import Article from '$lib/pages/Article.svelte';
	import Link from '$lib/components/Link.svelte';
</script>

<Article>
	<section class="info-box warning">
		<h1>DISCLAIMER</h1>

		<p>
			All views expressed here are entirely my own opinion and personal take on the subject and do
			not represent the opinion of any entity whatsoever with which I have been, am now, or will be
			affiliated.
		</p>

		<p>
			Please take everything expressed with a grain of salt. I am not a professional reviewer nor
			writer and you are not obliged in any way to follow and/or blatantly take anything I say here
			as is.
		</p>

		<h2>Reviews</h2>

		<p>
			Purely done as a hobby of mine as well as to express my gratitude, with the intent of
			supporting the authors and the team behind all those creative content. The reviews is solely
			made as a guide to help decide for yourself whether you choose to consume the content or not.
		</p>
	</section>

	<p>
		All of that being said, I hope that we can move past blaming or hating what I said. If you
		disagree with something, I would welcome a discussion. It would be my privilege to learn from
		what you have to teach me. Direct contributions are also welcome, take a look at the
		<Link href="https://github.com/ignatiusmb/mauss.dev">source code</Link> or
		<Link href="https://github.com/alchemauss/content">content repository</Link>
	</p>
</Article>

<style>
	h1 {
		font-size: clamp(2rem, 6vw, 3rem);
		font-weight: 500;
	}
	h2 {
		margin-top: 0.5em;
		font-size: clamp(1.5rem, 4vw, 2rem);
		font-weight: 500;
	}
</style>
