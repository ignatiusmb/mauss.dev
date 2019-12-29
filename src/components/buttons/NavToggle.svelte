<script>
  import { navToggledStatus } from '../../store.js';
  function toggle() {
    $navToggledStatus = !$navToggledStatus;
  }
</script>

<span on:click={toggle}>
  <slot />
</span>

<style>
  span {
    -webkit-user-select: none;
    -moz-user-select: none;
    user-select: none;
    cursor: pointer;
    padding: 0.15em;
    border: 1px solid var(--fg-color);
    border-radius: 0.2em;
    text-transform: uppercase;
  }
</style>
