<script>
  import { onMount } from 'svelte';
  import { stores } from '@sapper/app';

  let html, checked;

  function updatePreferred() {
    localStorage.setItem('theme', checked ? 'dark' : 'light');
  }
  function checkButton(state) {
    checked = state;
    if (checked) {
      html.classList.add('dark');
      html.classList.remove('light');
    } else {
      html.classList.remove('dark');
      html.classList.add('light');
    }
    updatePreferred();
  }
  function getPreference() {
    const stored = localStorage.getItem('theme');
    if (stored) return stored;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  onMount(() => {
    html = document.querySelector('html');
    checkButton(getPreference() === 'dark');
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
    transition: background-color 200ms cubic-bezier(0.4, 0, 0.2, 1);
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
    transition: transform 200ms cubic-bezier(0.4, 0, 0.2, 1);
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
