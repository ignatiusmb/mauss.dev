<script>
	export let link;
	import Link from '@ignatiusmb/elements/svelte/Link.svelte';
</script>

<section class="info-box warning">
	{#if link}
		<Link href="disclaimer" inherit>
			<h2>READ DISCLAIMER HERE</h2>
		</Link>
	{:else}
		<h1>DISCLAIMER</h1>

		<p>
			All views expressed here is entirely my own opinion and personal take on the subject and do not represent the
			opinion of any entity whatsoever with which I have been, am now, or will be affiliated.
		</p>

		<p>
			I am not a professional reviewer nor writter and you are not obliged in any way to follow and/or blatanly take
			everything I say here.
		</p>
	{/if}
	<slot />
</section>

<style>
	section :global(a > h2) {
		margin-top: 0;
		text-align: center;
	}
	section h1 {
		font-size: clamp(2rem, 6vw, 3rem);
		font-weight: bold;
	}
	section :global(p) {
		margin: 0 0 0.5em;
	}
</style>
