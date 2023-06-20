{#if error !== null}
  <div class="errorContent">
    <div>
      <h3>Something went wrong</h3>
      <p>{error.message}</p>
    </div>
  </div>
{:else if !loading}
  <slot />
{:else}
  <div class="loadingContent">
    <div class="spinner"></div>
  </div>
{/if}

<script lang="ts">
// Props
export var promise: Promise<unknown> | null | undefined;

// Data
let error: Error | null = null;
let loading = !!promise;

// Computed
$: handlePromise(promise);

// Functions
function handlePromise(promise: Promise<unknown> | null | undefined) {
    if (!promise) {
        return;
    }

    loading = true;

    promise
        .catch(e => {
            error = e;
        })
        .finally(() => {
            loading = false;
        })
}
</script>

<style lang="scss">

.loadingContent {
    width: 100%;
    height: 100%;
    min-height: 100px;

    display: grid;
    place-items: center;

    .spinner {
        --size: 1em;
        width: var(--size);
        height: var(--size);

        display: inline-block;

        text-align: center;
        border: 3px solid transparent;
        border-top-color: inherit;
        border-radius: 1000px;
        animation: spinner 300ms infinite linear;
    }
}

.errorContent {
    min-height: 100px;

    display: grid;
    place-items: center;

    background-color: var(--error-color);
    //color: var(--text-on-error);
    border-radius: var(--border-radius-medium);

    p {
        margin: 0;
    }
}

@keyframes spinner {
    from {
        transform: rotate(0deg);
    }

    to {
        transform: rotate(360deg);
    }
}

</style>
