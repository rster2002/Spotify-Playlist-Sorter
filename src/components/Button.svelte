<button
  class="
    {icon && 'icon'}
    {secondary && 'secondary'}
    {outline && 'outline'}
    {text && 'text'}
  "
  on:click
  bind:this={el}
  {disabled}
>
  <slot />
</button>

<script lang="ts">
// Imports
import { onMount } from "svelte";

// Props
export var icon = false;
export var secondary = false;
export var outline = false;
export var text = false;
export var disabled = false;

// Data
let el: HTMLButtonElement;

onMount(() => {
    let style = getComputedStyle(el);
    el.style.minWidth = style.width;
    el.style.minHeight = style.height;
});
</script>

<style lang="scss">
@import "../mdl/dp";
@import "../mdl/typescale";
@import "../mdl/state-layer";

button {
    height: dp(40);
    padding: 0 dp(24);

    position: relative;
    border-radius: var(--md-sys-shape-corner-full);
    background-color: var(--md-sys-color-primary);
    color: var(--md-sys-color-on-primary);
    border: 0;
    box-sizing: border-box;
    cursor: pointer;
    transition: all 150ms var(--standard-easing);
    transition-property: color, background-color;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 1em;
    white-space: nowrap;

    @include use-scale(label-large);

    --spinner-color: var(--text-on-accent);

    &.icon {
        padding-left: dp(16);
    }

    &.secondary {
        background-color: transparent;
        color: var(--accent-color);
    }

    &.outline {
        background-color: transparent;
        color: var(--md-sys-color-primary);
        border: dp(1) solid var(--md-sys-color-outline);
    }

    &.text {
        background-color: transparent;
        color: var(--md-sys-color-primary);
    }

    &:hover {
        background-color: hover-state-layer-darken(--md-sys-color-primary);

        &.outline, &.text {
            background-color: hover-state-layer-lighten(--md-sys-color-primary);
        }
    }

    :global(svg) {
        font-size: 1.4em;
    }

    &.warning {
        --accent-color: var(--error-color);
    }
}

</style>
