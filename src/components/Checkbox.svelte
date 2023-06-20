<div class="checkbox {selected && 'selected'}" on:click={onClick}>
  <div class="container">
    {#if !partial}
      <Icon>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>check</title><path d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z" /></svg>
      </Icon>
    {:else}
      <Icon>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>minus</title><path d="M19,13H5V11H19V13Z" /></svg>
      </Icon>
    {/if}
  </div>
</div>

<script lang="ts">
// Imports
import { createEventDispatcher } from "svelte";
const dispatch = createEventDispatcher();

// Components
import Icon from "@/components/Icon.svelte";

// Props
export var selected: boolean = false;
export var manual: boolean = false;
export var partial: boolean = false;

// Functions
function onClick() {
    if (!manual) {
        selected = !selected;
    }

    dispatch("click");
}
</script>

<style lang="scss">
@import "../mdl/dp";
@import "../mdl/state-layer";

.checkbox {
    height: dp(40);
    width: dp(40);

    display: grid;
    place-items: center;

    border-radius: var(--md-sys-shape-corner-full);
    cursor: pointer;
    transition: var(--md-sys-motion-duration-short4) var(--md-sys-motion-easing-standard) all;

    &:hover {
        background-color: hover-state-layer-lighten(--md-sys-color-on-surface);
    }

    .container {
        height: dp(18);
        width: dp(18);

        box-sizing: border-box;

        border: dp(2) solid var(--md-sys-color-on-surface);
        border-radius: dp(2);
        transition: inherit;

        & > :global(.icon) {
            font-size: dp(18);

            transition: inherit;

            :global(svg) {
                position: relative;
                top: dp(-2);
                left: dp(-2);

                color: var(--md-sys-color-on-primary);
                transition: inherit;
                opacity: 0;
            }
        }
    }

    &.selected {
        .container {
            background-color: var(--md-sys-color-primary);
            border-color: var(--md-sys-color-primary);

            & > :global(.icon) {
                :global(svg) {
                    opacity: 1;
                }
            }
        }

        &:hover {
            background-color: hover-state-layer-lighten(--md-sys-color-primary);
        }
    }
}

</style>
