import { generatePreBuiltWorksheets } from '@kanji-sh/printer';
import { CollectionType } from '@kanji-sh/models';
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';

(async () => {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const options = await yargs(hideBin(process.argv))
        .usage('Usage: -c <collection>')
        .help(true)
        .option('collection', {
            alias: 'c',
            describe: 'Collection to build PDFs for',
            type: 'string',
            demandOption: true
        })
        .parse();

    try {
        let collection: CollectionType;
        try {
            const collectionString = options.collection.toUpperCase();
            collection = CollectionType[collectionString as keyof typeof CollectionType];
        } catch (error) {
            console.error(`Option collection must be one of ${Object(CollectionType).values()}`);
            process.exit(1);
        }

        await generatePreBuiltWorksheets(collection);
        process.exit(0);
    } catch (error) {
        console.error('Error generating pre-built worksheets:', error);
        process.exit(1);
    }
})();

/**
 * "build:generator": "esbuild --bundle --platform=node --target=node16 --outfile=generator/dist/index.js generator/src/index.ts",
 *     "build:worksheets": "./scripts/build:worksheets",
 */
