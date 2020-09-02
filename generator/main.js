const fs = require('fs');
const path = require('path');
const https = require('https');
const fetch = require('node-fetch');

const kanjiVgPrefix = "https://raw.githubusercontent.com/KanjiVG/kanjivg/master/kanji/";

const outDir = "build"
const svgOutputDir = `${outDir}/svg`

const logStart = (message) => console.log(`[START] ${message}`);
const logDone = (message) => console.log(`[DONE✓] ${message}`);
const logError = (message) => console.error(`[ERROR] ${message}`);

const ensureDirectories = (...dirNames) => {
    for (const dirName of dirNames) {
        fs.existsSync(dirName) || fs.mkdirSync(dirName);
    }
}

async function processSources(...sourceDirs) {
    for (const sourceDir of sourceDirs) {
        await processSourceDir(sourceDir)
    }
}

// Read sources and download SVG if doesnt exists
async function processSourceDir(sourceDir) {
    logStart(`Reading directory ${sourceDir}...`)
    try {
        let filenames = fs.readdirSync(sourceDir);
        for (let sourceFile of filenames) {
            const inputFile = path.join(sourceDir, sourceFile)
            logStart(`Reading file ${inputFile}...`);
            try {
                const content = fs.readFileSync(inputFile, {encoding: 'utf-8', flag: 'r'})
                for (const kanji of content.split('\n').filter(Boolean)) {
                    await downloadSvg(kanji)
                }
            } catch (error) {
                logError(`Error on reading file ${inputFile} : ${error}`);
            }
        }
    } catch (error) {
        logError(`Error while reading directory ${sourceDir}: ${error}`);
    }
}

// Downloads SVG from KanjiVG
async function downloadSvg(kanji) {
    const readFileUrl = kanjiVgPrefix + "0" + kanji.charCodeAt(0).toString(16) + ".svg";
    const svgOutFilePath = path.join(svgOutputDir, `${kanji}.svg`);
    if (fs.existsSync(svgOutFilePath)) {
        // File already downloaded
        return
    }
    const svgOutFile = fs.createWriteStream(svgOutFilePath, {flags: "w+"});
    https.get(readFileUrl, function (response) {
        response.pipe(svgOutFile);
    });
}

async function downloadKanjiData() {
    logStart("Downloading Kanji data")
    const response = await fetch("https://raw.githubusercontent.com/davidluzgouveia/kanji-data/master/kanji.json")
    const json = await response.buffer();
    await fs.writeFileSync(`${outDir}/all-data.json`, json)
    logDone("Kanji data downloaded")
}

async function generateData() {
    await ensureDirectories(outDir, svgOutputDir)
    await downloadKanjiData();
    await processSources("frequency", "jlpt", "grade", "wanikani")
}

generateData().then(function () {
    console.log("Processing complete.")
    process.exit(0)
}).catch(function () {
    process.exit(1)
})
