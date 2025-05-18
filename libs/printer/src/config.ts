import path from 'node:path';

// Absolute path to assets directory
const assetsDirPath = path.resolve('.', 'libs/printer/assets');

// Absolute path to build directory
const outDirPath = path.resolve('.', 'dist/printed');

/*
The directories have the structure:
assets
├── graphics (Background images, etc)
├── sources (Source files for kanji)
├── templates (HTML templates for the output/Soon to be deprecated in favor of React-PDF)

out
├── SVG
│   ├── kanjiVG         Original SVG files for the kanji
│   ├── kanjiStrokes    SVG files for the strokes of the kanji
│   └── kanjiTracer
*/

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

export const ConfigV2 = {
    sources: {},
    components: {
        pdf: {},
        svg: {},
    },

};
