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

	<p>Copyright &copy; 2017&ndash;{new Date().getFullYear()} Ignatius Bagus.</p>
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

	i[data-icon] {
		&[data-icon='hand-heart'] {
			--svg: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"><path d="M48,208H16a8,8,0,0,1-8-8V160a8,8,0,0,1,8-8H48"/><path d="M112,160h32l67-15.41a16.61,16.61,0,0,1,21,16h0a16.59,16.59,0,0,1-9.18,14.85L184,192l-64,16H48V152l25-25a24,24,0,0,1,17-7H140a20,20,0,0,1,20,20h0a20,20,0,0,1-20,20Z"/><path d="M96.73,120C87,107.72,80,94.56,80,80c0-21.69,17.67-40,39.46-40A39.12,39.12,0,0,1,156,64a39.12,39.12,0,0,1,36.54-24C214.33,40,232,58.31,232,80c0,29.23-28.18,55.07-50.22,71.32"/></svg>');
		}
	}
</style>
