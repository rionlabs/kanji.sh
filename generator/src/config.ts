import * as path from 'path';

// Absolute path to assets directory
const assetsDirPath = path.resolve(process.cwd(), 'generator/assets');

// Absolute path to build directory
const outDirPath = path.resolve(process.cwd(), 'generator/dist');

/**
 * Defines the directory structure, location of source files.
 * Every path is absolute path from the root of the file system.
 */
export const Config = {
    assetsDirPath,
    outDirPath,
    collectionSrcRoot: path.join(assetsDirPath, 'sources'),
    templatePath: path.join(assetsDirPath, 'template/page.html'),
    tempDirPath: path.join(outDirPath, 'temp'),
    outKanjiVGDataPath: path.join(outDirPath, 'SVG', 'kanjiVG'),
    outStrokePath: path.join(outDirPath, 'SVG', 'kanjiStrokes'),
    outTracerPath: path.join(outDirPath, 'SVG', 'kanjiTracer')
};
