<script>
	import Article from '$lib/pages/Article.svelte';
</script>

<Article>
	<h1>fine print</h1>

	<h2>
		<i data-icon="user-focus"></i>
		<span>personal views</span>
	</h2>
	<!-- prettier-ignore -->
	<p>everything written here reflects my own opinions and experiences. they do not represent any past, present, or future affiliations or organizations i'm connected to.</p>

	<h2>
		<i data-icon="handshake"></i>
		<span>affiliate discretion</span>
	</h2>
	<!-- prettier-ignore -->
	<p>i don't accept compensation to promote products or services. any recommendations are based on personal use or extensive research — shared because i believe they might be genuinely useful to you. editorial choices are never influenced by advertisers or affiliate links.</p>

	<h2>
		<i data-icon="notepad"></i>
		<span>content reviews</span>
	</h2>
	<!-- prettier-ignore -->
	<p>my reviews are done in spare time, mostly as an outlet of appreciation — a way to support the creators behind the work. they're not definitive verdicts, but reflections that might help you decide whether the content resonates with you.</p>

	<h2>
		<i data-icon="chats"></i>
		<span>open to discourse</span>
	</h2>
	<!-- prettier-ignore -->
	<p>if you disagree with anything i've shared, i welcome discussion. it's always insightful to understand different perspectives and how we arrive at our conclusions.</p>
	<!-- prettier-ignore -->
	<p>contributions are also appreciated — feel free to explore the <a href="https://github.com/ignatiusmb/mauss.dev" target="_blank">source code</a> for both the site and its content.</p>
</Article>

<style>
	h2 {
		display: flex;
		align-items: center;

		i[data-icon] {
			margin-right: 0.5rem;
		}
	}
</style>
