export class LocalStorageManager {
  static set(key: string, value: any) {
    if (typeof window === "undefined") return;
    window.localStorage.setItem(key, JSON.stringify(value));
  }

  static get<T>(key: string): T | null {
    if (typeof window === "undefined") return null;
    const item = window.localStorage.getItem(key);
    return item ? (JSON.parse(item) as T) : null;
  }

  static remove(key: string) {
    if (typeof window === "undefined") return;
    window.localStorage.removeItem(key);
  }
}
