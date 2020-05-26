<script>
  export let segment;
  import Icons from '../components/independent/Icons.svelte';
  import Navigation from '../components/Navigation.svelte';
  import Footer from '../components/Footer.svelte';
  import ScrollTop from '../components/ScrollTop.svelte';
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
  }
</style>
