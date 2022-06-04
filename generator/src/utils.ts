import * as fs from 'fs';
import type { PathLike } from 'fs';
import { CollectionType } from '../../common/models';

export const ensureDirectoriesExist = (...dirNames: PathLike[]): void => {
    for (const dirName of dirNames) {
        fs.existsSync(dirName) || fs.mkdirSync(dirName, { recursive: true });
    }
};

export const readFile = (inputFilePath: PathLike): string[] => {
    const content = fs.readFileSync(inputFilePath, { encoding: 'utf-8', flag: 'r' });
    return content.split('\n').filter(Boolean);
};

export const writeFile = (outputFilePath: PathLike, content: string) => {
    fs.writeFileSync(outputFilePath, content, {encoding: 'utf-8', flag: 'w+'})
};

export const isDirEmpty = (dirPath: PathLike): boolean => {
    const files = fs.readdirSync(dirPath);
    return (files.length === 0)
};

export const generatePageTitle = (sourceName: CollectionType, sourceGroup: string): string => {
    switch (sourceName) {
        case CollectionType.FREQUENCY: // Grouping
            return `Frequency ${sourceGroup}`;
        case CollectionType.GRADE: // G1, G2, G3, ...
            return `Grade ${sourceGroup.charAt(1)}`;
        case CollectionType.JLPT: // N1, N2, N3, ...
            return `JLPT ${sourceGroup.toUpperCase()}`;
        case CollectionType.KANJIGARDEN: // Grouping
            return `KanjiGarden ${sourceGroup}`;
        case CollectionType.WANIKANI: // 1, 2, 3 ...
            return `Wanikani Level ${sourceGroup}`;
        default:
            throw TypeError('Unknown CollectionType');
    }
};

class Logger {
    start: (message: string) => void = (message) => console.log(`[START] ${message}`);
    done: (message: string) => void = (message) => console.log(`[DONE✓] ${message}`);
    error: (message: string) => void = (message) => console.error(`[ERROR] ${message}`);
}

export const logger = new Logger();
