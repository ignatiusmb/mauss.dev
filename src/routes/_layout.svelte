<script>
  export let segment;
  import Icons from '../components/independent/Icons.svelte';
  import Navigation from '../components/Navigation.svelte';
  import Footer from '../components/Footer.svelte';
  import ScrollTop from '../components/ScrollTop.svelte';

  import '../styles/fonts.css';
  import '../styles/theme.css';
  import '../styles/core.css';
  import '../styles/main.css';
  import '../styles/blog.css';
  import '../styles/animation.css';
</script>

<Icons />

<Navigation {segment} />
<slot />
<Footer />

<ScrollTop />

<style>
  :global(#sapper) {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    font-family: -apple-system, BlinkMacSystemFont, 'Helvetica Neue', 'Rubik', 'Ubuntu', 'Roboto', sans-serif;
  }
</style>
