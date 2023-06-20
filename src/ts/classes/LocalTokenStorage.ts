import type TokenStorage from "@/ts/interfaces/TokenStorage";

export default class LocalTokenStorage implements TokenStorage {
    set(key: string, value: string) {
        localStorage.setItem(`::${key}`, value);
    }

    get(key: string): string | null {
        return localStorage.getItem(`::${key}`) ?? null;
    }

    exists(key: string): boolean {
        return this.get(key) !== null;
    }

    remove(key: string) {
        localStorage.removeItem(`::${key}`);
    }
}
