import { CollectionType } from '@common/models';
import Config from 'app/config';

export const PreBuiltCollections = [CollectionType.JLPT];

export interface CollectionCardData {
    collectionKey: string;
    title: string;
    description: string;
    metaColor: string;
    backgroundImageUrl: string;
}

export type GroupData = {
    heading: string;
    files: Array<FileData>;
};

export type FileData = {
    title: string;
    description: string;
    metaColor: string;
    filePath: string;
};

const pdfFileDirectory = Config.pdfStoragePath;

const gradesData: GroupData = {
    heading: 'Japan School Grades',
    files: []
};
const gradeColors = ['#AEEA00', '#00E676', '#0091EA', '#6200EA', '#AA00FF', '#D50000'];
for (let i = 1; i <= 6; i++) {
    gradesData.files.push({
        title: `G${i}`,
        description: `Grade ${i} Kanji`,
        metaColor: gradeColors[i - 1],
        filePath: `${pdfFileDirectory}/grade/g${i}.pdf`
    });
}

const JLPTData: GroupData = {
    heading: 'JLPT',
    files: []
};

const jlptColors = ['#39c370', '#c6a737', '#e89843', '#ca3f4e', '#ab1c2b'];
let colorCounter = 0;
for (let i = 5; i >= 1; i--) {
    JLPTData.files.push({
        title: `N${i}`,
        description: `JLPT Level N${i} Kanji`,
        metaColor: jlptColors[colorCounter++],
        filePath: `${pdfFileDirectory}/jlpt/n${i}.pdf`
    });
}

const wanikaniData: GroupData = {
    heading: 'Wanikani',
    files: []
};

const WKColors = ['#2ea36e', '#00aaff', '#ee505e'];
for (let level = 1; level <= 60; level++) {
    const colorIndex = Math.floor((level - 1) / 20);
    wanikaniData.files.push({
        title: `WK ${level}`,
        description: `Wanikani Level ${level} Kanji`,
        metaColor: WKColors[colorIndex],
        filePath: `${pdfFileDirectory}/wanikani/${level}.pdf`
    });
}

// TODO: Retrieve file metadata from generator rather than calculating here

const kanjiGardenData: GroupData = {
    heading: 'Kanji Garden',
    files: []
};

let fileCounter = 0;
for (let i = 0; i <= 2645; i += 50) {
    kanjiGardenData.files.push({
        title: `KG${++fileCounter}`,
        description: `KanjiGarden Kanji ${i + 1}-${Math.min(fileCounter * 50, 2645)}`,
        metaColor: '#e2506d',
        filePath: `${pdfFileDirectory}/kanjigarden/${i + 1}-${i + 50}.pdf`
    });
}

const frequencyData: GroupData = {
    heading: 'Frequency',
    files: []
};

fileCounter = 0;
for (let i = 0; i < 1000; i += 50) {
    frequencyData.files.push({
        title: `F${++fileCounter}`,
        description: `Kanji with frequency ${i + 1}-${i + 50}`,
        metaColor: '#616161',
        filePath: `${pdfFileDirectory}/frequency/${i + 1}-${i + 50}.pdf`
    });
}

export const data: Array<GroupData> = [
    JLPTData,
    gradesData,
    wanikaniData,
    frequencyData,
    kanjiGardenData
];

export const mappedData: Map<string, GroupData> = new Map<string, GroupData>();
mappedData.set('jlpt', JLPTData);
mappedData.set('grade', gradesData);
mappedData.set('wanikani', wanikaniData);
mappedData.set('frequency', frequencyData);
mappedData.set('kanjigarden', kanjiGardenData);

export const METADATA: Record<string, Omit<CollectionCardData, 'collectionKey'>> = {
    jlpt: {
        title: 'JLPT',
        description:
            'The Official Worldwide Japanese-Language Proficiency Test, operated by the Japan Foundation and JEES.',
        metaColor: '#1A7EC3',
        backgroundImageUrl: '/assets/png/jlpt.png'
    },
    grade: {
        title: 'GRADE',
        description:
            'List of 1,026 kanji for Japanese students in elementary school, from 1st grade to sixth grade.',
        metaColor: '#5C9F4F',
        backgroundImageUrl: '/assets/png/grade.png'
    },
    wanikani: {
        title: 'WANIKANI',
        description:
            'WaniKani is a Japanese radicals, kanji, and vocabulary learning web app that uses mnemonics and SRS to make kanji learning simple.',
        metaColor: '#00AAFF',
        backgroundImageUrl: '/assets/png/wanikani.png'
    },
    kanjigarden: {
        title: 'KANJI GARDEN',
        description:
            'Kanji Garden is a free mnemonic-based SRS kanji learning tool that features about 2600 kanji.',
        metaColor: '#e2506d',
        backgroundImageUrl: '/assets/png/kanjigarden.png'
    },
    frequency: {
        title: 'FREQUENCY',
        description: 'Kanji list ordered by the frequency they are used in the Japanese Language.',
        metaColor: '#0D2542',
        backgroundImageUrl: '/assets/png/frequency.png'
    }
};
