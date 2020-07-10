<script>
  export let show = false;
  export let unique = {};
  export let filters = {};
  import { slide } from 'svelte/transition';
  import { capitalize } from '../utils/helper';
</script>

{#if show}
  <div transition:slide={{ duration: 100 }}>
    {#if unique.categories}
      <section>
        <h3>Categories</h3>
        {#each unique.categories as category}
          <label>
            <input type="checkbox" bind:group={filters.categories} value={category} />
            <span>{capitalize(category)}</span>
          </label>
        {/each}
      </section>
    {/if}
    {#if unique.genres}
      <section>
        <h3>Genres</h3>
        {#each unique.genres as genre}
          <label>
            <input type="checkbox" bind:group={filters.genres} value={genre} />
            <span>{capitalize(genre)}</span>
          </label>
        {/each}
      </section>
    {:else if unique.tags}
      <section>
        <h3>Tags</h3>
        {#each unique.tags as tag}
          <label>
            <input type="checkbox" bind:group={filters.tags} value={tag} />
            <span>{capitalize(tag)}</span>
          </label>
        {/each}
      </section>
    {/if}

    <slot />
  </div>
{/if}

<style>
  div {
    width: 100%;
    display: grid;
    gap: 1em;
    grid-template-columns: repeat(auto-fill, minmax(12em, 1fr));
  }
  div :global(input) {
    display: none;
  }
  div :global(section) {
    overflow-y: auto;
    max-height: 20em;
    display: flex;
    flex-direction: column;
  }
  div :global(section h3) {
    position: sticky;
    top: 0;
    padding: 0.5em 0.25em;
    border-bottom: 1px solid var(--fg-color);
    margin-bottom: 0.5em;
    background-color: var(--bg-color);
  }
  div :global(section label) {
    cursor: pointer;
    padding: 0.5em 0.25em;
  }
  div :global(section label span) {
    color: var(--fg-secondary-color);
  }
  div :global(section input:checked + span) {
    color: var(--fg-color);
  }
  div :global(section input:checked + span::after) {
    content: '✔';
    margin-left: 0.5em;
  }
</style>
