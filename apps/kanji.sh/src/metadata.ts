import { CollectionType } from '@kanji-sh/models';

export const PreBuiltCollections = [CollectionType.JLPT];

export interface CollectionCardData {
    key: string;
    files: Array<FileCardData>;
}

export type FileCardData = {
    key: string;
    collectionKey: string;
    title: string;
    description: string;
    metaColor: string;
};

const gradesData: CollectionCardData = {
    key: 'grade',
    files: []
};
const gradeColors = ['#AEEA00', '#00E676', '#0091EA', '#6200EA', '#AA00FF', '#D50000'];
for (let i = 1; i <= 6; i++) {
    gradesData.files.push({
        key: `g-${i}`,
        collectionKey: 'grade',
        title: `G${i}`,
        description: `Grade ${i} Kanji`,
        metaColor: gradeColors[i - 1]
    });
}

const JLPTData: CollectionCardData = {
    key: 'jlpt',
    files: []
};

const jlptColors = ['#39c370', '#c6a737', '#e89843', '#ca3f4e', '#ab1c2b'];
let colorCounter = 0;
for (let i = 5; i >= 1; i--) {
    JLPTData.files.push({
        key: `n-${i}`,
        collectionKey: 'jlpt',
        title: `N${i}`,
        description: `JLPT Level N${i} Kanji`,
        metaColor: jlptColors[colorCounter++]
    });
}

const wanikaniData: CollectionCardData = {
    key: 'wanikani',
    files: []
};

const WKColors = ['#2ea36e', '#00aaff', '#ee505e'];
for (let level = 1; level <= 60; level++) {
    const colorIndex = Math.floor((level - 1) / 20);
    wanikaniData.files.push({
        key: `wk-${level}`,
        collectionKey: 'wanikani',
        title: `WK ${level}`,
        description: `Wanikani Level ${level} Kanji`,
        metaColor: WKColors[colorIndex]
    });
}

// TODO: Retrieve file metadata from generator rather than calculating here

const kanjiGardenData: CollectionCardData = {
    key: 'kanjigarden',
    files: []
};

for (let i = 0, fileCounter = 1; i <= 2645; i += 50, fileCounter++) {
    kanjiGardenData.files.push({
        key: `kg-${fileCounter}`,
        collectionKey: 'kanjigarden',
        title: `KG${fileCounter}`,
        description: `KanjiGarden Kanji ${i + 1}-${Math.min(fileCounter * 50, 2645)}`,
        metaColor: '#e2506d'
    });
}

const frequencyData: CollectionCardData = {
    key: 'frequency',
    files: []
};

for (let i = 0, fileCounter = 1; i < 1000; i += 50, fileCounter++) {
    frequencyData.files.push({
        key: `f-${fileCounter}`,
        collectionKey: 'frequency',
        title: `F${fileCounter}`,
        description: `Kanji with frequency ${i + 1}-${i + 50}`,
        metaColor: '#616161'
    });
}

export const METADATA: Map<string, CollectionCardData> = new Map<string, CollectionCardData>();
METADATA.set('jlpt', JLPTData);
METADATA.set('grade', gradesData);
METADATA.set('wanikani', wanikaniData);
METADATA.set('frequency', frequencyData);
METADATA.set('kanjigarden', kanjiGardenData);
