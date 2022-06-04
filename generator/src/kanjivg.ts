import * as path from 'path';
import * as fs from 'fs';
import type { PathLike } from 'fs';
import { readdirSync } from 'fs';
import AdmZip from 'adm-zip';
import { Config } from './config';

import { ensureDirectoriesExist, logger, isDirEmpty } from './utils';

const _extractKanjiVG = async (): Promise<void> => {
    try {
        if (!isDirEmpty(Config.outKanjiVGDataPath)) {
            logger.done('KanjiVG already extracted');
        }
    } catch (error) {
        // NoOp
    }

    logger.start('Extracting KanjiVg file...');
    // TODO: Automate downloading latest version with GH Actions
    const kanjiVgFile = path.join(Config.assetsDirPath, 'kanjivg-20160426-main.zip');
    const zip = new AdmZip(kanjiVgFile);
    await zip.extractAllTo(Config.outKanjiVGDataPath, true);

    // The output is "kanji" directory. Move the contents to parent directory, & delete temp
    const tempDirectory = path.join(Config.outKanjiVGDataPath, 'kanji');
    for (const filename of readdirSync(tempDirectory)) {
        fs.copyFileSync(
            path.join(tempDirectory, filename),
            path.join(Config.outKanjiVGDataPath, filename)
        );
        fs.unlinkSync(path.join(tempDirectory, filename));
    }
    fs.rmdirSync(tempDirectory);

    logger.done('KanjiVG extraction');
};

const _runCommonOptimizations = async (): Promise<void> => {
    logger.start('Common optimizations');
    const filenames = fs.readdirSync(Config.outKanjiVGDataPath);
    const promises = [];
    for (const filename of filenames) {
        const inputFilePath = path.join(Config.outKanjiVGDataPath, filename);
        const outputFilePath = path.join(Config.outStrokePath, filename);
        promises.push(_rewriteWithSvgOptimizations(inputFilePath, outputFilePath));
    }
    await Promise.all(promises);
    logger.done('Common optimizations');
};

const _convertToTraces = async (): Promise<void> => {
    logger.start('Convert To Traces');
    const filenames = fs.readdirSync(Config.outStrokePath);
    for (const filename of filenames) {
        const inputFile = path.join(Config.outStrokePath, filename);
        const outputFile = path.join(Config.outTracerPath, filename);
        const content = fs.readFileSync(inputFile, { encoding: 'utf-8', flag: 'r' });
        const lines = content
            .split('\n')
            .filter(Boolean)
            .filter((line) => !line.includes('<text transform'))
            .map((line) => line.replace('stroke:#000000', 'stroke:#BBBBBB'))
            .map((line) => line.replace('fill:#000000', 'fill:#BBBBBB'))
            .join('\n');
        fs.writeFileSync(outputFile, lines, { encoding: 'utf-8', flag: 'w+' });
    }
    logger.done('Convert To Traces');
};

const _removeKvgAttrs = (line: string): string => {
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

const _increaseSize = (line: string): string =>
    line.replace('width="109" height="109"', 'width="512" height="512"');

const _rewriteWithSvgOptimizations = async (
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
        newLines.push(_increaseSize(_removeKvgAttrs(lines[i])));
    }
    // Write optimized file
    await fs.writeFileSync(outputFilePath, newLines.join('\n'), { flag: 'w+' });
};

export const buildKanjiDiagrams = async (): Promise<void> => {
    ensureDirectoriesExist(
        Config.outDirPath,
        Config.outKanjiVGDataPath,
        Config.outStrokePath,
        Config.outTracerPath
    );

    if (isDirEmpty(Config.outStrokePath) || isDirEmpty(Config.outTracerPath)) {
        await _extractKanjiVG();
        await _runCommonOptimizations();
        await _convertToTraces();
        return;
    }

    logger.done('KanjiVG already processed');
};
