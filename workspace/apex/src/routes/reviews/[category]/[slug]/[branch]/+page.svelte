<script lang="ts">
	import Piece from '$lib/components/Piece.svelte';
	import Backdrop from '../Backdrop.svelte';
	import LinkSpread from './LinkSpread.svelte';
	import { page } from '$app/state';

	const { data } = $props();
</script>

<Piece source={data.source} post={data.article}>
	{#snippet header()}
		<Backdrop review={data.article} />

		{#if data.article.link}
			<LinkSpread links={data.article.link} />
		{/if}
	{/snippet}

	{#if page.params.branch === 'deep-dive'}
		{@const idx = page.url.pathname.lastIndexOf('/')}

		<section data-info="warning" style:margin-bottom="1rem">
			<!-- prettier-ignore -->
			<p><em><strong>spoiler warning!</strong> this is a deeper look into the story and everything the {page.params.category} has to offer. if you haven't finished it yet and came here by accident, you might want to go back and finish the story first.</em></p>

			<a href={page.url.pathname.slice(0, idx)}>
				<i data-icon="hand-pointing"></i>
				<span>take me back!</span>
			</a>
		</section>
	{/if}

	{@html data.article.content}
</Piece>

<style>
	section {
		display: grid;
		gap: 0.5rem;

		a {
			display: grid;
			gap: 0.15rem;
			align-items: center;
			grid-template-columns: auto 1fr;
		}
	}
	i[data-icon] {
		&[data-icon='hand-pointing'] {
			transform: rotate(90deg) scale(0.8);
			--svg: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256"><rect width="256" height="256" fill="none"/><path d="M42.68,142a20,20,0,0,1,34.64-20L96,152V44a20,20,0,0,1,40,0v56a20,20,0,0,1,40,0v16a20,20,0,0,1,40,0v36a80,80,0,0,1-80,80C91.82,232,80.19,208,42.68,142Z" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="12"/></svg>');
		}
	}
</style>
