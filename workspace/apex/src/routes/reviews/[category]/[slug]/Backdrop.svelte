<script lang="ts">
	import type { Items } from '$content/builder';

	interface Props {
		review: Omit<Items['/reviews'][number], 'branches' | 'flank'>;
	}
	const { review }: Props = $props();

	const prefix = review.backdrop.source === 'tmdb' && 'https://image.tmdb.org/t/p/w780/';
</script>

<div class="banner">
	<img src="{prefix || ''}{review.backdrop.path}" alt="{review.title} backdrop" />

	<small class="rating">
		<i data-icon="star-half"></i>
		<span>{review.rating}</span>
	</small>

	<!-- TODO: figure out the UI
	<small class="composed">
		<span>Last seen on</span>
		<span>{dt.format(post.seen.first)('DD/MM/YYYY')} ({post.composed} days ago)</span>
	</small>
	-->
</div>

<style>
	div.banner {
		z-index: -1;
		opacity: 80%;
		width: 100%;
		inset: 0;
		position: absolute;

		margin: -1rem 0;
		border: none;
		border-radius: var(--rounding-box);

		&::after {
			content: '';
			width: 100%;
			height: 100%;
			position: absolute;
			top: 0;
			left: 0;
			border-radius: inherit;
			background: oklch(0 0 0 / 80%);
		}

		img {
			inset: 0;
			width: 100%;
			height: 100%;
			position: absolute;
			object-fit: cover;
			border-radius: inherit;
		}
	}

	.rating {
		z-index: 1;
		top: 0.5rem;
		left: 0.5rem;
		position: absolute;
		display: flex;
		gap: 0.25rem;
		align-items: center;
		padding: 0.25rem 0.5rem 0.25rem 0.25rem;
		border-radius: var(--rounding-base);
		background: oklch(0 0 0 / 80%);
		font-family: var(--font-sans);
		font-size: var(--size-small);
	}
	/* .composed {
		z-index: 1;
		right: 0;
		top: calc(100% + 0.25rem);
		position: absolute;
		padding: 0.25rem;
		border-radius: var(--rounding-base);
		background: oklch(0 0 0 / 80%);
		transition-duration: var(--transition-base);
	} */

	i[data-icon='star-half'] {
		--size: var(--size-base);
		--svg: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="12"><path d="M224,113.15l5.06-4.36A8.46,8.46,0,0,0,224.27,94L216,93.29"/><polyline points="184.44 168 180.37 150.78 192 140.75"/><line x1="128" y1="189.09" x2="128" y2="24"/><path d="M176,218.61l6.72,4.13a8.4,8.4,0,0,0,12.52-9.17L193.92,208"/><path d="M176,90.07,160.36,88.8,135.74,29.2a8.36,8.36,0,0,0-15.48,0L95.64,88.8,31.73,94a8.46,8.46,0,0,0-4.79,14.83l48.7,42L60.76,213.57a8.4,8.4,0,0,0,12.52,9.17L128,189.09,139.24,196"/></svg>');
	}
</style>
