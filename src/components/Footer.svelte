<script>
  // your script goes here
</script>

<footer>
  <slot />
  <div class="social-links">
    <a href="https://www.facebook.com/ignatiusmb">
      <i class="fab fa-facebook" />
    </a>
    <a href="https://www.instagram.com/ignatiusmb/">
      <i class="fab fa-instagram" />
    </a>
    <a href="https://twitter.com/ignatiusmbs">
      <i class="fab fa-twitter" />
    </a>
    <a href="https://www.linkedin.com/in/ignatiusmb/">
      <i class="fab fa-linkedin" />
    </a>
    <a href="https://github.com/ignatiusmb/">
      <i class="fab fa-github" />
    </a>
    <a href="https://gitlab.com/ignatiusmb">
      <i class="fab fa-gitlab" />
    </a>
    <a href="https://open.spotify.com/user/ignatiusmb/">
      <i class="fab fa-spotify" />
    </a>
  </div>

  <div class="copyright">Copyright &copy; 2020 Ignatius Bagussuputra</div>
</footer>

<style>
  footer {
    position: relative;
    padding: 4em 0 6em;
    text-align: center;
    font-family: 'Rubik', sans-serif;
  }
  footer :global(.repository) {
    font-size: 2rem;
  }
  .social-links {
    max-width: 12em;
    display: grid;
    grid-gap: 0.25em;
    grid-template-columns: repeat(auto-fit, minmax(1em, 1fr));
    padding: 0.8em 0 0.6em;
    margin: auto;
    font-size: 2.5rem;
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
    font-weight: bold;
  }
</style>
