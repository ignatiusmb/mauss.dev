<script>
  export let post = null;
  export let canonical = '';
  export let title, description;
  export let social = {};

  import { stores } from '@sapper/app';
  const { page } = stores();
  $: host = $page.host;

  $: url = `http${host.includes(':') ? '' : 's'}://${host}/${canonical}`;
</script>

<svelte:head>
  <title>{title} &bull; Mauss</title>
  {#if canonical}
    <link rel="canonical" href={url} />
  {/if}
  <meta name="author" content="Ignatius Bagussuputra" />
  {#if description}
    <meta name="description" content={description} />
  {/if}
  {#if post}
    {#if !description}
      <meta name="description" content={post.description} />
    {/if}
    <meta property="og:title" content={post.title} />
    <meta property="og:type" content="article" />
    <meta property="og:url" content={url} />
    {#if post.description}
      <meta property="og:description" content={post.description} />
    {/if}
    {#if post.date}
      <meta property="article:published_time" content={post.date} />
      <meta property="article:modified_time" content={post.updated} />
    {/if}
    <meta property="article:author" content="Ignatius Bagussuputra" />
    <meta property="article:author" content="Ignatius Bagus" />
    {#if post.tags}
      {#each post.tags as tag, i}
        {#if !i}
          <meta property="article:section" content={tag} />
        {/if}
        <meta property="article:tag" content={tag} />
      {/each}
    {/if}
    {#if social.twitter}
      <meta name="generator" content="Ignatius on Svelte + Sapper!" />
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:site" content="@ignatiusmbs" />
      <meta name="twitter:creator" content="@ignatiusmbs" />
      <meta name="twitter:url" content={url} />
      <meta name="twitter:title" content={post.title} />
      {#if post.description}
        <meta name="twitter:description" content={post.description} />
      {/if}
    {/if}
  {/if}
  <meta property="og:site_name" content="Mauss" />
  <meta property="og:locale" content="en_ID" />
  <slot />
</svelte:head>
