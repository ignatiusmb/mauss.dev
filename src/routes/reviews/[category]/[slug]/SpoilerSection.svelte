<script lang="ts">
	import { slide } from 'svelte/transition';
	import { TIME } from 'syv/options';
	import { navigating } from '$app/stores';

	export let spoilers: string;

	let checked = false;
	$: checked = $navigating ? false : checked;
</script>

<section class="info-box note">
	<p>Be sure to come back and check out the spoilers section below when you're done.</p>
</section>

<section class="info-box important" class:checked>
	<label>
		<input type="checkbox" bind:checked />
		<span>click to {checked ? 'hide' : 'reveal'} spoilers</span>
	</label>

	{#if !checked}
		<p>
			Clicking the text above will reveal the another section below which will contain spoilers as
			we will be breaking down most parts of the story as well as the ending, and discussing any
			related theories to it, please proceed with caution.
		</p>
	{/if}
</section>

{#if checked}
	<section class="spoilers" transition:slide={{ duration: TIME.SLIDE }}>
		{@html spoilers}
	</section>
{/if}

<style>
	label {
		cursor: pointer;
		width: 100%;
		display: flex;
	}
	label input {
		display: none;
	}
	label span {
		font-size: 2rem;
		letter-spacing: 0.25ch;
		text-transform: uppercase;
	}

	.info-box.important {
		border-bottom-right-radius: 0;
		border-bottom-left-radius: 0;
		margin-bottom: 0;
	}
	.info-box.important.checked {
		border: 5px solid rgba(226, 177, 0, 1);
		border-bottom: 0;
	}
	.spoilers {
		padding: 0.5rem 1rem;
		border: 5px dashed rgba(226, 177, 0, 1);
		border-top: 0;
		border-bottom-right-radius: 0.5rem;
		border-bottom-left-radius: 0.5rem;
		margin-top: 0;
		margin-left: -5px;
	}
</style>
