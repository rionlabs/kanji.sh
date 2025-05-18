import path from 'path';

import { CollectionType } from '@kanji-sh/models';

import { Config } from '../config';
import { readLinesInFile } from '../utils';
import { CollectionSource } from './CollectionSource';

type Processor = () => CollectionSource;

const frequencyProcessor: Processor = () => {
    const frequencyData: CollectionSource['pdf'] = [];
    const allFrequencyData = readLinesInFile(
        path.join(Config.collectionSrcRoot, 'frequency', `all.source`)
    );
    for (
        let index = 0, fileCounter = 1;
        index < allFrequencyData.length;
        index += 50, fileCounter++
    ) {
        frequencyData.push({
            key: `f-${fileCounter}`,
            kanji: allFrequencyData.slice(index, index + 50)
        });
    }
    return { type: CollectionType.FREQUENCY, pdf: frequencyData };
}

const gradeProcessor: Processor = () => {
    const gradesData: CollectionSource['pdf'] = [];
    for (let i = 1; i <= 6; i++) {
        gradesData.push({
            key: `g-${i}`,
            kanji: readLinesInFile(path.join(Config.collectionSrcRoot, 'grade', `g${i}.source`))
        });
    }
    return { type: CollectionType.GRADE, pdf: gradesData };
}

const jlptProcessor: Processor = () => {
    const jlptData: CollectionSource['pdf'] = [];
    for (let i = 5; i >= 1; i--) {
        jlptData.push({
            key: `n-${i}`,
            kanji: readLinesInFile(path.join(Config.collectionSrcRoot, 'jlpt', `n${i}.source`))
        });
    }
    return { type: CollectionType.JLPT, pdf: jlptData };
}

const kanjiGardenProcessor: Processor = () => {
    const kgData: CollectionSource['pdf'] = [];
    const allKgData = readLinesInFile(
        path.join(Config.collectionSrcRoot, 'kanjigarden', `all.source`)
    );
    for (let index = 0, fileCounter = 1; index <= allKgData.length; index += 50, fileCounter++) {
        kgData.push({
            key: `kg-${fileCounter}`,
            kanji: allKgData.slice(index, index + 50)
        });
    }
    return { type: CollectionType.KANJIGARDEN, pdf: kgData };
}

const wanikaniProcessor: Processor = () => {
    const wkData: CollectionSource['pdf'] = [];
    for (let level = 1; level <= 60; level++) {
        wkData.push({
            key: `wk-${level}`,
            kanji: readLinesInFile(
                path.join(Config.collectionSrcRoot, 'wanikani', `${level}.source`)
            )
        });
    }
    return { type: CollectionType.WANIKANI, pdf: wkData };
}

const processors: Record<CollectionType, Processor> = {
    frequency: frequencyProcessor,
    grade: gradeProcessor,
    jlpt: jlptProcessor,
    kanjigarden: kanjiGardenProcessor,
    wanikani: wanikaniProcessor
};

export const processCollection = (collection: CollectionType): ReturnType<Processor> => {
    const processor = processors[collection];
    if (!processor) {
        throw new Error(`No processor found for collection type: ${collection}`);
    }
    return processor();
}
