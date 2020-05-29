<script>
  export let segment, filename;
  import LinkExt from './independent/LinkExt.svelte';
  import Icon from './independent/Icon.svelte';
  let link = 'https://github.com/ignatiusmb/mauss/edit/master';
</script>

<span>
  <LinkExt href="{link}/{segment}/{filename}">
    Edit
    <Icon name="edit" size={15} />
  </LinkExt>
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
