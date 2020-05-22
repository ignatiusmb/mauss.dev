<script>
  export let segment, filename;
  import Link from './independent/Link.svelte';
  import Icon from './independent/Icon.svelte';
  let link = 'https://github.com/ignatiusmb/imbagus/edit/master';
</script>

<span>
  <Link href="{link}/{segment}/{filename}">
    Edit
    <Icon name="edit" size={15} />
  </Link>
</span>

<style>
  span :global(a) {
    display: flex;
    align-items: center;
  }
  span :global(a :last-child) {
    margin-left: 0.25em;
  }
</style>
