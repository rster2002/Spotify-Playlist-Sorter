import type TokenStorage from "@/ts/interfaces/TokenStorage";

const AVAILABLE_CHARACTERS: string = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789_.-~";

export default class SpotifyUser {
    private readonly clientId: string;
    private readonly storage: TokenStorage;

    constructor(clientId: string, storage: TokenStorage) {
        this.clientId = clientId;
        this.storage = storage;
    }


    private async generateVerifier(length = 128): Promise<string> {
        let array = new Uint32Array(length);
        crypto.getRandomValues(array);

        let verifier = "";
        for (let i = 0; i < length; i++) {
            let randomValue = array[i];
            let index = randomValue % AVAILABLE_CHARACTERS.length;

            verifier += AVAILABLE_CHARACTERS[index];
        }

        return verifier;
    }

    private async sha256(string): Promise<ArrayBuffer> {
        let buffer = new TextEncoder().encode(string);
        return await crypto.subtle.digest("SHA-256", buffer);
    }

    private base64uriEncode(encoded): string {
        return btoa(String.fromCharCode.apply(null, new Uint8Array(encoded)))
            .replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
    }

    private createFormBody(params: { [key: string]: string | number } = {}): string {
        return Object.entries(params)
            .map(([key, value]) => {
                return `${encodeURIComponent(key)}=${encodeURIComponent(value)}`;
            })
            .join("&");
    }

    async performLogin(): Promise<void> {
        let verifier = await this.generateVerifier();
        let challenge = this.base64uriEncode(await this.sha256(verifier));

        let searchParams = new URLSearchParams();
        searchParams.set("client_id", this.clientId);
        searchParams.set("response_type", "code");
        searchParams.set("response_type", "code");
        searchParams.set("redirect_uri", location.origin);
        searchParams.set("code_challenge_method", "S256");
        searchParams.set("state", "auth");
        searchParams.set("scope", [
            "playlist-modify-public",
            "playlist-modify-private",
            "playlist-read-private",
            "playlist-read-collaborative",
        ].join(" "));
        searchParams.set("code_challenge", challenge);

        let redirectUrl = "https://accounts.spotify.com/authorize?" + searchParams.toString();

        sessionStorage.setItem("::spotifyReturn", location.href);
        sessionStorage.setItem("::spotifyVerifier", verifier);

        location.href = redirectUrl;
    }

    async finalizeLogin(): Promise<void> {
        if (this.storage.get("user") === "undefined") {
            this.logout();
        }

        let query = new URLSearchParams(location.search);
        let code = query.get("code");
        let state = query.get("state");

        if (state !== "auth") return;

        await this.exchangeCode(code);
    }

    private async exchangeCode(code: string): Promise<void> {
        let clientId = this.clientId;

        let formBody = this.createFormBody({
            client_id: clientId,
            grant_type: "authorization_code",
            code,
            redirect_uri: location.origin,
            code_verifier: sessionStorage.getItem("::spotifyVerifier"),
        });

        let response = await fetch("https://accounts.spotify.com/api/token", {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            body: formBody
        })
            .then(r => r.json());

        let returnLocation = sessionStorage.getItem("::spotifyReturn");

        sessionStorage.removeItem("::spotifyReturn");
        sessionStorage.removeItem("::spotifyVerifier");

        this.storage.set("user", response.access_token);
        this.storage.set("refresh", response.refresh_token);
        this.storage.set("grant-time", Date.now().toString());

        location.href = returnLocation;
    }

    async refreshToken(): Promise<string> {
        const threshold = 15 * 60 * 1000; // 15 minutes in milliseconds

        let lastGrantTimestamp = Number(this.storage.get("grant-time"));
        let now = Date.now();

        if (now - lastGrantTimestamp < threshold) {
            return this.storage.get("user");
        }

        let formBody = this.createFormBody({
            grant_type: "refresh_token",
            refresh_token: this.storage.get("refresh"),
            client_id: this.clientId,
        });

        let response = await fetch("https://accounts.spotify.com/api/token", {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            body: formBody
        })
            .then(r => r.json());

        this.storage.set("user", response.access_token);
        this.storage.set("refresh", response.refresh_token);
        this.storage.set("grant-time", Date.now().toString());

        return response.access_token;
    }

    isLoggedIn(): boolean {
        return this.storage.get("user") !== null && this.storage.get("refresh") !== null;
    }

    logout() {
        this.storage.remove("user");
        this.storage.remove("refresh");
        this.storage.remove("grant-time");

        location.reload();
    }

    async fetch(url: RequestInfo | URL, init?: RequestInit) {
        if (init === undefined) {
            init = {};
        }

        if (init.headers === undefined) {
            init.headers = {};
        }

        if (init.headers["Authorization"] === undefined) {
            let accessToken = await this.refreshToken();
            init.headers["Authorization"] = `Bearer ${accessToken}`;
        }

        return await fetch(url, init);
    }
}
