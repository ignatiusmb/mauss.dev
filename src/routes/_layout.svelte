<script>
  import Navigation from '../components/Navigation.svelte';
  import Footer from '../components/Footer.svelte';
  import ScrollTop from '../components/ScrollTop.svelte';

  import '@ignatiusmb/aqua/lib/core.css';
  import '@ignatiusmb/aqua/lib/main.css';
</script>

<Navigation />

<main>
  <slot />
</main>

<ScrollTop />
<Footer />

<style>
  main {
    flex: 1;
    padding-top: 1em;
    background-color: var(--bg-color);
  }
</style>
