<script>
  export let name;
  export let size = 24;
</script>

<svg width={size} height={size}>
  <use href="#{name}" />
</svg>

<style>
  svg {
    position: relative;
    overflow: hidden;
    vertical-align: middle;
    -o-object-fit: contain;
    object-fit: contain;
    -webkit-transform-origin: center center;
    transform-origin: center center;
    stroke: currentColor;
    stroke-width: 2;
    stroke-linecap: round;
    stroke-linejoin: round;
    fill: none;
  }
</style>
