<Button
  on:click={click}
  {outline}
  {text}
  {icon}
  {disabled}
>
  {#if !loading}
    <slot />
  {:else}
    <Spinner />
  {/if}
</Button>

<script lang="ts">
// Components
import Button from "@/components/Button.svelte";
import Spinner from "@/components/Spinner.svelte";

// Props
export var asyncClick: <T>() => Promise<T>;
export var outline = false;
export var text = false;
export var icon = false;
export var disabled = false;

// Data
let loading = false;

// Functions
function click() {
    loading = true;
    asyncClick()
        .finally(() => (loading = false));
}
</script>
