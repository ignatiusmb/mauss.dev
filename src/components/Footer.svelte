<script>
	import { Link, Icon } from '@ignatiusmb/elements/essentials';
</script>

<footer>
	<section>
		<em>
			Fully open-source and static, yet interactive site. Built without cookies, analytics, or anything to track you.
		</em>
		<em>
			Read the
			<Link href="uses">help page</Link>
			for more information
		</em>
	</section>

	<section class="social-links">
		<Link newTab href="https://www.facebook.com/ignatiusmb" label="facebook profile">
			<Icon name="facebook" />
		</Link>
		<Link newTab href="https://www.instagram.com/ignatiusmb" label="instagram profile">
			<Icon name="instagram" />
		</Link>
		<Link newTab href="https://www.linkedin.com/in/ignatiusmb" label="linkedin profile">
			<Icon name="linkedin" />
		</Link>
		<Link newTab href="https://twitter.com/devmauss" label="twitter profile">
			<Icon name="twitter" />
		</Link>
		<Link newTab href="https://github.com/ignatiusmb" label="github profile">
			<Icon name="github" />
		</Link>
		<Link newTab href="https://gitlab.com/ignatiusmb" label="gitlab profile">
			<Icon name="gitlab" />
		</Link>
		<Link newTab href="https://twitch.tv/devmauss" label="twitch profile">
			<Icon name="twitch" />
		</Link>
		<Link newTab href="https://www.youtube.com/user/Ignapure/playlists" label="youtube playlist profile">
			<Icon name="youtube" />
		</Link>
	</section>

	<section>
		<p>Copyright &copy; 2017 &ndash; {new Date().getFullYear()} Ignatius Bagussuputra</p>
		<p>
			Made with ❤️ using
			<Link newTab href="https://svelte.dev/">Svelte</Link>
			&plus;
			<Link newTab href="https://sapper.svelte.dev/">Sapper</Link>
			&plus;
			<Link newTab href="https://aqua.mauss.dev/">Aqua</Link>
		</p>
	</section>
</footer>

<style>
	footer {
		width: 100%;
		max-width: 53em;
		position: relative;
		display: grid;
		gap: 0.5em;
		padding: 3em 1em;
		margin: auto auto 3em;
		text-align: center;
		font-family: var(--aqua-monospace);
		font-size: clamp(0.8em, 3vw, 1em);
	}
	.social-links {
		width: 100%;
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		padding: 0 0 0.5em;
		margin: auto;
	}
	.social-links > :global(a) {
		flex: 0 1 5em;
		padding-top: 1em;
	}
	.social-links :global(a),
	.social-links :global(a:visited) {
		transition: var(--t-duration);
		transition-timing-function: cubic-bezier(0.68, -0.55, 0.265, 1.55);
		color: rgba(rgba(var(--fg-color, 1)), 0.6);
	}
	.social-links :global(a:hover),
	.social-links :global(a:focus) {
		transition: var(--t-duration);
		transition-timing-function: cubic-bezier(0.68, -0.55, 0.265, 1.55);
		color: rgba(var(--theme-secondary), 1);
	}
	.social-links :global(a:hover:nth-child(odd)),
	.social-links :global(a:focus:nth-child(odd)) {
		transform: rotate(6deg) scale(1.2) translateY(-20%);
	}
	.social-links :global(a:hover:nth-child(even)),
	.social-links :global(a:focus:nth-child(even)) {
		transform: rotate(-6deg) scale(1.2) translateY(-20%);
	}
	section:last-of-type {
		display: grid;
		grid-template-rows: repeat(2, 1fr);
		place-items: center;
		gap: 0.5em;
	}
</style>
