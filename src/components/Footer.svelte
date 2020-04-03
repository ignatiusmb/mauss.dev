<script>
  const icons = [
    {
      name: 'facebook',
      url: 'https://www.facebook.com'
    },
    {
      name: 'instagram',
      url: 'https://www.instagram.com'
    },
    {
      name: 'twitter',
      url: 'https://twitter.com'
    },
    {
      name: 'linkedin',
      url: 'https://www.linkedin.com/in'
    },
    {
      name: 'github',
      url: 'https://github.com'
    },
    {
      name: 'gitlab',
      url: 'https://gitlab.com'
    },
    {
      name: 'spotify',
      url: 'https://open.spotify.com/user'
    }
  ];
</script>

<footer>
  <slot />

  <div class="social-links">
    {#each icons as icon}
      {#if icon.name === 'twitter'}
        <a href="{icon.url}/ignatiusmbs">
          <i class="fab fa-{icon.name}" />
        </a>
      {:else}
        <a href="{icon.url}/ignatiusmb">
          <i class="fab fa-{icon.name}" />
        </a>
      {/if}
    {/each}
  </div>

  <div class="copyright">Copyright &copy; {new Date().getFullYear()} Ignatius Bagussuputra</div>
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
    max-width: 14em;
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
  .copyright {
    font-size: 90%;
  }

  @media only screen and (min-width: 480px) {
    .social-links {
      font-size: 2.5rem;
    }
  }
</style>
