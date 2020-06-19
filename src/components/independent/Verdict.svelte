<script>
  export let verdict, hot;
</script>

<div
  class:hot={parseInt(hot)}
  class:positive={verdict === 1}
  class:neutral={verdict === 0}
  class:negative={verdict === -1}
  class:wip={isNaN(verdict)}
  title={verdict === 2 ? 'Must-watch!' : null}>
  {#if verdict === 0}
    <span>Contextual</span>
  {:else if verdict > 0}
    <span>Recommended</span>
  {:else if verdict < 0}
    <span>Not recommended</span>
  {:else}
    <span>Pending</span>
  {/if}
  {#if hot}🔥{/if}
</div>

<style>
  div {
    width: 100%;
    display: inline-flex;
    justify-content: center;
    padding: 0.2em 0;
    border-radius: 0.25em;
    color: #fff;
  }
  span:not(:only-child) {
    margin-right: 0.25em;
  }
  .positive {
    background: #5cb85c;
  }
  .positive.hot {
    background: linear-gradient(90deg, rgba(92, 184, 92, 1) 0%, rgba(206, 32, 41, 1) 100%);
  }
  .neutral {
    background: #f0ad4e;
  }
  .negative {
    background: #d9534f;
  }
  .wip {
    background: var(--bg-inactive);
  }
</style>
