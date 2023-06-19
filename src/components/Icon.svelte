<div class="icon">
  <slot />
</div>

<style lang="scss">

.icon {
    display: contents;

    & > :global(svg) {
        height: 1em;
        width: 1em;

        & > :global(path) {
            fill: currentColor;
        }
    }
}

</style>
