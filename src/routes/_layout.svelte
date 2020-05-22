<script>
  export let segment;
  import Icons from '../components/independent/Icons.svelte';
  import Navigation from '../components/Navigation.svelte';
  import Footer from '../components/Footer.svelte';
  import ScrollTop from '../components/ScrollTop.svelte';

  import { stores } from '@sapper/app';
  const { page, preloading, session } = stores();
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
