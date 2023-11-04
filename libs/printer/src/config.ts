import * as path from 'path';

console.log(__dirname);
console.log(process.cwd());
// Absolute path to assets directory
const assetsDirPath = path.resolve(/*workspaceRoot*/ '.', 'libs/printer/assets');

// Absolute path to build directory
const outDirPath = path.resolve(/*workspaceRoot*/ '.', 'dist/printed');

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

console.log(JSON.stringify(Config, null, 2));
