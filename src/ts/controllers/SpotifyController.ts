const AVAILABLE_CHARACTERS: string = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789_.-~";

export default class SpotifyController {
    private async generateVerifier(length = 128) {
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

    private async sha256(string) {
        let buffer = new TextEncoder().encode(string);
        return await crypto.subtle.digest("SHA-256", buffer);
    }

    private base64uriEncode(encoded) {
        return btoa(String.fromCharCode.apply(null, new Uint8Array(encoded)))
            .replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
    }
}
