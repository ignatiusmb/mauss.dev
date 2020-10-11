<script>
	export let href;
	import { Link } from '@ignatiusmb/elements';
</script>

<span>
	<Link {href} newTab invert>
		<slot />
	</Link>
</span>

<style>
	span {
		display: inline-flex;
		align-items: center;
	}
	span > :global(a) {
		display: inline-grid;
		gap: 0.25em;
		grid-template-columns: repeat(2, auto);
		align-items: center;
	}
</style>
