import type { PathLike } from 'fs';
import { readdirSync } from 'fs';
import fs from 'node:fs';
import path from 'node:path';

import { Open } from 'unzipper';

import { Config, ConfigV2 } from './config';
import { ensureDirectoriesExist, logger, isDirEmpty } from './utils';

const _extractKanjiVG = async (config: ConfigV2): Promise<void> => {
    try {
        if (!isDirEmpty(config.outKanjiVGDataPath)) {
            logger.done('KanjiVG already extracted');
        }
    } catch (error) {
        logger.error(`Error while checking KanjiVG extraction ${error}`);
    }

    logger.start('Extracting KanjiVg file...');
    // TODO: Automate downloading latest version with GH Actions
    const kanjiVgFilePath = path.join(config.sourceDir, 'kanjivg-20160426-main.zip');
    const kanjiVgFile = await Open.file(kanjiVgFilePath);
    await kanjiVgFile.extract({
        path: config.outKanjiVGDataPath,
        forceStream: true,
        concurrency: 10
    });

    // The output is "kanji" directory. Move the contents to parent directory, & delete temp
    const tempDirectory = path.join(config.outKanjiVGDataPath, 'kanji');
    for (const filename of readdirSync(tempDirectory)) {
        fs.copyFileSync(
            path.join(tempDirectory, filename),
            path.join(config.outKanjiVGDataPath, filename)
        );
        fs.unlinkSync(path.join(tempDirectory, filename));
    }
    fs.rmSync(tempDirectory, { recursive: true });

    logger.done('KanjiVG extraction');
};

const _runCommonOptimizations = async (config: ConfigV2): Promise<void> => {
    logger.start('Common optimizations');
    const filenames = fs.readdirSync(config.outKanjiVGDataPath);
    const promises = [];
    for (const filename of filenames) {
        const inputFilePath = path.join(config.outKanjiVGDataPath, filename);
        const outputFilePath = path.join(config.outStrokePath, filename);
        promises.push(_rewriteWithSvgOptimizations(inputFilePath, outputFilePath));
    }
    await Promise.all(promises);
    logger.done('Common optimizations');
};

const _convertToTraces = async (config: ConfigV2): Promise<void> => {
    logger.start('Convert To Traces');
    const filenames = fs.readdirSync(config.outStrokePath);
    for (const filename of filenames) {
        const inputFile = path.join(config.outStrokePath, filename);
        const outputFile = path.join(config.outTracerPath, filename);
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
            // Skip till the end of comment is found
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
    fs.writeFileSync(outputFilePath, newLines.join('\n'), { flag: 'w+' });
};

const DefaultConfigV2: ConfigV2 = {
    sourceDir: Config.assetsDirPath,
    outDir: Config.outDirPath,
    collectionSrcRoot: Config.collectionSrcRoot,
    tempDirPath: path.join(Config.outDirPath, 'temp'),
    outKanjiVGDataPath: path.join(Config.outDirPath, 'SVG', 'kanjiVG'),
    outStrokePath: path.join(Config.outDirPath, 'SVG', 'kanjiStrokes'),
    outTracerPath: path.join(Config.outDirPath, 'SVG', 'kanjiTracer')
};

export const buildKanjiDiagrams = async (config?: Partial<ConfigV2>): Promise<void> => {
    const mergedConfig = { ...DefaultConfigV2, ...config };

    ensureDirectoriesExist(
        mergedConfig.outKanjiVGDataPath,
        mergedConfig.outStrokePath,
        mergedConfig.outTracerPath
    );

    if (isDirEmpty(mergedConfig.outStrokePath) || isDirEmpty(mergedConfig.outTracerPath)) {
        await _extractKanjiVG(mergedConfig);
        await _runCommonOptimizations(mergedConfig);
        await _convertToTraces(mergedConfig);
        return;
    }

    logger.done('KanjiVG already processed');
};
