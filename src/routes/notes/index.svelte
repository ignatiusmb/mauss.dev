<script context="module">
	export async function preload() {
		return { notes: await this.fetch('notes.json').then((r) => r.json()) };
	}
</script>

<script>
	export let notes;
	import { ButtonLink } from '@ignatiusmb/elements';
	import MetaHead from '../../pages/MetaHead.svelte';
	import LayoutPicker from '../../pages/LayoutPicker.svelte';
</script>

<MetaHead canonical="notes" title="Notes" />

<LayoutPicker>
	{#each notes as { title, slug }}
		<section>
			<small>{title}</small>
			<ButtonLink href="notes/{slug}">view</ButtonLink>
		</section>
	{/each}
</LayoutPicker>

<style>
	section {
		width: 100%;
		min-height: 3em;
		display: grid;
		gap: 0.5em;
		align-items: center;
		grid-template-columns: 1fr auto;
		padding: 0.5em;
		border-radius: var(--b-radius);
		box-shadow: 0 2px 1px -1px rgba(0, 0, 0, 0.2), 0 1px 1px 0 rgba(0, 0, 0, 0.14),
			0 1px 3px 0 rgba(0, 0, 0, 0.12);
		background-color: var(--bg-overlay);
	}
	small {
		padding-left: 0.5em;
	}
</style>
