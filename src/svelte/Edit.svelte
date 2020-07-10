<script>
  export let path;
  import Link from './Link.svelte';
  import Icon from './Icon.svelte';
  const link = 'https://github.com/ignatiusmb/mauss/edit/master';
</script>

<span>
  <Link href="{link}/{path}" invert>
    Edit
    <Icon name="edit" size={17} />
  </Link>
</span>

<style>
  span :global(a) {
    display: inline-flex;
    align-items: center;
  }
  span :global(a :last-child) {
    margin-left: 0.25em;
  }
</style>
