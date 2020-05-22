<script>
  import Icon from './independent/Icon.svelte';
  const size = 30;
</script>

<footer>
  <slot />

  <section class="social-links">
    <a href="https://www.facebook.com/ignatiusmb" alt="">
      <Icon name="facebook" {size} />
    </a>
    <a href="https://twitter.com/ignatiusmbs">
      <Icon name="twitter" {size} />
    </a>
    <a href="https://www.instagram.com/ignatiusmb">
      <Icon name="instagram" {size} />
    </a>
    <a href="https://www.linkedin.com/in/ignatiusmb">
      <Icon name="linkedin" {size} />
    </a>
    <a href="https://github.com/ignatiusmb">
      <Icon name="github" {size} />
    </a>
    <a href="https://gitlab.com/ignatiusmb">
      <Icon name="gitlab" {size} />
    </a>
    <!-- <a href="https://www.twitch.tv/magnawu">
      <Icon name="twitch" {size} />
    </a> -->
    <a href="https://www.youtube.com/user/Ignapure">
      <Icon name="youtube" {size} />
    </a>
    <!-- <a href="https://open.spotify.com/user/ignatiusmb">
      <Icon name="spotify" {size} />
    </a> -->
  </section>

  <section>
    <p>Copyright &copy; 2017 — {new Date().getFullYear()} Ignatius Bagussuputra</p>
    <p>
      Made with ❤️ and passion using
      <a href="https://svelte.dev/">Svelte</a>
      &plus;
      <a href="https://sapper.svelte.dev/">Sapper</a>
    </p>
  </section>
</footer>

<style>
  footer {
    position: relative;
    padding: 4em 0 6em;
    margin-top: auto;
    text-align: center;
    font-family: 'Rubik', sans-serif;
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
  .social-links a,
  .social-links a:visited {
    transition: 0.15s;
    transition-timing-function: cubic-bezier(0.68, -0.55, 0.265, 1.55);
    color: var(--fg-secondary-color);
  }
  .social-links a:hover,
  .social-links a:focus {
    transition: 0.15s;
    transition-timing-function: cubic-bezier(0.68, -0.55, 0.265, 1.55);
    color: crimson;
  }
  .social-links a:hover:nth-child(odd),
  .social-links a:focus:nth-child(odd) {
    transform: rotate(6deg) scale(1.2) translateY(-20%);
  }
  .social-links a:hover:nth-child(even),
  .social-links a:focus:nth-child(even) {
    transform: rotate(-6deg) scale(1.2) translateY(-20%);
  }
  section:last-of-type {
    display: grid;
    grid-template-rows: repeat(2, 1fr);
    gap: 0.5em;
    font-size: 0.9rem;
  }

  @media only screen and (min-width: 480px) {
    .social-links {
      font-size: 2.5rem;
    }
  }
</style>
