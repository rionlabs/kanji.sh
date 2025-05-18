import fs, { PathLike, readdirSync } from 'node:fs';
import path from 'node:path';

import { Open } from 'unzipper';

import { Config } from './config';
import { ensureDirectoriesExist, isDirEmpty, logger } from './utils';

const _extractKanjiVG = async (): Promise<void> => {
    try {
        if (!isDirEmpty(Config.outKanjiVGDataPath)) {
            logger.done('KanjiVG already extracted');
        }
    } catch (error) {
        console.error(error);
    }

    logger.start('Extracting KanjiVg file...');
    // TODO: Automate downloading latest version with GH Actions
    const kanjiVgFilePath = path.join(Config.assetsDirPath, 'kanjivg-20160426-main.zip');
    const kanjiVgFile = await Open.file(kanjiVgFilePath);
    await kanjiVgFile.extract({
        path: Config.outKanjiVGDataPath,
        forceStream: true,
        concurrency: 10,
    });

    // The output is "kanji" directory. Move the contents to parent directory, & delete temp
    const tempDirectory = path.join(Config.outKanjiVGDataPath, 'kanji');
    for (const filename of readdirSync(tempDirectory)) {
        fs.copyFileSync(
            path.join(tempDirectory, filename),
            path.join(Config.outKanjiVGDataPath, filename),
        );
        fs.unlinkSync(path.join(tempDirectory, filename));
    }
    fs.rmSync(tempDirectory, { recursive: true });

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
        /kvg:type=".*"\s/gu,
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
        /kvg:type=".*">/gu,
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
    outputFilePath: PathLike,
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

export const buildKanjiDiagrams = async (): Promise<void> => {
    ensureDirectoriesExist(
        Config.outDirPath,
        Config.outKanjiVGDataPath,
        Config.outStrokePath,
        Config.outTracerPath,
    );

    if (isDirEmpty(Config.outStrokePath) || isDirEmpty(Config.outTracerPath)) {
        await _extractKanjiVG();
        await _runCommonOptimizations();
        await _convertToTraces();
        return;
    }

    logger.done('KanjiVG already processed');
};


const K0F0AD = `
<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 109 109">
<g id="kvg:StrokePaths_0f9a8" style="fill:none;stroke:#000000;stroke-width:3;stroke-linecap:round;stroke-linejoin:round;">
<g id="kvg:0f9a8" >
\t<g id="kvg:0f9a8-g1" >
\t\t<path id="kvg:0f9a8-s1" d="M49.62,13.25c0.11,0.94,0.38,2.48-0.22,3.77c-4.15,8.86-15.15,25.23-36.65,37.08"/>
\t\t<path id="kvg:0f9a8-s2" d="M50.54,16.55c6.13,4.35,24.99,20.22,33.98,27.33c3.22,2.54,5.6,4.12,9.73,5.37"/>
\t</g>
\t<g id="kvg:0f9a8-g2" >
\t\t<g id="kvg:0f9a8-g3" >
\t\t\t<path id="kvg:0f9a8-s3"  d="M 38.590625,42.910833 c 1.76,0.72 3.84,0.36 5.65,0.14 5.4,-0.66 13.08,-1.76 18.48,-2.24 1.88,-0.17 3.54,-0.23 5.37,0.21"/>
\t\t</g>
\t\t<g id="kvg:0f9a8-g4" >
\t\t\t<path id="kvg:0f9a8-s4" d="M 31.464375,53.641042 c 0.61,0.15 3,1 4.21,0.87 10.329583,-0.937708 28.549375,-2.998125 38.130833,-4.17 1.516086,-0.185427 4.278829,-0.290121 3.95,2.89 -0.431171,4.169879 -2.680149,16.919928 -6,23.84 -1.890149,3.939928 -3.18,3.45 -6.23,0.46"/>
\t\t\t<path id="kvg:0f9a8-s5" d="M 44.769166,53.809375 c 0.87,0.87 1.8,2 1.8,3.5 0,7.36 -0.04,24.53 -0.1,34.13 -0.02,3.3 -0.05,5.71 -0.08,6.51"/>
\t\t</g>
\t</g>
</g>
</g>
<g id="kvg:StrokeNumbers_0f9a8" style="font-size:8;fill:#808080">
\t<text transform="matrix(1 0 0 1 42.50 15.13)">1</text>
\t<text transform="matrix(1 0 0 1 58.50 19.63)">2</text>
\t<text transform="matrix(1 0 0 1 43 40)">3</text>
\t<text transform="matrix(1 0 0 1 25.1 62.1)">4</text>
\t<text transform="matrix(1 0 0 1 36.4 65.5)">5</text>
</g>
</svg>
`;

export const K0FF19 = () => {
    return 0xFF19;
};
