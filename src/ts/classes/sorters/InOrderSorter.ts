import type SpotifyUser from "@/ts/classes/SpotifyUser";
import type { SpotifyPlaylistResponse } from "@/ts/classes/SpotifyPlaylistController";
import type SpotifyListResponse from "@/ts/interfaces/SpotifyListResponse";
import RandomUtils from "@/ts/classes/RandomUtils";
import SeededRandomGenerator from "@/ts/classes/SeededRandomGenerator";

export interface PlaylistItem {
    added_by: {
        id: string,
    },
    track: {
        uri: string,
    }
}

export default class InOrderSorter {
    constructor(
        private readonly user: SpotifyUser,
        private playlist: SpotifyPlaylistResponse,
        private readonly seed: number,
    ) {}

    public async sort() {
        let tracks: PlaylistItem[] = [];

        let nextUrl = `https://api.spotify.com/v1/playlists/${this.playlist.id}/tracks?limit=50`;
        while (true) {
            let response: SpotifyListResponse<PlaylistItem> = await this.user.fetch(nextUrl)
                .then(r => r.json());

            tracks = tracks.concat(response.items);

            if (response.next === null) {
                break;
            }

            nextUrl = response.next;
        }

        let tracksMap = new Map<String, PlaylistItem[]>();

        for (let i = 0; i < tracks.length; i++) {
            const track = tracks[i];

            if (!tracksMap.has(track.added_by.id)) {
                tracksMap.set(track.added_by.id, []);
            }

            let newValue = [
                ...tracksMap.get(track.added_by.id),
                track,
            ]
                .sort((a, b) => a.track.uri < b.track.uri ? 1 : -1);

            tracksMap.set(track.added_by.id, newValue);
        }

        let randomUtils = new RandomUtils(new SeededRandomGenerator(BigInt(this.seed)));
        let sorted: PlaylistItem[] = [];
        let shuffledCollaborators = randomUtils.shuffleArray(Array.from(tracksMap.keys()).sort());

        while (!Array.from(tracksMap.values()).every(i => i.length === 0)) {
            for (let collaboratorId of shuffledCollaborators) {
                let collaboratorTracks = tracksMap.get(collaboratorId);
                let index = randomUtils.randomIndexForArray(collaboratorTracks);

                if (index === null) {
                    continue;
                }

                let track = collaboratorTracks.splice(index, 1)[0];

                sorted.push(track);
            }
        }

        let uris = sorted.map(i => i.track.uri);

        await this.user.fetch(`https://api.spotify.com/v1/playlists/${this.playlist.id}/tracks`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                uris,
            })
        })
            .then(r => r.json());
    }
}
