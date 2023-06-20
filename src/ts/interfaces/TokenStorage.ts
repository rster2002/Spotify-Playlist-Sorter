export default interface TokenStorage {
    set(key: string, value: string): void;
    get(key: string): string;
    exists(key: string): boolean;
    remove(key: string): void;
}
