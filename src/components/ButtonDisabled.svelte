<button disabled>
  <slot />
</button>

<style>
  button {
    width: 100%;
    padding: 0.5em 1em;
    border: none;
    border-radius: 4px;
    background-color: var(--bg-inactive);
    color: var(--fg-color);
    text-transform: uppercase;
  }
  button:hover {
    cursor: not-allowed;
    filter: none;
  }
</style>
