<div class="target" on:click={onClick}>
  <div class="radioButton {selected && 'selected'}">
    <div class="container">
      <div class="tick"></div>
    </div>
  </div>
</div>

<script lang="ts">
// Imports
import { getContext } from "svelte";

// Props
export var value: unknown;

// Data
let groupValue = getContext("radioGroup");

// Computed
$: selected = $groupValue === value;

// Functions
function onClick() {
    $groupValue = value;
}
</script>

<style lang="scss">
@import "../mdl/dp";
@import "../mdl/state-layer";

.target {
    height: dp(48);
    width: dp(48);

    display: grid;
    place-items: center;
}

.radioButton {
    height: dp(40);
    width: dp(40);

    display: grid;
    place-items: center;

    cursor: pointer;
    border-radius: var(--md-sys-shape-corner-full);
    transition: var(--md-sys-motion-duration-short4) var(--md-sys-motion-easing-standard) all;

    &:hover {
        background-color: hover-state-layer-lighten(--md-sys-color-on-surface);
    }

    .container {
        height: dp(18);
        width: dp(18);

        display: grid;
        place-items: center;
        box-sizing: border-box;

        border: dp(2) solid var(--md-sys-color-on-surface);
        border-radius: var(--md-sys-shape-corner-full);
        transition: inherit;

        .tick {
            height: dp(8);
            width: dp(8);

            border-radius: var(--md-sys-shape-corner-full);
            color: var(--md-sys-color-on-primary);
            background-color: var(--md-sys-color-primary);

            transform: scale(0);
            transition: inherit;
        }
    }

    &.selected {
        .container {
            border-color: var(--md-sys-color-primary);

            .tick {
                transform: scale(1);
            }
        }

        &:hover {
            background-color: hover-state-layer-lighten(--md-sys-color-primary);
        }
    }
}

</style>
