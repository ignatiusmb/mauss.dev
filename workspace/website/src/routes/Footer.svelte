<script>
	import * as feather from 'syv/icons/feather';
	import Feather from 'syv/icons/Feather.svelte';
</script>

<footer>
	<section>
		<span>&Larr;</span>
		<a href="/about" aria-label="Profile">
			<Feather icon={feather.User} />
		</a>
		<a href="/sponsor" aria-label="Sponsor page">
			<Feather icon={feather.Heart} />
		</a>
		<a href="/help" aria-label="Help page">
			<Feather icon={feather.HelpCircle} />
		</a>
		<span>&Rarr;</span>
	</section>

	<p>Copyright &copy; 2017&ndash;{new Date().getFullYear()} Ignatius Bagussuputra</p>
</footer>

<style>
	footer {
		width: 100%;
		max-width: 53rem;
		position: relative;
		display: grid;
		gap: 0.5rem;
		padding: 3rem 1rem;
		margin: auto auto 3rem;
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
	}
	section span {
		width: 2rem;
	}
	section a {
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
	}
	section a > :global(svg) {
		transition-duration: var(--t-duration);
		transition-timing-function: cubic-bezier(0.68, -0.55, 0.265, 1.55);
	}
	section a:focus {
		outline-color: var(--theme-secondary);
	}
	section a:hover > :global(svg),
	section a:focus > :global(svg) {
		color: var(--theme-secondary);
		transform: scale(1.5) translateY(-25%);
	}

	@media only screen and (min-width: 480px) {
		section span {
			width: 4rem;
		}
	}
</style>
