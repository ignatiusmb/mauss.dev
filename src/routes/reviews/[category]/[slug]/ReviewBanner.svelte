<script lang="ts">
	import Image from 'syv/core/Image.svelte';
	import { dt } from 'mauss/utils';

	export let post: import('$lib/content/reviews').Review;

	$: ({ backdrop, title, rating, composed, seen } = post);
</script>

<div class="banner">
	<Image src={backdrop} alt="{title.short || title.en} backdrop" absolute ratio={1 / 5} />

	<span class="composed">
		Days since last seen: {composed} ({dt.format(seen.first)('DD MMMM YYYY')})
	</span>
	<small>
		<div class="stars">
			{#each { length: 10 } as _, i}
				<span class:active={rating && rating >= i + 1}>⭐</span>
			{/each}
		</div>
	</small>
</div>

<style>
	.banner {
		position: relative;
		padding-top: 20%;
		border: none;
		border-radius: var(--b-radius);
		margin-top: 1em;
	}
	.banner::after {
		content: '';
		width: 100%;
		height: 100%;
		position: absolute;
		top: 0;
		border-radius: inherit;
		background-color: rgba(0, 0, 0, 0.5);
	}
	.banner :global(.syv-core-image img) {
		display: flex;
		align-items: flex-end;
		justify-content: center;
		padding: 0;
		border: none;
	}

	.banner:hover .composed {
		opacity: 1;
	}

	.composed {
		z-index: 1;
		opacity: 0;
		width: 100%;
		position: absolute;
		top: 10%;
		transition: var(--t-duration);
		color: rgba(255, 255, 255, 0.8);
		text-align: center;
		font-size: clamp(0.8rem, 3vw, 1.5rem);
	}
	small {
		z-index: 1;
		width: 100%;
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		font-size: clamp(1rem, 5vw, 3rem);
	}
	small > .stars {
		display: grid;
		grid-template-columns: repeat(10, 1fr);
		place-items: center;
		padding: 0 1em;
	}
	small > .stars span {
		filter: grayscale(1);
	}
	small > .stars span.active {
		filter: none;
	}
</style>
