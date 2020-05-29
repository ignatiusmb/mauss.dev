<svelte:head>
  <title>Ignatius Bagussuputra</title>
  <meta
    name="description"
    content="Hello! My name is Ignatius, and this is my online portfolio. My homepage will always be updated with my
    current situation, so come frequently to get the latest update. Check out my projects and social accounts or contact
    me through any social media given for business inquiries." />
</svelte:head>

<header>
  <h1>ignatiusmb</h1>
  <img alt="Logo" src="logo.png" class="color-rotate" />
</header>

<style>
  header {
    padding-bottom: 3em;
  }
  h1 {
    margin: 1.5em 0 1em;
    text-align: center;
    text-transform: uppercase;
    font-size: 2.5rem;
    font-family: var(--aqua-font-mono-main);
    font-weight: bold;
    letter-spacing: 3vw;
    text-indent: 3vw;
  }
  img {
    width: 100%;
    max-width: 34em;
    padding: 1em;
    margin: 1em auto 2em;
  }

  @media only screen and (min-width: 600px) {
    h1 {
      font-size: 3rem;
    }
  }
</style>
