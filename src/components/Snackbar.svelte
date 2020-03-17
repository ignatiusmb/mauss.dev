<script>
  export let show;
</script>

<div class="snackbar" class:show>
  <slot />
  <svg xmlns="https://www.w3.org/2000/svg" viewBox="0 0 24 24">
    <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
    <path d="M0 0h24v24H0z" fill="none" />
  </svg>
</div>

<style>
  .snackbar {
    z-index: 10;
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0.8em 1em;
    background-color: var(--bg-color);
    color: var(--fg-color);
    letter-spacing: 0.25px;
    font-size: 90%;
    transform: translateY(100%);
    transition: 0.2s cubic-bezier(0.4, 0, 1, 1), -webkit-transform 0.2s cubic-bezier(0.4, 0, 1, 1);
  }
  .show {
    transform: translateY(0);
  }
</style>
