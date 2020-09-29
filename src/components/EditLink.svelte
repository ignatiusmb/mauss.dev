<script>
	export let path;
	import { Feather, Link } from '@ignatiusmb/elements';
	const link = 'https://github.com/ignatiusmb/mauss/edit/master';
</script>

<span>
	<Link href="{link}/{path}" newTab invert>
		<span>Edit</span>
		<Feather.Edit size="17" />
	</Link>
</span>

<style>
	span :global(a) {
		display: inline-flex;
		align-items: center;
	}
	span :global(a :last-child) {
		margin-left: 0.25em;
	}
</style>
