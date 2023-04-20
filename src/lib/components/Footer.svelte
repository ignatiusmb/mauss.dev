<script>
	import Feather from 'syv/icons/Feather.svelte';
	import Link from '$lib/components/Link.svelte';
</script>

<footer>
	<section>
		<em>
			Read the
			<Link href="/help/">help page</Link>
			for more information
		</em>
	</section>

	<section class="social">
		<Link href="https://www.facebook.com/ignatiusmb" label="facebook profile">
			<Feather icon={import('syv/icons/feather/facebook')} />
		</Link>
		<Link href="https://www.instagram.com/ignatiusmb" label="instagram profile">
			<Feather icon={import('syv/icons/feather/instagram')} />
		</Link>
		<Link href="https://www.linkedin.com/in/ignatiusmb" label="linkedin profile">
			<Feather icon={import('syv/icons/feather/linkedin')} />
		</Link>
		<Link href="https://twitter.com/alchemauss" label="twitter profile">
			<Feather icon={import('syv/icons/feather/twitter')} />
		</Link>
		<Link href="https://keybase.io/mauss" label="keybase profile">
			<Feather icon={import('syv/icons/feather/key')} />
		</Link>
		<Link href="https://github.com/ignatiusmb" label="github profile">
			<Feather icon={import('syv/icons/feather/github')} />
		</Link>
		<Link href="https://gitlab.com/ignatiusmb" label="gitlab profile">
			<Feather icon={import('syv/icons/feather/gitlab')} />
		</Link>
		<Link href="https://twitch.tv/alchemauss" label="twitch profile">
			<Feather icon={import('syv/icons/feather/twitch')} />
		</Link>
		<Link href="https://www.youtube.com/user/Ignapure/playlists" label="youtube playlist profile">
			<Feather icon={import('syv/icons/feather/youtube')} />
		</Link>
	</section>

	<section>
		<p>Copyright &copy; 2017 &ndash; {new Date().getFullYear()} Ignatius Bagussuputra</p>
		<p>
			Handcrafted with ❤️ using
			<Link href="https://kit.svelte.dev/">SvelteKit</Link>
			&plus;
			<Link href="https://marqua.mauss.dev/">Marqua</Link>
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
	.social > :global(a) {
		flex: 0 1 5rem;
		padding-top: 1rem;
	}
	.social :global(a),
	.social :global(a:visited) {
		transition: var(--t-duration);
		transition-timing-function: cubic-bezier(0.68, -0.55, 0.265, 1.55);
		color: var(--fg-surface);
	}
	.social :global(a:hover),
	.social :global(a:focus) {
		transition: var(--t-duration);
		transition-timing-function: cubic-bezier(0.68, -0.55, 0.265, 1.55);
		color: var(--theme-secondary);
	}
	.social :global(a:hover:nth-child(odd)),
	.social :global(a:focus:nth-child(odd)) {
		transform: rotate(6deg) scale(1.2) translateY(-20%);
	}
	.social :global(a:hover:nth-child(even)),
	.social :global(a:focus:nth-child(even)) {
		transform: rotate(-6deg) scale(1.2) translateY(-20%);
	}
	section:last-of-type {
		display: grid;
		grid-template-rows: repeat(2, 1fr);
		place-items: center;
		gap: 0.5rem;
	}
</style>
