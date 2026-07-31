/**
 * Convert millimeters to points.
 * @param mm
 */
export const mmToPt = (mm: number): number => (mm * 72) / 25.4;

/**
 * Get KanjiVG SVG file name for a given kanji character.
 * @param kanji
 */
export const getKanjiImageFileName = (kanji: string): string => {
    return `${kanji.charCodeAt(0).toString(16).padStart(5, '0')}.svg`;
};
