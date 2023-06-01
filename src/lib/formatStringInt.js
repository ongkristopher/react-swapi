export function formatStringInt(stringInt) {
    const integer = parseInt(stringInt);
    return isNaN(integer) ? stringInt : integer.toLocaleString();
}
