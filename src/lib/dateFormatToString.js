export function dateFormatToString(date) {
    var options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(date).toLocaleDateString([], options);
}
