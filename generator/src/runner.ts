/**
 * This file generates PDFs for the predefined sources.
 */
import * as path from 'path';
import * as fs from 'fs';
import { generatePageTitle, logger, readSourceFile } from './utils';
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import { CollectionType, DefaultWorksheetConfig, Worksheet } from '@ks/common/src';
import { Config } from './Config';
import { createWorksheet } from './generator';

type CollectionMetadata = Array<{ key: string; worksheet: Worksheet }>;

async function generatePDFs(collectionType: CollectionType, group: number, dryRun: boolean) {
    const collectionDir = path.join(Config.collectionSrcRoot, collectionType.toString());
    const collectionMetadata: CollectionMetadata = [];
    try {
        const filenames = fs.readdirSync(collectionDir);

        // For all kanji in single file
        if (filenames.length === 1) {
            const inputFilePath = path.join(collectionDir, filenames[0]);
            logger.start(`Reading file ${inputFilePath}...`);
            const data = readSourceFile(inputFilePath);
            let fileNumber = 0;
            for (let index = 0; index < data.length; index += group) {
                const sourceGroup = `${index + 1}-${index + group}`;
                logger.start(`Group ${sourceGroup} for ${collectionType}`);
                if (!dryRun) {
                    const worksheet = await createWorksheet(
                        data.slice(index, index + group),
                        generatePageTitle(collectionType, sourceGroup),
                        DefaultWorksheetConfig,
                        [collectionType]
                    );
                    collectionMetadata.push({
                        key: String(++fileNumber),
                        worksheet: worksheet
                    });
                }
                logger.done(
                    `Worksheet ${sourceGroup} of ${inputFilePath} written for ${collectionType}`
                );
            }
        } else {
            // For multiple source files
            for (const sourceFile of filenames) {
                const inputFilePath = path.join(collectionDir, sourceFile);
                const sourceGroup = sourceFile.split('.')[0];
                logger.start(`File ${inputFilePath} for ${collectionType}`);
                const data = readSourceFile(inputFilePath);
                if (!dryRun) {
                    const worksheet = await createWorksheet(
                        data,
                        generatePageTitle(collectionType, sourceGroup),
                        DefaultWorksheetConfig,
                        [collectionType]
                    );
                    collectionMetadata.push({
                        key: sourceGroup,
                        worksheet: worksheet
                    });
                }
                logger.done(`File ${inputFilePath} written for ${collectionType}`);
            }
        }

        return collectionMetadata;
    } catch (error) {
        logger.error(`Error for source ${collectionType}: ${error}`);
        process.exit(1);
    }
}

async function generateData(sourceName: CollectionType, group: number, dryRun: boolean) {
    // FixMe: Implement Storage Client
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const collectionMetadata: CollectionMetadata = await generatePDFs(sourceName, group, dryRun);
    // await StorageClient.instance.createFile(
    //     `${sourceName}/metadata.json`,
    //     JSON.stringify(collectionMetadata),
    //     {}
    // );
}

// Command line argument parsing
const argv = yargs(hideBin(process.argv)).options({
    source: {
        type: 'string',
        demandOption: 'Source must be specified. See generator/sources directory.'
    },
    group: {
        type: 'number',
        default: 50,
        description: 'Groups only matter for frequency and kanjigarden'
    },
    dryRun: {
        type: 'boolean',
        default: false,
        description: 'If --dryRun flag is passed, the script will not generate any PDFs'
    }
}).argv;

const sourceType: CollectionType =
    CollectionType[argv.source.toUpperCase() as keyof typeof CollectionType];

const timerLabel = `Generate Data for ${argv.source}`;

console.time(timerLabel);
generateData(sourceType, argv.group, argv.dryRun)
    .then(function () {
        console.timeEnd(timerLabel);
        process.exit(0);
    })
    .catch(function (error) {
        console.error('Error occurred ' + error);
        process.exit(1);
    });
