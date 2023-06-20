<div class="{right && 'right'} {full && 'full'}">
  <slot />
</div>

<script lang="ts">
// Props
export var right = false;
export var full = false;
</script>

<style lang="scss">

div {
    display: flex;
    flex-direction: row;
    gap: 1em;

    &.right {
        justify-content: right;
    }

    &.full > :global(*) {
        width: 100%;
    }
}

</style>
