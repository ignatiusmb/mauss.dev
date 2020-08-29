<script>
	export let post;
	import { Image } from '@ignatiusmb/elements';
	import { createPrettyDate } from '../utils/helper';
	$: ({ backdrop, title, rating, composed, last_seen } = post);
	$: ({ day, month, year } = createPrettyDate(last_seen));
</script>

<div class="banner">
	<Image src={backdrop} alt="{title.short ? title.short : title.en} backdrop" absolute ratio={1 / 5} />

	<span class="composed">Credibility: {composed} days since last seen on {day} {month} {year}</span>
	<small>
		<div class="stars">
			{#each Array(10) as _, i}
				<span class:active={rating >= i + 1}>⭐</span>
			{/each}
		</div>
	</small>
</div>

<style>
	.banner {
		position: relative;
		padding-top: 20%;
		border: none;
		border-radius: 0.15em;
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
	.banner :global(.lmns-image img) {
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
