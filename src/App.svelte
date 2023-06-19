<main>
  <Card>
    <Button icon>
      <LoginIcon />
      Login using Spotify
    </Button>
  </Card>
</main>

<script lang="ts">

import Button from "@/components/Button.svelte";
import Card from "@/components/Card.svelte";
import LoginIcon from "@/components/icons/LoginIcon.svelte";
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap');

@import "mdl/tokens";
@import "mdl/color";
@import "mdl/typescale";
@import "mdl/corner";

:global(html), :global(body) {
    height: 100%;
    width: 100%;

    padding: 0;
    margin: 0;

    overflow: hidden;
}

main {
    @include create-color-variables($color-tokens);
    @include create-typescale-variables($typescale-tokens);
    @include light-theme;
    @include corner-tokens;

    height: 100%;
    width: 100%;

    display: grid;
    place-items: center;

    background-color: var(--md-sys-color-background);

    &:global(.dark) {
        @include dark-theme;

        background-color: var(--md-sys-color-background);
    }
}


</style>
