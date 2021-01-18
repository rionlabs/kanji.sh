const os = require('os');
const fs = require('fs');
const path = require('path');
const fetch = require('node-fetch');
const puppeteer = require('puppeteer');
const {default: PQueue} = require('p-queue');
const PDFMerger = require('pdf-merger-js');
const {
    config,
    logger,
    ensureDirectories,
    readSourceFile,
    generatePageTitle
} = require('./utils.js');

// Ensure PDF output directory
const pdfOutputDir = path.join(config.outDir, 'pdf');
ensureDirectories(pdfOutputDir);

async function generatePDFs(sourceName, group) {
    const sourceDir = path.join(config.srcDir, sourceName);
    try {
        let filenames = fs.readdirSync(sourceDir);

        // For all kanji in single file
        if (filenames.length === 1) {
            const inputFilePath = path.join(sourceDir, filenames[0]);
            logger.start(`Reading file ${inputFilePath}...`);
            const data = readSourceFile(inputFilePath);
            for (let index = 0; index < data.length; index += group) {
                const sourceGroup = `${index + 1}-${index + group}`;
                logger.start(`Group ${sourceGroup} for ${sourceName}`);
                const outputFilePath = path.join(pdfOutputDir, sourceName, sourceGroup);
                if (!dryRun) {
                    await generatePDF(
                        data.slice(index, index + group),
                        outputFilePath,
                        generatePageTitle(sourceName, sourceGroup)
                    );
                }
                logger.done(`Group ${outputFilePath} written for ${sourceName}`);
            }
        } else {
            // For multiple source files
            for (let sourceFile of filenames) {
                const inputFilePath = path.join(sourceDir, sourceFile);
                const sourceGroup = sourceFile.split('.')[0]
                const outputFilePath = path.join(pdfOutputDir, sourceName, sourceGroup);

                logger.start(`File ${inputFilePath} for ${sourceName}`);
                const data = readSourceFile(inputFilePath);
                if (!dryRun) {
                    await generatePDF(data, outputFilePath, generatePageTitle(sourceName, sourceGroup));
                }
                logger.done(`File ${outputFilePath} written for ${sourceName}`);
            }
        }
    } catch (error) {
        logger.error(`Error for source ${sourceName}: ${error}`);
    }
}

async function generatePDF(data, outputFilePath, pageTitle) {
    const tempDirPath = path.join(outputFilePath, 'pages');
    ensureDirectories(outputFilePath, tempDirPath);

    // Do not proceed if file already exists
    const outputPdfFilePathName = `${outputFilePath}.pdf`;
    if (fs.existsSync(outputPdfFilePathName)) {
        return;
    }

    try {
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

                page.on('console', consoleObj => console.log(`[Browser]${consoleObj.text()}`));
                await page.goto(`file:///${config.templateAbsolutePath}?data=${kanjiArray.join("")}&page=${index + 1}&title=${pageTitle}`, {
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
        await merger.save(outputPdfFilePathName);

    } catch (error) {
        logger.start(`Error on ${outputFilePath} : ${error}`);
    }
}

// Download kanji data
async function downloadKanjiData() {
    logger.start("Downloading Kanji data");
    const outputDataPath = path.join(config.outDir, 'all-data.json')
    if (fs.existsSync(outputDataPath)) {
        logger.done("Kanji data already downloaded");
        return
    }
    const response = await fetch("https://raw.githubusercontent.com/davidluzgouveia/kanji-data/master/kanji.json");
    const json = await response.buffer();
    await fs.writeFileSync(outputDataPath, json);
    logger.done("Kanji data downloaded");
}

async function cleanup(sourceName) {
    logger.start("Cleaning up unnecessary/temporary files");

    // Temporary PDF pages
    let filenames = await fs.readdirSync(path.join(pdfOutputDir, sourceName));
    for (let filename of filenames) {
        const filePath = path.join(pdfOutputDir, sourceName, filename);
        let lsStat = await fs.lstatSync(filePath);
        // Since we only need PDFs, it's okay to delete directories
        if (lsStat.isDirectory()) {
            await fs.rmdirSync(filePath, {recursive: true});
        }
    }

    logger.done("Cleanup finished");
}

function sortByPage(array) {
    let getNumber = (path) => path.split("/").slice(-1)[0].split(".")[0];
    return array.sort((pathA, pathB) => getNumber(pathA) - getNumber(pathB));
}

async function generateData(sourceName, group) {
    await downloadKanjiData();
    await generatePDFs(sourceName, group);
    await cleanup(sourceName);
}

// Command line argument parsing
const yargs = require('yargs/yargs')
const {hideBin} = require('yargs/helpers')
const argv = yargs(hideBin(process.argv)).argv

let group = 50
if (argv.source === 'frequency' || argv.source === 'kanjigarden') {
    // Groups only matter for these two sources
    if (!isNaN(argv.group)) {
        group = argv.group
    }
}

if (!argv.source) {
    console.error("Source must be specified. See generator/sources directory.")
    process.exit(1);
}

// If --dryRun flag is passed, the script will not generate any PDFs
const dryRun = argv.dryRun

const timerLabel = `Generate Data for ${argv.source}`;

console.time(timerLabel);
generateData(argv.source, group, argv.dryRun).then(function () {
    console.timeEnd(timerLabel);
    process.exit(0);
}).catch(function (error) {
    console.error('Error occurred ' + error);
    process.exit(1);
});
