<script>
  export let status, hot;
</script>

<div
  class:hot={parseInt(hot)}
  class:positive={status === 1}
  class:neutral={status === 0}
  class:negative={status === -1}
  title={hot ? 'Must-watch!' : null}>
  {status === 0 ? 'Contextual' : status > 0 ? 'Recommended' : 'Not recommended'}
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
</style>
