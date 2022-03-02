import path from 'path';
import * as fs from 'fs';
import AdmZip from 'adm-zip';
import { rewriteWithSvgOptimizations } from './optimize';
import { Config } from './Config';
import { readdirSync } from 'fs';

import { logger, ensureDirectories } from './utils';

async function extractKanjiVG() {
    try {
        if (fs.readdirSync(Config.outKanjiVGDataPath).length !== 0) {
            logger.done('KanjiVG already extracted');
        }
    } catch (error) {
        // NoOp
    }

    logger.start('Extracting KanjiVg file...');
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
}

async function runCommonOptimizations() {
    logger.start('Common optimizations');
    const filenames = await fs.readdirSync(Config.outKanjiVGDataPath);
    const promises = [];
    for (const filename of filenames) {
        const inputFilePath = path.join(Config.outKanjiVGDataPath, filename);
        const outputFilePath = path.join(Config.outStrokePath, filename);
        promises.push(rewriteWithSvgOptimizations(inputFilePath, outputFilePath));
    }
    await Promise.all(promises);
    logger.done('Common optimizations');
}

async function convertToTraces() {
    logger.start('Convert To Traces');
    const filenames = await fs.readdirSync(Config.outStrokePath);
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
    logger.start('Convert To Traces');
}

async function buildKanjiDiagrams() {
    ensureDirectories(
        Config.outDirPath,
        Config.outKanjiVGDataPath,
        Config.outStrokePath,
        Config.outTracerPath
    );
    await extractKanjiVG();
    await runCommonOptimizations();
    await convertToTraces();
}

console.time('BuildKanjiDiagrams');
buildKanjiDiagrams()
    .then(function () {
        console.log(`BuildKanjiDiagrams finished`);
        console.timeEnd('BuildKanjiDiagrams');
        process.exit(0);
    })
    .catch(function (error) {
        console.error('Error occurred ' + error);
        process.exit(1);
    });
