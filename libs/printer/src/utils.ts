import type { PathLike } from 'fs';
import fs from 'node:fs';

export const ensureDirectoriesExist = (...dirNames: PathLike[]): void => {
    for (const dirName of dirNames) {
        if (!fs.existsSync(dirName)) {
            fs.mkdirSync(dirName, { recursive: true });
        }
    }
};

export const readLinesInFile = (inputFilePath: PathLike): string[] => {
    const content = fs.readFileSync(inputFilePath, { encoding: 'utf-8', flag: 'r' });
    return content.split('\n').filter(Boolean);
};

export const isDirEmpty = (dirPath: PathLike): boolean => {
    const files = fs.readdirSync(dirPath);
    return files.length === 0;
};

class Logger {
    start: (message: string) => void = (message) => console.log(`[START] ${message}`);
    done: (message: string) => void = (message) => console.log(`[DONE✓] ${message}`);
    error: (message: string) => void = (message) => console.error(`[ERROR] ${message}`);
}

export const logger = new Logger();
