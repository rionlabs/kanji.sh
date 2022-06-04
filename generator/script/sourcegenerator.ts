import { CollectionType, DefaultWorksheetConfig } from '../../common/models';
import type { Worksheet } from '../../common/models';
import { readFile, writeFile } from '../../generator/src/utils';
import { Config } from '../../generator/src/config';
import path from 'path';

/**
 * Generates collection metadata
 * Run from project root with command:
 * ts-node-script --skip-project generator/script/sourcegenerator.ts
 */
export const generateSourceJson = async () => {
    type WorksheetWithKey = Worksheet & { key: string }
    const collections: { type: CollectionType, worksheets: Partial<WorksheetWithKey>[] }[] = [];

    // JLPT
    const jlptWorksheets: Partial<WorksheetWithKey>[] = [];
    for (let i = 5; i >= 1; i--) {
        jlptWorksheets.push({
            key: `n${i}`,
            name: `JLPT Level N${i} Kanji`,
            kanji: readFile(path.join(Config.collectionSrcRoot, 'jlpt', `n${i}.source`))
        });
    }
    collections.push({ type: CollectionType.JLPT, worksheets: jlptWorksheets });

    // Grades
    const gradesWorksheets: Partial<WorksheetWithKey>[] = [];
    for (let i = 1; i <= 6; i++) {
        gradesWorksheets.push({
            key: `g${i}`,
            name: `Grade ${i} Kanji`,
            kanji: readFile(path.join(Config.collectionSrcRoot, 'grade', `g${i}.source`))
        });
    }
    collections.push({ type: CollectionType.GRADE, worksheets: gradesWorksheets });

    // Wanikani
    const wkWorksheets: Partial<WorksheetWithKey>[] = [];
    for (let level = 1; level <= 60; level++) {
        wkWorksheets.push({
            key: `l${level}`,
            name: `Wanikani Level ${level} Kanji`,
            kanji: readFile(path.join(Config.collectionSrcRoot, 'wanikani', `${level}.source`))
        });
    }
    collections.push({ type: CollectionType.WANIKANI, worksheets: wkWorksheets });

    // Kanji Garden
    const kgWorksheets: Partial<WorksheetWithKey>[] = [];
    const allKgData = readFile(path.join(Config.collectionSrcRoot, 'kanjigarden', `all.source`));
    for (let index = 0, fileCounter = 1; index <= allKgData.length; index += 50, fileCounter++) {
        kgWorksheets.push({
            key: `kg${fileCounter}`,
            name: `KanjiGarden Kanji ${index + 1}-${Math.min(fileCounter * 50, allKgData.length)}`,
            kanji: allKgData.slice(index, index + 50)
        });
    }
    collections.push({ type: CollectionType.KANJIGARDEN, worksheets: kgWorksheets });

    // Frequency
    const frequencyWorksheets: Partial<WorksheetWithKey>[] = [];
    const allFrequencyData = readFile(path.join(Config.collectionSrcRoot, 'frequency', `all.source`));
    for (let index = 0, fileCounter = 1; index < allFrequencyData.length; index += 50, fileCounter++) {
        frequencyWorksheets.push({
            key: `f${fileCounter}`,
            name: `Kanji with frequency ${index + 1}-${fileCounter * 50}`,
            kanji: allFrequencyData.slice(index, index + 50)
        });
    }
    collections.push({ type: CollectionType.FREQUENCY, worksheets: frequencyWorksheets });

    // Add worksheet configurations to collections
    const collectionsWithConfig = collections.map(collection => ({
        type: collection.type,
        worksheets: collection.worksheets.map(worksheet => ({ ...worksheet, config: DefaultWorksheetConfig }))
    }));

    return collectionsWithConfig
    // writeFile(path.join(Config.outDirPath, 'collection.json'), JSON.stringify(collectionsWithConfig));
};

// generateSourceJson();
