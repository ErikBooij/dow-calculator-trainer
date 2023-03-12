export const store = <T>(key: string, item: T): T => {
    window.localStorage.setItem(key, JSON.stringify(item));

    return item;
}

export function fetch<T>(key: string): (T | null);
export function fetch<T>(key: string, defaultValue: T): T;
export function fetch<T>(key: string, defaultValue?: T): T | null {
    const item = window.localStorage.getItem(key);

    if (item === '' || item === null) {
        return defaultValue !== undefined
            ? defaultValue
            : null;
    }

    try {
        const parsed = JSON.parse(item);

        return parsed as T;
    } catch (e) {
        console.error(`Found unparsable entry for key ${ key } in localstorage: ${ item }`);

        return defaultValue !== undefined
            ? defaultValue
            : null;
    }
}
