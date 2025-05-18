import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';

import { CollectionType } from '@kanji-sh/models';
import { cliOperations } from '@kanji-sh/printer';

(async () => {
    const options = await yargs(hideBin(process.argv))
        .usage('Usage: -c <collection>')
        .help(true)
        .option('collection', {
            alias: 'c',
            describe: 'Collection to build PDFs for',
            type: 'string',
            choices: Object.values(CollectionType)
        })
        .option('kanji', {
            alias: 'k',
            describe: 'String containing kanji list to build PDFs for.',
            type: 'string'
        })
        .conflicts('collection', 'kanji')
        .parse();

    const cliOps = cliOperations();

    if (options.kanji) {
        try {
            await cliOps.generateWorksheet(options.kanji.split(''), 'Custom Worksheet');
            process.exit(0);
        } catch (error) {
            console.error('Error generating worksheet:', error);
            process.exit(1);
        }
    }

    if (options.collection) {
        try {
            await cliOps.generatePreBuiltWorksheets(options.collection);
            process.exit(0);
        } catch (error) {
            console.error('Error generating pre-built worksheets:', error);
            process.exit(1);
        }
    }
    // try {
    //     let collection: CollectionType;
    //     try {
    //         const collectionString = options.collection.toUpperCase();
    //         collection = CollectionType[collectionString as keyof typeof CollectionType];
    //     } catch (error) {
    //         console.error(`Option collection must be one of ${Object(CollectionType).values()}`);
    //         process.exit(1);
    //     }
    //
    //     await cliOps.generatePreBuiltWorksheets(collection);
    //     process.exit(0);
    // } catch (error) {
    //     console.error('Error generating pre-built worksheets:', error);
    //     process.exit(1);
    // }
})();

/**
 * "build:generator": "esbuild --bundle --platform=node --target=node16 --outfile=generator/dist/index.js generator/src/index.ts",
 *     "build:worksheets": "./scripts/build:worksheets",
 */
