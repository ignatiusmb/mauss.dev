<script>
  import FlyWrapper from '../components/transition/Fly.svelte';

  import { onMount, onDestroy } from 'svelte';
  import scramble from '@ignatiusmb/scramble';

  let title, timeout;

  function repeat() {
    scramble(title).run();
    timeout = setTimeout(repeat, 5000);
  }

  onMount(() => (timeout = setTimeout(repeat, 1000)));
  onDestroy(() => clearTimeout(timeout));
</script>

<svelte:head>
  <title>Ignatius Bagussuputra</title>
  <meta
    name="description"
    content="Hello! My name is Ignatius, and this is my online portfolio. My homepage will always be updated with my
    current situation, so come frequently to get the latest update. Check out my projects and social accounts or contact
    me through any social media given for business inquiries." />
  <link rel="icon" type="image/png" href="images/favicon/home.png" />
</svelte:head>

<FlyWrapper>
  <h1 bind:this={title}>Ignatius</h1>
  <img alt="Code Thinking" src="images/undraw/code-thinking.svg" />
</FlyWrapper>

<style>
  h1 {
    text-align: center;
    text-transform: uppercase;
    font-size: 300%;
    font-family: var(--aqua-font-mono-main);
    font-weight: bold;
    letter-spacing: 4vw;
    text-indent: 4vw;
  }
  img {
    width: 100%;
    max-width: 34em;
    padding: 1em;
    margin: 1em auto 2em;
  }
</style>
