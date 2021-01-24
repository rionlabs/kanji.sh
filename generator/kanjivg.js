const fs = require('fs');
const path = require('path');
const admZip = require('adm-zip');
const optimize = require('./optimize.js');
const {
    config,
    logger,
    ensureDirectories
} = require('./utils.js');

const outDir = "./build";
const zipOutputDir = path.join(outDir, 'svg');
const svgDir = path.join(outDir, 'svg', 'kanji');
const svgStrokeDir = path.join(outDir, 'png', 'kanjiStrokes');
const svgTracesDir = path.join(outDir, 'svg', 'kanjiTracer');

async function downloadAndExtract() {
    logger.start("Extracting KanjiVg file...");
    const kanjiVgFile = path.join(config.srcDir, "kanjivg-20160426-main.zip");
    const zip = admZip(kanjiVgFile);
    await zip.extractAllTo(zipOutputDir, true);
    logger.done("KanjiVG extraction");
}

async function runCommonOptimizations() {
    logger.start("Common optimizations");
    let filenames = await fs.readdirSync(svgDir);
    const promises = [];
    for (let filename of filenames) {
        const filePath = path.join(svgDir, filename);
        promises.push(optimize.rewriteWithSvgOptimizations(filePath));
    }
    await Promise.all(promises);
    logger.done("Common optimizations");
}

async function convertToTraces() {
    logger.start("Convert To Traces");
    let filenames = await fs.readdirSync(svgDir);
    const promises = [];
    for (let filename of filenames) {
        const inputFile = path.join(svgDir, filename);
        const outputFile = path.join(svgTracesDir, filename);
        const content = fs.readFileSync(inputFile, {encoding: 'utf-8', flag: 'r'});
        const lines = content.split('\n')
            .filter(Boolean)
            .filter(line => !line.includes("<text transform"))
            .map(line => line.replace("stroke:#000000", "stroke:#BBBBBB"))
            .map(line => line.replace("fill:#000000", "fill:#BBBBBB"))
            .join("\n");
        fs.writeFileSync(outputFile, lines, {encoding: 'utf-8', flag: 'w+'})
    }
    await Promise.all(promises);
    logger.start("Convert To Traces");
}

async function buildKanjiDiagrams() {
    await ensureDirectories(outDir, svgDir, zipOutputDir, svgDir, svgStrokeDir, svgTracesDir);
    await downloadAndExtract();
    await runCommonOptimizations();
    await convertToTraces();
}

console.time('BuildKanjiDiagrams');
buildKanjiDiagrams().then(function () {
    console.log(`BuildKanjiDiagrams finished`);
    console.timeEnd('BuildKanjiDiagrams');
    process.exit(0);
}).catch(function (error) {
    console.error('Error occurred ' + error);
    process.exit(1);
});
