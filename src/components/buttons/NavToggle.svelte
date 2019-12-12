<script>
  import { navToggledStatus } from '../../store.js';
  function toggle() {
    $navToggledStatus = !$navToggledStatus;
  }
</script>

<style>
  span {
    -webkit-user-select: none;
    -moz-user-select: none;
    user-select: none;
    cursor: pointer;
    padding: 0.1em;
    border: 1px solid var(--fg-color);
    border-radius: 0.2em;
    text-transform: uppercase;
  }
</style>

<!-- markup (zero or more items) goes here -->
<span on:click={toggle}>
  <slot />
</span>
