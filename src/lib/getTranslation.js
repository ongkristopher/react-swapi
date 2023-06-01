import translationFile from 'assets/tranlationFile';
export function getTranslation(index, isWookiee) {
    return isWookiee ? translationFile[index] : index;
}
