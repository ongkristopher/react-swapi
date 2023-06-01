export function mutateObject(data, isWookiee) {
    let mutatedData = typeof data === 'string' ? data : JSON.stringify(data);

    if (isWookiee) {
        mutatedData = mutatedData.replace(/whhuanan/g, '""');
        mutatedData = mutatedData.replaceAll('\\rc\\wh', '\\r\\n');
    } else {
        mutatedData = mutatedData.replace(null, '""');
    }

    return JSON.parse(mutatedData);
}
