<main>
  <Card>
    <AsyncContent {promise}>
      <VSpace>
        {#if isLoggedIn}
          {#if selectedPlaylist === null}
            <h1>Select playlist</h1>

            <div class="playlists">
              {#each playlists as playlist}
                <ListItem
                  headline={playlist.name}
                  supporting="{playlist.public ? 'Public' : 'Private'} playlist"
                  clickable
                  on:click={() => selectedPlaylist = playlist}
                >
                  <img src={playlist.images[0]?.url} alt="" slot="image" />
                  <MenuRightIcon slot="tailing" />
                </ListItem>
              {/each}

              {#if !playlistsDone}
                <HCenter>
                  <AsyncButton asyncClick={next} text icon>
                    <LoadMoreIcon />
                    Load more
                  </AsyncButton>
                </HCenter>
              {/if}
            </div>

            <Button on:click={logout} text icon>
              <LogoutIcon />
              Logout
            </Button>
          {:else}
            <h1>Sort playlist</h1>

            <div>
              <RadioGroup bind:value={selectedSorting}>
                <ListItem
                  headline="Contributor in order"
                  supporting="Uses contributors to order one after the other"
                >
                  <RadioButton value={SortMethod.IN_ORDER} slot="tailing" />
                </ListItem>
                <ListItem
                  headline="Contributors in groups"
                  supporting="Uses contributors to order in groups"
                >
                  <RadioButton value={SortMethod.GROUPS} slot="tailing" />
                </ListItem>
              </RadioGroup>
            </div>

            <Textfield label="Seed (optional)" type="number" bind:value={seed} />

            <HSpace full>
              <Button on:click={() => selectedPlaylist = null} icon text>
                <ArrowBackIcon />
                Other playlist
              </Button>

              <AsyncButton asyncClick={sort} icon disabled={selectedSorting === undefined}>
                <SortIcon />
                Sort playlist
              </AsyncButton>
            </HSpace>
          {/if}
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
import SpotifyPlaylistController, { SortMethod } from "@/ts/classes/SpotifyPlaylistController";
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
import RadioButton from "@/components/RadioButton.svelte";
import RadioGroup from "@/components/RadioGroup.svelte";
import SortIcon from "@/components/icons/SortIcon.svelte";
import Textfield from "@/components/Textfield.svelte";

// Data
const spotifyUser = new SpotifyUser(
    "6058a0486b3a48858fd7becd3154839d",
    new LocalTokenStorage()
);

const spotifyPlaylistController = new SpotifyPlaylistController(spotifyUser);
let isLoggedIn = false;
let playlists: SpotifyPlaylistResponse[] = [];
let playlistsDone = false;
let selectedPlaylist: SpotifyPlaylistResponse = null;
let selectedSorting = undefined;
let seed = 123;

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
    playlistsDone = spotifyPlaylistController.done();

    playlists = [
        ...playlists,
        ...nextPlaylists,
    ];
}

async function sort() {
    await spotifyPlaylistController.sort(selectedPlaylist, selectedSorting, seed);
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
