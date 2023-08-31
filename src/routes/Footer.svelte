<script>
	import * as feather from 'syv/icons/feather';
	import Feather from 'syv/icons/Feather.svelte';
	import { page } from '$app/stores';
</script>

<footer>
	{#if !$page.url.pathname.startsWith('/help')}
		<div style:font-style="italic">
			<span>Visit the</span>
			<a href="/help/">help page</a>
			<span>for more information</span>
		</div>
	{/if}

	<section>
		<a href="https://www.facebook.com/ignatiusmb" aria-label="facebook profile">
			<Feather icon={feather.Facebook} />
		</a>
		<a href="https://www.instagram.com/ignatiusmb" aria-label="instagram profile">
			<Feather icon={feather.Instagram} />
		</a>
		<a href="https://www.linkedin.com/in/ignatiusmb" aria-label="linkedin profile">
			<Feather icon={feather.Linkedin} />
		</a>
		<a href="https://twitter.com/alchemauss" aria-label="twitter profile">
			<Feather icon={feather.Twitter} />
		</a>
		<a href="https://keybase.io/mauss" aria-label="keybase profile">
			<Feather icon={feather.Key} />
		</a>
		<a href="https://github.com/ignatiusmb" aria-label="github profile">
			<Feather icon={feather.Github} />
		</a>
		<a href="https://gitlab.com/ignatiusmb" aria-label="gitlab profile">
			<Feather icon={feather.Gitlab} />
		</a>
		<a href="https://twitch.tv/alchemauss" aria-label="twitch profile">
			<Feather icon={feather.Twitch} />
		</a>
		<a href="https://www.youtube.com/@ignatiusmb" aria-label="youtube profile">
			<Feather icon={feather.Youtube} />
		</a>
	</section>

	<p>Copyright &copy; 2017 &ndash; {new Date().getFullYear()} Ignatius Bagussuputra</p>
	<p>
		<span>Handcrafted with ❤️ using</span>
		<a href="https://kit.svelte.dev/">SvelteKit</a>
		<span>&plus;</span>
		<a href="https://marqua.mauss.dev/">Marqua</a>
	</p>
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
	section {
		width: 100%;
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		margin: auto;
	}
	section a {
		flex: 0 1 4rem;
		height: 4rem;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		border-radius: 50%;
		outline: 2px solid transparent;
		outline-offset: -0.625rem;

		transition-duration: var(--t-duration);
		transition-timing-function: cubic-bezier(0.68, -0.55, 0.265, 1.55);
		color: var(--fg-surface);
	}
	section a:focus {
		outline-color: var(--theme-secondary);
	}
	section a:hover,
	section a:focus {
		color: var(--theme-secondary);
	}
	section a:hover:nth-child(odd),
	section a:focus:nth-child(odd) {
		transform: rotate(6deg) scale(1.2) translateY(-20%);
	}
	section a:hover:nth-child(even),
	section a:focus:nth-child(even) {
		transform: rotate(-6deg) scale(1.2) translateY(-20%);
	}
</style>
