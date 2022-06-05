import { CollectionType } from '@common/models';

export const PreBuiltCollections = [CollectionType.JLPT];

export interface CollectionCardData {
    key: string;
    title: string;
    heading: string;
    description: string;
    metaColor: string;
    backgroundImageUrl: string;
    files: Array<FileCardData>;
}

export type FileCardData = {
    key: string;
    title: string;
    description: string;
    metaColor: string;
};

const gradesData: CollectionCardData = {
    key: 'grade',
    title: 'GRADE',
    heading: 'Japan School Grades',
    description:
        'List of 1,026 kanji for Japanese students in elementary school, from 1st grade to sixth grade.',
    metaColor: '#5C9F4F',
    backgroundImageUrl: '/assets/png/grade.png',
    files: []
};
const gradeColors = ['#AEEA00', '#00E676', '#0091EA', '#6200EA', '#AA00FF', '#D50000'];
for (let i = 1; i <= 6; i++) {
    gradesData.files.push({
        key: `g-${i}`,
        title: `G${i}`,
        description: `Grade ${i} Kanji`,
        metaColor: gradeColors[i - 1],
    });
}

const JLPTData: CollectionCardData = {
    key: 'jlpt',
    title: 'JLPT',
    heading: 'JLPT',
    description:
        'The Official Worldwide Japanese-Language Proficiency Test, operated by the Japan Foundation and JEES.',
    metaColor: '#1A7EC3',
    backgroundImageUrl: '/assets/png/jlpt.png',
    files: []
};

const jlptColors = ['#39c370', '#c6a737', '#e89843', '#ca3f4e', '#ab1c2b'];
let colorCounter = 0;
for (let i = 5; i >= 1; i--) {
    JLPTData.files.push({
        key: `n-${i}`,
        title: `N${i}`,
        description: `JLPT Level N${i} Kanji`,
        metaColor: jlptColors[colorCounter++],
    });
}

const wanikaniData: CollectionCardData = {
    key: 'wanikani',
    title: 'WANIKANI',
    heading: 'Wanikani',
    description:
        'WaniKani is a Japanese radicals, kanji, and vocabulary learning web app that uses mnemonics and SRS to make kanji learning simple.',
    metaColor: '#00AAFF',
    backgroundImageUrl: '/assets/png/wanikani.png',
    files: []
};

const WKColors = ['#2ea36e', '#00aaff', '#ee505e'];
for (let level = 1; level <= 60; level++) {
    const colorIndex = Math.floor((level - 1) / 20);
    wanikaniData.files.push({
        key: `wk-${level}`,
        title: `WK ${level}`,
        description: `Wanikani Level ${level} Kanji`,
        metaColor: WKColors[colorIndex],
    });
}

// TODO: Retrieve file metadata from generator rather than calculating here

const kanjiGardenData: CollectionCardData = {
    key: 'kanjigarden',
    heading: 'Kanji Garden',
    title: 'KANJI GARDEN',
    description:
        'Kanji Garden is a free mnemonic-based SRS kanji learning tool that features about 2600 kanji.',
    metaColor: '#e2506d',
    backgroundImageUrl: '/assets/png/kanjigarden.png',
    files: []
};

for (let i = 0, fileCounter = 1; i <= 2645; i += 50, fileCounter++) {
    kanjiGardenData.files.push({
        key: `kg-${fileCounter}`,
        title: `KG${fileCounter}`,
        description: `KanjiGarden Kanji ${i + 1}-${Math.min(fileCounter * 50, 2645)}`,
        metaColor: '#e2506d',
    });
}

const frequencyData: CollectionCardData = {
    key: 'frequency',
    heading: 'Frequency',
    title: 'FREQUENCY',
    description: 'Kanji list ordered by the frequency they are used in the Japanese Language.',
    metaColor: '#0D2542',
    backgroundImageUrl: '/assets/png/frequency.png',
    files: []
};

for (let i = 0, fileCounter = 1; i < 1000; i += 50, fileCounter++) {
    frequencyData.files.push({
        key: `f-${fileCounter}`,
        title: `F${fileCounter}`,
        description: `Kanji with frequency ${i + 1}-${i + 50}`,
        metaColor: '#616161',
    });
}

export const METADATA: Map<string, CollectionCardData> = new Map<string, CollectionCardData>();
METADATA.set('jlpt', JLPTData);
METADATA.set('grade', gradesData);
METADATA.set('wanikani', wanikaniData);
METADATA.set('frequency', frequencyData);
METADATA.set('kanjigarden', kanjiGardenData);
