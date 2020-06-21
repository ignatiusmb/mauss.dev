<script>
  import Icon from './independent/Icon.svelte';
  import LinkExt from './independent/LinkExt.svelte';
  const size = 30;
</script>

<footer>
  <slot />

  <section class="social-links">
    <LinkExt href="https://www.facebook.com/ignatiusmb" label="facebook profile">
      <Icon name="facebook" {size} />
    </LinkExt>
    <LinkExt href="https://twitter.com/ignatiusmbs" label="twitter profile">
      <Icon name="twitter" {size} />
    </LinkExt>
    <LinkExt href="https://www.instagram.com/ignatiusmb" label="instagram profile">
      <Icon name="instagram" {size} />
    </LinkExt>
    <LinkExt href="https://www.linkedin.com/in/ignatiusmb" label="linkedin profile">
      <Icon name="linkedin" {size} />
    </LinkExt>
    <LinkExt href="https://github.com/ignatiusmb" label="github profile">
      <Icon name="github" {size} />
    </LinkExt>
    <LinkExt href="https://gitlab.com/ignatiusmb" label="gitlab profile">
      <Icon name="gitlab" {size} />
    </LinkExt>
    <!-- <LinkExt href="https://www.twitch.tv/magnawu">
      <Icon name="twitch" {size} />
    </LinkExt> -->
    <LinkExt href="https://www.youtube.com/user/Ignapure/playlists" label="youtube playlist profile">
      <Icon name="youtube" {size} />
    </LinkExt>
    <!-- <LinkExt href="https://open.spotify.com/user/ignatiusmb">
      <Icon name="spotify" {size} />
    </LinkExt> -->
  </section>

  <section>
    <p>Copyright &copy; 2017 &ndash; {new Date().getFullYear()} Ignatius Bagussuputra</p>
    <p>
      Made with ❤️ using
      <LinkExt href="https://svelte.dev/">Svelte</LinkExt>
      &plus;
      <LinkExt href="https://sapper.svelte.dev/">Sapper</LinkExt>
    </p>
  </section>
</footer>

<style>
  footer {
    position: relative;
    padding: 3em 0;
    margin: auto 0 3em;
    text-align: center;
  }
  footer :global(.repository) {
    font-size: 2rem;
  }
  .social-links {
    max-width: 18em;
    display: grid;
    gap: 0.25em;
    grid-template-columns: repeat(auto-fit, minmax(0.75em, 1fr));
    padding: 0.8em 0.5em 0.6em;
    margin: auto;
    font-size: 2rem;
  }
  .social-links :global(a),
  .social-links :global(a:visited) {
    transition: 0.15s;
    transition-timing-function: cubic-bezier(0.68, -0.55, 0.265, 1.55);
    color: var(--fg-secondary-color);
  }
  .social-links :global(a:hover),
  .social-links :global(a:focus) {
    transition: 0.15s;
    transition-timing-function: cubic-bezier(0.68, -0.55, 0.265, 1.55);
    color: crimson;
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
    font-family: var(--aqua-monospace);
  }

  @media only screen and (min-width: 480px) {
    .social-links {
      font-size: 2.5rem;
    }
  }
</style>
