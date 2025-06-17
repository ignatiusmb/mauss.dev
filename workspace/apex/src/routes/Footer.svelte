<footer>
	<section>
		<span>&Larr;</span>
		<a href="/about" aria-label="about alkamauss">
			<i data-icon="id-badge"></i>
		</a>
		<a href="/sponsor" aria-label="sponsor alkamauss">
			<i data-icon="hand-heart"></i>
		</a>
		<a href="/rss.xml" aria-label="alkamauss rss feed">
			<i data-icon="rss"></i>
		</a>
		<span>&Rarr;</span>
	</section>

	<p>
		<i data-icon="copyright"></i>
		<span>2017&ndash;{new Date().getFullYear()} Ignatius Bagus.</span>
	</p>
</footer>

<style>
	footer {
		grid-column: content;
		width: 100%;

		position: relative;
		display: grid;
		gap: 1rem;
		text-align: center;
		line-height: 1.5;
		font-family: var(--font-monospace);
		font-size: 0.875rem;
	}
	section {
		width: 100%;
		display: flex;
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
			display: inline-flex;
			align-items: center;
			justify-content: center;
			color: var(--color-text);
			outline: none;

			> i {
				transition-duration: var(--transition-base);
				transition-timing-function: cubic-bezier(0.68, -0.55, 0.265, 1.55);
			}

			&:hover > i,
			&:focus > i {
				color: var(--color-accent-primary);
				transform: scale(1.5) translateY(-25%);
			}
		}
	}
	p {
		display: grid;
		gap: 0.5rem;
		grid-auto-flow: column;
		align-items: center;
		justify-content: center;
	}

	i[data-icon] {
		&[data-icon='copyright'] {
			width: 1rem;
			height: 1rem;
			--svg: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"><circle cx="128" cy="128" r="96"/><path d="M160,152a40,40,0,1,1,0-48"/></svg>');
		}
	}
</style>
