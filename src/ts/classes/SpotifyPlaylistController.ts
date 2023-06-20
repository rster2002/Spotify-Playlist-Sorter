import type SpotifyUser from "@/ts/classes/SpotifyUser";

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

interface SpotifyListResponse<T> {
    href: string;
    limit: number;
    next: string;
    offset: number;
    previous: string;
    total: number;
    items: T[];
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
}
