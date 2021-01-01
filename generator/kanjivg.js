const fetch = require('node-fetch');
const fs = require('fs');
const path = require('path');
const admZip = require('adm-zip');
const optimize = require('./optimize.js');
const sharp = require('sharp');

const KanjiVGAssetUrl = "https://github.com/KanjiVG/kanjivg/releases/download/r20160426/kanjivg-20160426-main.zip"
const outDir = "./build"
const zipOutputDir = path.join(outDir, 'svg');
const svgDir = path.join(outDir, 'svg', 'kanji');
const pngBigDir = path.join(outDir, 'png', 'kanjiBig');
const pngSmallDir = path.join(outDir, 'png', 'kanjiSmall');

const ensureDirectories = (...dirNames) => {
    for (const dirName of dirNames) {
        fs.existsSync(dirName) || fs.mkdirSync(dirName, {recursive: true});
    }
}

async function downloadAndExtract() {
    // TODO Avoid duplications
    const response = await fetch(KanjiVGAssetUrl);
    const content = await response.buffer();
    const zipOutputFile = path.join(outDir, "KanjiVG.zip");
    await fs.writeFileSync(zipOutputFile, content)
    const zip = admZip(zipOutputFile)
    await zip.extractAllTo(zipOutputDir, true);
}

async function runCommonOptimizations() {
    let filenames = await fs.readdirSync(svgDir);
    const promises = [];
    for (let filename of filenames) {
        const filePath = path.join(svgDir, filename)
        promises.push(optimize.rewriteWithSvgOptimizations(filePath));
    }
    await Promise.all(promises)
}

async function convertToPng() {
    let filenames = await fs.readdirSync(svgDir);
    const promises = [];
    for (let filename of filenames) {
        const prefix = filename.split(".")[0];
        const inputFile = path.join(svgDir, filename)
        promises.push(
            sharp(inputFile)
                .resize({height: 1024, width: 1024})
                .png({quality: 100})
                .toFile(path.join(pngBigDir, `${prefix}.png`))
        );

        const content = fs.readFileSync(inputFile, {encoding: 'utf-8', flag: 'r'})
        const lines = content.split('\n')
            .filter(Boolean)
            .filter(line => !line.includes("<text transform"))
            .map(line => line.replace("stroke:#000000", "stroke:#BBBBBB"))
            .map(line => line.replace("fill:#000000", "fill:#BBBBBB"))
        promises.push(
            sharp(Buffer.from(lines.join("\n")))
                .resize({height: 512, width: 512})
                .png({quality: 100})
                .toFile(path.join(pngSmallDir, `${prefix}.png`))
        );
    }
    await Promise.all(promises)
}

async function buildKanjiDiagrams() {
    await ensureDirectories(outDir, zipOutputDir, svgDir, pngBigDir, pngSmallDir)
    await downloadAndExtract()
    await runCommonOptimizations()
    await convertToPng()
}

console.time('BuildKanjiDiagrams');
buildKanjiDiagrams().then(function () {
    console.log(`BuildKanjiDiagrams finished`);
    console.timeEnd('BuildKanjiDiagrams')
    process.exit(0)
}).catch(function (error) {
    console.error('Error occurred ' + error)
    process.exit(1)
});
