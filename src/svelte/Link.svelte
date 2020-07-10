<script>
  export let href = '';
  export let label = null;
  export let inherit = false;
  export let invert = false;
</script>

<a
  {href}
  rel={href.includes('//') ? 'noopener noreferrer' : 'preload'}
  aria-label={label}
  class:disabled={!href}
  class:inherit
  class:invert>
  <slot />
</a>

<style>
  a {
    cursor: pointer;
  }
  a.disabled {
    cursor: not-allowed;
  }
  a.inherit {
    color: inherit !important;
  }
  a.invert:hover {
    filter: invert() hue-rotate(180deg);
  }
</style>
