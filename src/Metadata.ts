export type GroupData = {
    heading: String,
    files: Array<FileData>
}

export type FileData = {
    title: String
    description: String,
    metaColor: string
    filePath: string
}

const pdfFileDirectory = `${process.env.PUBLIC_URL}/pdf`

const gradesData: GroupData = {
    heading: "Japan School Grades",
    files: []
};
const gradeColors = ['#AEEA00', '#00E676', '#0091EA', '#6200EA', '#AA00FF', '#D50000']
for (let i = 1; i <= 6; i++) {
    gradesData.files.push({
        title: `G${i}`,
        description: `Grade ${i} Kanji`,
        metaColor: gradeColors[i - 1],
        filePath: `${pdfFileDirectory}/grade/g${i}.pdf`
    });
}

const JLPTData: GroupData = {
    heading: "JLPT",
    files: []
};

const jlptColors = ['#39c370', '#c6a737', '#e89843', '#ca3f4e', '#ab1c2b']
let colorCounter = 0
for (let i = 5; i >= 1; i--) {
    JLPTData.files.push({
        title: `N${i}`,
        description: `JLPT Level N${i} Kanji`,
        metaColor: jlptColors[colorCounter++],
        filePath: `${pdfFileDirectory}/jlpt/n${i}.pdf`
    });
}

const wanikaniData: GroupData = {
    heading: "Wanikani",
    files: []
};

const WKColors = ['#2ea36e', '#00aaff', '#ee505e']
for (let level = 1; level <= 60; level++) {
    const colorIndex = Math.floor((level - 1) / 20);
    wanikaniData.files.push({
        title: `WK ${level}`,
        description: `Wanikani Level ${level} Kanji`,
        metaColor: WKColors[colorIndex],
        filePath: `${pdfFileDirectory}/wanikani/${level}.pdf`
    });
}

const frequencyData: GroupData = {
    heading: "Frequency",
    files: [
        {
            title: `F`,
            description: `Kanji from frequency 1 to 1000`,
            metaColor: '#616161',
            filePath: `${pdfFileDirectory}/frequency/all.pdf`
        }
    ]
};

export const data: Array<GroupData> = [JLPTData, gradesData, wanikaniData, frequencyData];
