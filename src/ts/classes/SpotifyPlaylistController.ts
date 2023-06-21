import type SpotifyUser from "@/ts/classes/SpotifyUser";
import InOrderSorter from "@/ts/classes/sorters/InOrderSorter";
import type SpotifyListResponse from "@/ts/interfaces/SpotifyListResponse";

export interface SpotifyPlaylistResponse {
    collaborative: boolean,
    description: string,
    external_urls: {
        spotify: string,
    },
    href: string,
    id: string,
    images: {
        url: string,
        height: number,
        width: number,
    }[],
    name: string,
    owner: {
        id: string,
        display_name: string,
    },
    public: boolean,
    snapshot_id: string,
}

export enum SortMethod {
    IN_ORDER = "inOrder",
    GROUPS = "groups"
}

export default class SpotifyPlaylistController {
    private readonly user: SpotifyUser;
    private lastResponse: SpotifyListResponse<SpotifyPlaylistResponse>;

    constructor(user: SpotifyUser) {
        this.user = user;
    }

    async getAll(): Promise<SpotifyPlaylistResponse[]> {
        let response: SpotifyListResponse<SpotifyPlaylistResponse> = await this.user.fetch("https://api.spotify.com/v1/me/playlists")
            .then(r => r.json());

        this.lastResponse = response;

        return response.items;
    }

    async next(): Promise<SpotifyPlaylistResponse[]> {
        let response: SpotifyListResponse<SpotifyPlaylistResponse> = await this.user.fetch(this.lastResponse.next)
            .then(r => r.json());

        this.lastResponse = response;

        return response.items;
    }

    done() {
        return this.lastResponse.next === null;
    }

    async sort(playlist: SpotifyPlaylistResponse, method: SortMethod, seed: number = 123) {
        if (method === SortMethod.IN_ORDER) {
            let sorter = new InOrderSorter(this.user, playlist, seed);
            await sorter.sort();
        }
    }
}
