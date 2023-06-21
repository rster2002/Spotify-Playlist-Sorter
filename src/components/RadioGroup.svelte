<slot />

<script lang="ts">
// Imports
import { setContext, onDestroy } from "svelte";
import { writable } from "svelte/store";

// Props
export var value: unknown;

// Data
let currentValue = writable(value);

// Computed
$: $currentValue = value;

setContext("radioGroup", currentValue);

const unsubscribe = currentValue.subscribe(newValue => {
    if (newValue !== value) {
        value = $currentValue;
    }
});

onDestroy(unsubscribe);
</script>
