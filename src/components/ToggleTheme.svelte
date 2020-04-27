<script>
  import { onMount } from 'svelte';

  let body, checked;

  function checkButton(state) {
    if (checked === state) return;
    if (state) body.classList.replace('light', 'dark');
    else body.classList.replace('dark', 'light');
    localStorage.setItem('theme', state ? 'dark' : 'light');
    checked = state;
  }

  onMount(() => {
    body = document.body;
    const preference = window.matchMedia('(prefers-color-scheme: dark)');
    if (!body.classList.length) body.classList.add(preference.matches ? 'dark' : 'light');
    if (!localStorage.getItem('theme')) checkButton(preference.matches);
    else checkButton(localStorage.getItem('theme') === 'dark');
  });
</script>

<label>
  <input on:click={() => checkButton(!checked)} bind:checked class="input" type="checkbox" />
  <span />
</label>

<style>
  label {
    position: relative;
    display: flex;
    margin-left: auto;
  }

  input {
    cursor: pointer;
    position: absolute;
    height: 100%;
    opacity: 0;
  }

  span {
    cursor: pointer;
    width: 3.25em;
    height: 1.5em;
    border: 1px solid var(--fg-color);
    border-radius: 1em;
    background-color: var(--bg-toggle-inactive-color);
    transition: background-color var(--transition-duration) var(--transition-function);
  }
  span::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 0.25em;
    width: 1em;
    height: 1em;
    background-color: var(--bg-color-secondary);
    border: 1px solid var(--fg-color);
    border-radius: 50%;
    transform: translate(0em, -50%);
    transition: transform var(--transition-duration) var(--transition-function);
  }
  .input:checked ~ span::after {
    transform: translate(1.7em, -50%);
    background-color: var(--fg-color);
  }
  .input:focus ~ span,
  .input:not([disabled]):hover ~ span {
    background-color: var(--bg-toggle-active-color);
  }
</style>
