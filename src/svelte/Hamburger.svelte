<script>
	export let opened = false;
	import Icon from '@ignatiusmb/elements/svelte/Icon.svelte';
</script>

<span on:click={() => (opened = !opened)}>
	<Icon name={opened ? 'close' : 'menu'} />
</span>

<style>
	span {
		cursor: pointer;
	}
</style>
