export function getIdFromUrl(url) {
    const parts = url.split('/');
    const lastPart = parts[parts.length - 2];
    return lastPart;
}
