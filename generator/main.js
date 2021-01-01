const os = require('os');
const fs = require('fs');
const path = require('path');
const fetch = require('node-fetch');
const puppeteer = require('puppeteer');
const {default: PQueue} = require('p-queue');
const PDFMerger = require('pdf-merger-js');

const outDir = "build";
const pdfOutputDir = `${outDir}/pdf`;

const templateAbsolutePath = path.relative("/", "template/page.html");

const logStart = (message) => console.log(`[START] ${message}`);
const logDone = (message) => console.log(`[DONE✓] ${message}`);
const logError = (message) => console.error(`[ERROR] ${message}`);

const ensureDirectories = (...dirNames) => {
    for (const dirName of dirNames) {
        fs.existsSync(dirName) || fs.mkdirSync(dirName);
    }
};

async function generatePDFs(...sourceDirs) {
    for (const sourceDir of sourceDirs) {
        try {
            let destinationDir = path.join(pdfOutputDir, sourceDir);
            ensureDirectories(destinationDir);

            let filenames = fs.readdirSync(sourceDir);
            for (let sourceFile of filenames) {
                const inputFilePath = path.join(sourceDir, sourceFile);
                const outputDirectoryPath = path.join(pdfOutputDir, sourceDir);
                await generatePDF(inputFilePath, outputDirectoryPath, sourceFile.split('.')[0]);
            }
        } catch (error) {
            logError(`Error while reading directory ${sourceDir}: ${error}`);
        }
    }
}

async function generatePDF(inputFilePath, outputDirectoryPath, sourceGroup) {
    const tempDirPath = path.join(outputDirectoryPath, sourceGroup);
    ensureDirectories(outputDirectoryPath, tempDirPath);

    const outputPdfFilePath = path.join(outputDirectoryPath, `${sourceGroup}.pdf`);
    if (fs.existsSync(outputPdfFilePath)) {
        return;
    }

    try {
        logStart(`Reading file ${inputFilePath}...`);
        const content = fs.readFileSync(inputFilePath, {encoding: 'utf-8', flag: 'r'});
        const data = content.split('\n').filter(Boolean);

        const timeout = 60 * 1000;
        const browser = await puppeteer.launch({
            waitNetworkIdle: true,
            timeout: timeout,
            args: [
                '--disable-web-security',
            ],
        });

        // To avoid timeout, if the number of pages are too much, 5 pages per core
        const browserPageQueue = new PQueue({concurrency: os.cpus().length * 5, autoStart: true});
        const generatedPDFPaths = [];

        let times = 0;
        for (let index = 0; index < data.length; index += 5) {
            const processing = async function (index, kanjiArray) {
                const page = await browser.newPage();
                page.setDefaultTimeout(timeout);

                page.on('console', consoleObj => console.log(consoleObj.text()));
                await page.goto(`file:///${templateAbsolutePath}?data=${kanjiArray.join("")}&page=${index + 1}&title=${getTitle(sourceGroup)}`, {
                    waitUntil: ['load', 'networkidle0', 'networkidle2', 'domcontentloaded']
                });

                const pdfName = path.join(tempDirPath, `${index}.pdf`);
                await page.pdf({
                    path: pdfName,
                    displayHeaderFooter: false,
                    printBackground: true,
                    format: 'A4',
                });

                generatedPDFPaths.push(pdfName);

                await page.close();
            };

            browserPageQueue.add(async () => processing(times++, data.slice(index, index + 5))).then(() => {
                // NoOp
            });
        }

        await browserPageQueue.onIdle();
        await browser.close();

        // Merge the generated PDFs
        const merger = new PDFMerger();
        for (let generatedPDFPath of sortByPage(generatedPDFPaths)) {
            merger.add(generatedPDFPath);
        }
        await merger.save(outputPdfFilePath);

    } catch (error) {
        logError(`Error on reading file ${inputFilePath} : ${error}`);
    }
}

// Download kanji data
async function downloadKanjiData() {
    logStart("Downloading Kanji data");
    const response = await fetch("https://raw.githubusercontent.com/davidluzgouveia/kanji-data/master/kanji.json");
    const json = await response.buffer();
    await fs.writeFileSync(`${outDir}/all-data.json`, json);
    logDone("Kanji data downloaded");
}

async function cleanup(...sourceDirs) {
    logStart("Cleaning up unnecessary/temporary files");

    // Temporary PDF pages
    for (let sourceDir of sourceDirs) {
        let filenames = await fs.readdirSync(path.join(pdfOutputDir, sourceDir));
        for (let filename of filenames) {
            const filePath = path.join(pdfOutputDir, sourceDir, filename);
            let lsStat = await fs.lstatSync(filePath);
            if (lsStat.isDirectory()) {
                await fs.rmdirSync(filePath, {recursive: true});
            }
        }
    }
    // Kanji Data
    await fs.unlinkSync(`${outDir}/all-data.json`);

    logDone("Cleanup finished");
}

function getTitle(sourceGroup) {
    if (sourceGroup.charAt(0) === "g") {
        return `Grade ${sourceGroup.charAt(1)}`;
    } else if (sourceGroup.charAt(0) === "n") {
        return `JLPT N${sourceGroup.charAt(1)}`;
    } else if (!isNaN(sourceGroup)) {
        return `Wanikani Level ${sourceGroup}`;
    } else {
        return "Frequency";
    }
}

function sortByPage(array) {
    let getNumber = (path) => path.split("/").slice(-1)[0].split(".")[0];
    return array.sort((pathA, pathB) => getNumber(pathA) - getNumber(pathB));
}

async function generateData() {
    await ensureDirectories(outDir, pdfOutputDir);
    await downloadKanjiData();
    await generatePDFs("frequency");
    await cleanup("frequency");
}

console.time('GenerateData');
generateData().then(function () {
    console.log(`Data Generation finished`);
    console.timeEnd('GenerateData');
    process.exit(0);
}).catch(function (error) {
    console.error('Error occurred ' + error);
    process.exit(1);
});
