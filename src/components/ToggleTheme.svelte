<script>
  import { onMount } from 'svelte';

  let html, checked;

  function check() {
    checked = !checked;
    if (checked) {
      html.classList.add('dark');
      html.classList.remove('light');
      localStorage.setItem('theme', 'dark');
    } else {
      html.classList.remove('dark');
      html.classList.add('light');
      localStorage.setItem('theme', 'light');
    }
  }

  onMount(() => {
    const storedTheme = localStorage.getItem('theme');
    checked = storedTheme === 'dark' ? true : false;
    let theme = storedTheme ? storedTheme : undefined;
    for (const scheme of ['dark', 'light', 'no-preference']) {
      if (window.matchMedia(`(prefers-color-scheme: ${scheme})`).matches) {
        theme = storedTheme ? storedTheme : scheme;
      }
    }

    html = document.querySelector('html');
    if (theme === 'dark') {
      checked = true;
      html.classList.add('dark');
      html.classList.remove('light');
    } else if (theme === 'light') {
      checked = false;
      html.classList.remove('dark');
      html.classList.add('light');
    }
  });
</script>

<label>
  <input on:click={check} bind:checked class="input" type="checkbox" />
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
    background-color: var(--bg-card-color);
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
