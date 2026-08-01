import path from 'node:path';

const workspaceRoot = process.env['NX_WORKSPACE_ROOT'] ?? process.cwd();
// Absolute path to assets directory
const assetsDirPath = path.resolve(workspaceRoot, 'libs/printer/assets');

// Absolute path to build directory
const outDirPath = path.resolve(workspaceRoot, 'dist/printed');

export type ConfigV2 = {
    sourceDir: string;
    outDir: string;
    collectionSrcRoot: string;
    tempDirPath: string;
    outKanjiVGDataPath: string;
    outStrokePath: string;
    outTracerPath: string;
};

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

export type ConfigV2Params = {
    sourceDir?: string;
    outDir: string;
};

export function configV2({
    sourceDir = path.resolve(__dirname, '../assets'),
    outDir = path.resolve(__dirname, '../dist/printed')
}: Partial<ConfigV2Params>): ConfigV2 {
    return {
        sourceDir,
        outDir,
        collectionSrcRoot: path.join(sourceDir, 'sources'),
        tempDirPath: path.join(outDir, 'temp'),
        outKanjiVGDataPath: path.join(outDir, 'SVG', 'kanjiVG'),
        outStrokePath: path.join(outDir, 'SVG', 'kanjiStrokes'),
        outTracerPath: path.join(outDir, 'SVG', 'kanjiTracer')
    };
}
