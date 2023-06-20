<div class="listItem {clickable && 'clickable'}" on:click>
  <div class="start">
    {#if $$slots.image}
      <div class="image">
        <slot name="image" />
      </div>
    {/if}

    <div class="text">
      <p class="headline">{headline}</p>

      {#if supporting !== undefined}
        <p class="supporting">{supporting}</p>
      {/if}
    </div>
  </div>

  {#if $$slots.tailingIcon}
    <div class="tailingIcon">
      <slot name="tailingIcon" />
    </div>
  {/if}
</div>

<script lang="ts">
// Props
export var headline: string;
export var supporting: string | undefined;
export var clickable: boolean = false;
</script>

<style lang="scss">
@import "../mdl/dp";
@import "../mdl/typescale";
@import "../mdl/state-layer";

.listItem {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    gap: dp(16);
    padding: dp(8) dp(24) dp(8) dp(16);

    background-color: var(--md-sys-color-surface);

    .start {
        display: flex;
        flex-direction: row;
        gap: dp(16);

        .image :global(img) {
            height: dp(56);
            width: dp(56);
        }

        .text {
            display: flex;
            flex-direction: column;
            justify-content: center;

            .headline {
                margin: 0;

                @include use-scale(body-large);
            }

            .supporting {
                margin: 0;

                @include use-scale(body-medium);
            }
        }
    }

    .tailingIcon {
        display: grid;
        place-items: center;

        :global(.icon) {
            font-size: dp(24);
            color: var(--md-sys-color-on-surface-variant);
        }
    }

    &.clickable {
        cursor: pointer;

        &:hover {
            background-color: hover-state-layer-lighten(--md-sys-color-on-surface);
        }
    }

    & + :global(.listItem) {
        border-top: dp(1) solid var(--md-sys-color-surface-variant);
    }
}

</style>
