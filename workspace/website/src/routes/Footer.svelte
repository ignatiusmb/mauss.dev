<footer>
	<section>
		<span>&Larr;</span>
		<a href="/about" aria-label="Profile">
			<i data-icon="id-badge"></i>
		</a>
		<a href="/sponsor" aria-label="Sponsor page">
			<i data-icon="hand-heart"></i>
		</a>
		<a href="/help" aria-label="Help page">
			<i data-icon="lifebuoy"></i>
		</a>
		<span>&Rarr;</span>
	</section>

	<p>Copyright &copy; 2017&ndash;{new Date().getFullYear()} Ignatius Bagussuputra</p>
</footer>

<style>
	footer {
		grid-column: content;
		width: 100%;

		position: relative;
		display: grid;
		gap: 0.5rem;
		padding: 2rem 0;
		text-align: center;
		line-height: 1.5;
		font-family: var(--font-monospace);
		font-size: 0.875rem;
	}
	section {
		width: 100%;
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		justify-content: center;
		margin: auto;

		span {
			width: 2rem;
			font-size: 1.5rem;

			@media (min-width: 480px) {
				width: 4rem;
			}
		}

		a {
			flex: 0 1 4rem;
			height: 4rem;
			display: inline-flex;
			align-items: center;
			justify-content: center;
			border-radius: 50%;
			border-bottom: none;
			outline: 2px solid transparent;
			outline-offset: -0.625rem;
			color: var(--fg-surface);

			> i {
				transition-duration: var(--t-duration);
				transition-timing-function: cubic-bezier(0.68, -0.55, 0.265, 1.55);
			}

			&:hover > i,
			&:focus > i {
				color: var(--theme-secondary);
				transform: scale(1.5) translateY(-25%);
			}
		}
	}
</style>
