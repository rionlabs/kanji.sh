const fs = require('fs');
const path = require('path');
const fetch = require('node-fetch');
const puppeteer = require('puppeteer');

const kanjiVgPrefix = "https://raw.githubusercontent.com/KanjiVG/kanjivg/master/kanji/";

const outDir = "build"
const svgOutputDir = `${outDir}/svg`
const pdfOutputDir = `${outDir}/pdf`

const templateAbsolutePath = path.relative("/", "template/page.html");

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

async function generatePDFs(...sourceDirs) {
    for (const sourceDir of sourceDirs) {
        try {
            let filenames = fs.readdirSync(sourceDir);
            console.log(`Filenames in source Dir ${sourceDir} are ${filenames}`)
            for (let sourceFile of filenames) {
                const inputFilePath = path.join(sourceDir, sourceFile)
                const outputFilePath = path.join(pdfOutputDir, `${sourceDir}_${sourceFile}.pdf`)
                await generatePDF(inputFilePath, outputFilePath)
            }
        } catch (error) {
            logError(`Error while reading directory ${sourceDir}: ${error}`);
        }
    }
}

async function generatePDF(inputFilePath, outputFilePath) {
    logStart(`Reading file ${inputFilePath}...`);
    try {
        const content = fs.readFileSync(inputFilePath, {encoding: 'utf-8', flag: 'r'})
        const data = content.split('\n').filter(Boolean).join("")
        console.log(`Data for file ${inputFilePath} is ${data}`)

        const timeout = 10 * 60 * 60 * 1000
        const browser = await puppeteer.launch({
            waitNetworkIdle: true,
            timeout: timeout,
            args: [
                '--disable-web-security',
            ],
        });
        const page = await browser.newPage();
        page.setDefaultTimeout(timeout)

        page.on('console', consoleObj => console.log(consoleObj.text()));
        await page.goto(`file:///${templateAbsolutePath}?data=${data}`, {
            waitUntil: ['load', 'networkidle0', 'networkidle2', 'domcontentloaded']
        });

        await page.waitFor(5 * 60 * 1000)

        await page.pdf({
            path: outputFilePath,
            displayHeaderFooter: false,
            printBackground: true,
            format: 'A4',
        });
        await browser.close();
    } catch (error) {
        logError(`Error on reading file ${inputFilePath} : ${error}`);
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
                logDone(`Finished reading ${inputFile}`);
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
    const response = await fetch(readFileUrl)
    const content = await response.buffer();
    await fs.writeFileSync(svgOutFilePath, content)
}

async function downloadKanjiData() {
    logStart("Downloading Kanji data")
    const response = await fetch("https://raw.githubusercontent.com/davidluzgouveia/kanji-data/master/kanji.json")
    const json = await response.buffer();
    await fs.writeFileSync(`${outDir}/all-data.json`, json)
    logDone("Kanji data downloaded")
}

async function generateData() {
    await ensureDirectories(outDir, svgOutputDir, pdfOutputDir)
    await downloadKanjiData();
    await processSources("frequency", "jlpt", "grade", "wanikani")
    await generatePDFs("frequency", "jlpt", "grade", "wanikani")
}

generateData().then(function () {
    console.log("Processing complete.")
    process.exit(0)
}).catch(function () {
    process.exit(1)
});
