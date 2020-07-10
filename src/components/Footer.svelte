<script>
	export let mobile;
	import Icon from '../svelte/Icon.svelte';
	import Link from '../svelte/Link.svelte';
	$: size = mobile ? 20 : 30;
</script>

<footer>
	<section>
		<em>Without cookies, trackers, analytics, or anything to track you.</em>
	</section>

	<section class="social-links">
		<Link href="https://www.facebook.com/ignatiusmb" label="facebook profile">
			<Icon name="facebook" {size} />
		</Link>
		<Link href="https://twitter.com/ignatiusmbs" label="twitter profile">
			<Icon name="twitter" {size} />
		</Link>
		<Link href="https://www.instagram.com/ignatiusmb" label="instagram profile">
			<Icon name="instagram" {size} />
		</Link>
		<Link href="https://www.linkedin.com/in/ignatiusmb" label="linkedin profile">
			<Icon name="linkedin" {size} />
		</Link>
		<Link href="https://github.com/ignatiusmb" label="github profile">
			<Icon name="github" {size} />
		</Link>
		<Link href="https://gitlab.com/ignatiusmb" label="gitlab profile">
			<Icon name="gitlab" {size} />
		</Link>
		<Link href="https://www.youtube.com/user/Ignapure/playlists" label="youtube playlist profile">
			<Icon name="youtube" {size} />
		</Link>
	</section>

	<section>
		<p>Copyright &copy; 2017 &ndash; {new Date().getFullYear()} Ignatius Bagussuputra</p>
		<p>
			Made with ❤️ using
			<Link href="https://svelte.dev/">Svelte</Link>
			&plus;
			<Link href="https://sapper.svelte.dev/">Sapper</Link>
		</p>
	</section>
</footer>

<style>
	footer {
		max-width: 53em;
		position: relative;
		display: grid;
		gap: 0.5em;
		padding: 3em 1em;
		margin: 0 auto 3em;
		text-align: center;
		font-family: var(--aqua-monospace);
		font-size: clamp(0.8em, 3vw, 1em);
	}
	.social-links {
		width: 100%;
		display: grid;
		gap: 0.25em;
		grid-template-columns: repeat(auto-fit, minmax(0.75em, 1fr));
		padding: 1em 0 0.5em;
		margin: auto;
	}
	.social-links :global(a),
	.social-links :global(a:visited) {
		transition: 150ms;
		transition-timing-function: cubic-bezier(0.68, -0.55, 0.265, 1.55);
		color: var(--fg-secondary-color);
	}
	.social-links :global(a:hover),
	.social-links :global(a:focus) {
		transition: 150ms;
		transition-timing-function: cubic-bezier(0.68, -0.55, 0.265, 1.55);
		color: var(--mauss-secondary);
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
