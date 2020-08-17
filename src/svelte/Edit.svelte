<script>
	export let path;
	const link = 'https://github.com/ignatiusmb/mauss/edit/master';
	import { Link, Icon } from '@ignatiusmb/elements/essentials';
</script>

<span>
	<Link href="{link}/{path}" newTab invert>
		Edit
		<Icon name="edit" size={17} />
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
