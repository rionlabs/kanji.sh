import * as fs from 'fs';
import { PathLike } from 'fs';

const removeKvgAttrs = (line: string): string => {
    const regExs = [
        /kvg:element=".*"\s/gu,
        /kvg:variant=".*"\s/gu,
        /kvg:partial=".*"\s/gu,
        /kvg:original=".*"\s/gu,
        /kvg:part=".*"\s/gu,
        /kvg:number=".*"\s/gu,
        /kvg:tradForm=".*"\s/gu,
        /kvg:radicalForm=".*"\s/gu,
        /kvg:position=".*"\s/gu,
        /kvg:radical=".*"\s/gu,
        /kvg:phon=".*"\s/gu,
        /kvg:type=".*"\s/gu
    ];
    for (const regEx of regExs) {
        while (line.search(regEx) !== -1) line = line.replace(regEx, '');
    }

    // Worst coding example, caused due to lack of RegEx
    const endRegExs = [
        /kvg:element=".*">/gu,
        /kvg:variant=".*">/gu,
        /kvg:partial=".*">/gu,
        /kvg:original=".*">/gu,
        /kvg:part=".*">/gu,
        /kvg:number=".*">/gu,
        /kvg:tradForm=".*">/gu,
        /kvg:radicalForm=".*">/gu,
        /kvg:position=".*">/gu,
        /kvg:radical=".*">/gu,
        /kvg:phon=".*">/gu,
        /kvg:type=".*">/gu
    ];

    for (const regEx of endRegExs) {
        while (line.search(regEx) !== -1) {
            line = line.replace(regEx, '>');
        }
    }

    return line;
};

const increaseSize = (line: string): string =>
    line.replace('width="109" height="109"', 'width="512" height="512"');

export const rewriteWithSvgOptimizations = async (
    inputFilePath: PathLike,
    outputFilePath: PathLike
): Promise<void> => {
    const content = fs.readFileSync(inputFilePath, { encoding: 'utf-8', flag: 'r' });
    const lines = content.split('\n').filter(Boolean);
    const newLines = [];
    for (let i = 0; i < lines.length; i++) {
        // Common optimizations for both kanji styles
        if (lines[i].startsWith('<!--')) {
            // Skip till end of commend is found
            while (!lines[i].endsWith('-->')) {
                i++;
            }
            continue;
        }
        if (lines[i].startsWith('<!DOCTYPE')) {
            // Skip DOCTYPE
            while (!lines[i].endsWith(']>')) {
                i++;
            }
            continue;
        }
        newLines.push(increaseSize(removeKvgAttrs(lines[i])));
    }
    // Write optimized one
    await fs.writeFileSync(outputFilePath, newLines.join('\n'), { flag: 'w+' });
};
