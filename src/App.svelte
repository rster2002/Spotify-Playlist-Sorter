<main class="dark">
  <Card>
    <AsyncContent {promise}>
      <VSpace>
        {#if isLoggedIn}
          {#if selectedPlaylist === null}
            <h1>Select playlist</h1>

            <Checkbox />

            <div class="playlists">
              {#each playlists as playlist}
                <ListItem
                  headline={playlist.name}
                  supporting="{playlist.public ? 'Public' : 'Private'} playlist"
                  clickable
                  on:click={() => selectedPlaylist = playlist}
                >
                  <img src={playlist.images[0]?.url} alt="" slot="image" />
                  <MenuRightIcon slot="tailingIcon" />
                </ListItem>
              {/each}

              <HCenter>
                <AsyncButton asyncClick={next} text icon>
                  <LoadMoreIcon />
                  Load more
                </AsyncButton>
              </HCenter>
            </div>
          {:else}
            <h1>Sort playlist</h1>
          {/if}

          <HSpace>
            {#if selectedPlaylist !== null}
              <Button on:click={() => selectedPlaylist = null} text>
                <ArrowBackIcon />
                Other playlist
              </Button>
            {/if}

            <Button on:click={logout} text icon>
              <LogoutIcon />
              Logout
            </Button>
          </HSpace>
        {:else}
          <AsyncButton asyncClick={login} icon>
            <LoginIcon />
            Login using Spotify
          </AsyncButton>
        {/if}
      </VSpace>
    </AsyncContent>
  </Card>
</main>

<script lang="ts">
// Imports
import SpotifyUser from "@/ts/classes/SpotifyUser";

// Components
import Card from "@/components/Card.svelte";
import LoginIcon from "@/components/icons/LoginIcon.svelte";
import AsyncButton from "@/components/AsyncButton.svelte";
import LocalTokenStorage from "@/ts/classes/LocalTokenStorage";
import AsyncContent from "@/components/AsyncContent.svelte";
import type { SpotifyPlaylistResponse } from "@/ts/classes/SpotifyPlaylistController";
import SpotifyPlaylistController from "@/ts/classes/SpotifyPlaylistController";
import ListItem from "@/components/ListItem.svelte";
import LoadMoreIcon from "@/components/icons/LoadMoreIcon.svelte";
import HCenter from "@/components/layouts/HCenter.svelte";
import Button from "@/components/Button.svelte";
import LogoutIcon from "@/components/icons/LogoutIcon.svelte";
import HeartIcon from "@/components/icons/HeartIcon.svelte";
import MenuRightIcon from "@/components/icons/MenuRightIcon.svelte";
import ArrowBackIcon from "@/components/icons/ArrowBackIcon.svelte";
import HSpace from "@/components/layouts/HSpace.svelte";
import VSpace from "@/components/layouts/VSpace.svelte";
import Checkbox from "@/components/Checkbox.svelte";

// Data
const spotifyUser = new SpotifyUser(
    "6058a0486b3a48858fd7becd3154839d",
    new LocalTokenStorage()
);

const spotifyPlaylistController = new SpotifyPlaylistController(spotifyUser);
let isLoggedIn = false;
let playlists: SpotifyPlaylistResponse[] = [];
let selectedPlaylist: SpotifyPlaylistResponse = null;

// Functions
async function login() {
    await spotifyUser.performLogin();
}

async function refresh() {
    await spotifyUser.finalizeLogin();
    isLoggedIn = spotifyUser.isLoggedIn();

    if (isLoggedIn) {
        playlists = await spotifyPlaylistController.getAll();
        console.log(playlists)
    }
}

async function next() {
    let nextPlaylists = await spotifyPlaylistController.next();

    playlists = [
        ...playlists,
        ...nextPlaylists,
    ];
}

function logout() {
    spotifyUser.logout();
}

const promise = refresh();
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap');

@import "mdl/tokens";
@import "mdl/color";
@import "mdl/typescale";
@import "mdl/corner";
@import "mdl/easing";

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
    @include easing-tokens;

    height: 100%;
    width: 100%;

    display: grid;
    place-items: center;

    background-color: var(--md-sys-color-background);

    &:global(.dark) {
        @include dark-theme;

        color-scheme: dark;

        background-color: var(--md-sys-color-background);
    }

    & > :global(.card) {
        width: 100%;
        max-width: dp(520);
    }

    h1 {
        @include use-scale(title-large);
    }

    .playlists {
        max-height: dp(540);
        overflow-y: auto;
    }
}


</style>
