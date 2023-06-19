<div class="card {minimal && 'minimal'} {disappearCompact && 'disappearCompact'} {outlineCompact && 'outlineCompact'} {outline && 'outline'}">
  <slot />
</div>

<script lang="ts">
// Props
export var minimal = false;
export var outline = false;
export var outlineCompact = false;
export var disappearCompact = false;
</script>

<style lang="scss">
@import "../mdl/dp";
@import "../mdl/breakpoints";

.card {
    padding: 2em;
    box-sizing: border-box;

    background-color: var(--md-sys-color-surface-container-low);
    color: var(--md-sys-color-on-surface);
    filter: drop-shadow(0 0 9px rgba(0, 0, 0, 0.1));
    //box-shadow: 0 0 9px rgba(0, 0, 0, 0.1);
    border-radius: var(--md-sys-shape-corner-medium);

    &.minimal {
        padding: 0;
    }

    &.outline {
        filter: none;
        background-color: var(--md-sys-color-surface);
        border: dp(1) solid var(--md-sys-color-outline);
    }
}

@media only screen and (max-width: $compact-breakpoint){
    .card.disappearCompact {
        display: contents;
    }

    // TODO this should be done in a different way
    .card.outlineCompact {
        filter: none;
        background-color: var(--md-sys-color-surface);
        border: dp(1) solid var(--md-sys-color-outline);
    }
}

</style>
