<script>
	import Feather from 'syv/icons/Feather.svelte';
</script>

<footer>
	<section>
		<em>
			<span>Visit the</span>
			<a href="/help/">help page</a>
			<span>for more information</span>
		</em>
	</section>

	<section class="social">
		<a href="https://www.facebook.com/ignatiusmb" aria-label="facebook profile">
			<Feather icon={import('syv/icons/feather/facebook')} />
		</a>
		<a href="https://www.instagram.com/ignatiusmb" aria-label="instagram profile">
			<Feather icon={import('syv/icons/feather/instagram')} />
		</a>
		<a href="https://www.linkedin.com/in/ignatiusmb" aria-label="linkedin profile">
			<Feather icon={import('syv/icons/feather/linkedin')} />
		</a>
		<a href="https://twitter.com/alchemauss" aria-label="twitter profile">
			<Feather icon={import('syv/icons/feather/twitter')} />
		</a>
		<a href="https://keybase.io/mauss" aria-label="keybase profile">
			<Feather icon={import('syv/icons/feather/key')} />
		</a>
		<a href="https://github.com/ignatiusmb" aria-label="github profile">
			<Feather icon={import('syv/icons/feather/github')} />
		</a>
		<a href="https://gitlab.com/ignatiusmb" aria-label="gitlab profile">
			<Feather icon={import('syv/icons/feather/gitlab')} />
		</a>
		<a href="https://twitch.tv/alchemauss" aria-label="twitch profile">
			<Feather icon={import('syv/icons/feather/twitch')} />
		</a>
		<a href="https://www.youtube.com/@ignatiusmb" aria-label="youtube profile">
			<Feather icon={import('syv/icons/feather/youtube')} />
		</a>
	</section>

	<section>
		<p>Copyright &copy; 2017 &ndash; {new Date().getFullYear()} Ignatius Bagussuputra</p>
		<p>
			<span>Handcrafted with ❤️ using</span>
			<a href="https://kit.svelte.dev/">SvelteKit</a>
			<span>&plus;</span>
			<a href="https://marqua.mauss.dev/">Marqua</a>
		</p>
	</section>
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
		font-size: clamp(0.8rem, 3vw, 1rem);
	}
	.social {
		width: 100%;
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		padding-bottom: 0.75rem;
		margin: auto;
	}
	.social > a {
		flex: 0 1 5rem;
		padding-top: 1rem;
	}
	.social a,
	.social a:visited {
		transition: var(--t-duration);
		transition-timing-function: cubic-bezier(0.68, -0.55, 0.265, 1.55);
		color: var(--fg-surface);
	}
	.social a:hover,
	.social a:focus {
		transition: var(--t-duration);
		transition-timing-function: cubic-bezier(0.68, -0.55, 0.265, 1.55);
		color: var(--theme-secondary);
	}
	.social a:hover:nth-child(odd),
	.social a:focus:nth-child(odd) {
		transform: rotate(6deg) scale(1.2) translateY(-20%);
	}
	.social a:hover:nth-child(even),
	.social a:focus:nth-child(even) {
		transform: rotate(-6deg) scale(1.2) translateY(-20%);
	}
	section:last-of-type {
		display: grid;
		grid-template-rows: repeat(2, 1fr);
		place-items: center;
		gap: 0.5rem;
	}
</style>
