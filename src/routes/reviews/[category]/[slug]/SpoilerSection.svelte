<script lang="ts">
	import { slide } from 'svelte/transition';
	import { TIME } from 'syv/options';
	import { navigating } from '$app/stores';

	export let spoilers: string;

	let show = false;
	$: show = $navigating ? false : show;
</script>

<section class="info-box note">
	<p>Be sure to come back and check out the spoilers section below when you're done.</p>
</section>

<section class="info-box important" class:show>
	<button on:click={() => (show = !show)}>
		CLICK TO {show ? 'HIDE' : 'REVEAL'} SPOILERS
	</button>
	{#if !show}
		<p>
			Clicking this card will reveal the another section below which will contain major spoilers as
			we will be breaking down most parts of the story as well as the ending, and discussing any
			related theories to it, please proceed with caution.
		</p>
	{/if}
</section>

{#if show}
	<section class="spoilers" transition:slide={{ duration: TIME.SLIDE }}>
		{@html spoilers}
	</section>
{/if}

<style>
	section.info-box.important {
		cursor: pointer;
		border-bottom-right-radius: 0;
		border-bottom-left-radius: 0;
		margin-bottom: 0;
	}
	section.info-box.important.show {
		border: 5px solid rgba(226, 177, 0, 1);
		border-bottom: 0;
	}
	section.spoilers {
		padding: 0.5em 1em;
		border: 5px dashed rgba(226, 177, 0, 1);
		border-top: 0;
		border-bottom-right-radius: 0.5em;
		border-bottom-left-radius: 0.5em;
		margin-top: 0;
		margin-left: -5px;
	}
</style>
