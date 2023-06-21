<div
  class="
    inputWrapper
    {padding && 'padding'}
    {pointer && 'pointer'}
    {focus && 'focus'}
    {active && 'active'}
  "
  on:click
>
  <slot {id} />
  <label for={id}>{label}</label>
</div>

<script lang="ts">
// Props
export var focus = false;
export var active = true;
export var label: string;
export var padding = false;
export var pointer = false;

// Data
const id = String(Math.random());
</script>

<style lang="scss">
@import "../mdl/dp";
@import "../mdl/typescale";

.inputWrapper {
    width: 100%;

    margin: dp(1);
    position: relative;
    box-sizing: border-box;

    border-radius: var(--md-sys-shape-corner-extra-small);
    color: var(--md-sys-color-on-surface);
    font-weight: bold;
    border: dp(1) solid var(--md-sys-color-outline);
    background-color: inherit;

    @include use-scale(body-large);

    &.padding {
        padding: 0.75em;
    }

    &.pointer {
        cursor: pointer;
    }

    label {
        position: absolute;
        padding: 0 dp(4);
        left: dp(16);
        top: dp(12);

        transition: all var(--md-sys-motion-duration-short3) var(--md-sys-motion-easing-standard);
        background-color: inherit;
        cursor: text;
        color: var(--md-sys-color-on-surface-variant);

        @include use-scale(body-large);
    }

    &.active {
        label {
            left: dp(12);
            top: dp(-8);

            @include use-scale(body-small);
        }
    }

    &.focus {
        margin: 0;

        border-color: var(--md-sys-color-primary);
        border-width: dp(2);

        label {
            color: var(--md-sys-color-primary);
        }
    }
}

</style>
