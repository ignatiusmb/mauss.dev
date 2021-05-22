<div class="content-wrapper">
	<div class="empty" />
	<div class="contents">
		<slot />
	</div>
	<div class="empty" />
</div>

<style>
	.content-wrapper {
		--t-duration: 100ms;

		scrollbar-width: none;
		overflow: hidden;
		display: grid;
		grid-template-columns: minmax(0, 1fr) minmax(12em, 1fr) minmax(0, 1fr);
		mask: linear-gradient(90deg, rgba(0, 0, 0, 0) 0%, #000 10%, #000 90%, rgba(0, 0, 0, 0) 100%);
	}
	.content-wrapper::-webkit-scrollbar {
		display: none;
	}
	.contents {
		perspective: 24rem;
		position: relative;
		padding-top: calc(150% + 2em * 3.155);
		transform-style: preserve-3d;
	}
	.contents > :global(:not(.empty)) {
		width: 100%;
		position: absolute;
		top: 0;

		transition: var(--t-duration);
		transform: translate3d(0, 0, 0);
	}
	.contents > :global(.translate-left:not(:only-child)) {
		opacity: 0.8;
		transform: translate3d(-100%, 0, -10em);
	}
	.contents > :global(.translate-right) {
		opacity: 0.8;
		transform: translate3d(100%, 0, -10em);
	}
</style>
