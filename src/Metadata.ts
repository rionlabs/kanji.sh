export type GroupData = {
    heading: String,
    files: Array<FileData>
}

export type FileData = {
    title: String
    description: String
    filePath: string
}

const pdfFileDirectory = `${process.env.PUBLIC_URL}/pdf`

const gradesData: GroupData = {
    heading: "Japan School Grades",
    files: []
};

for (let i = 1; i <= 6; i++) {
    gradesData.files.push({
        title: `G${i}`,
        description: `Grade ${i} Kanji`,
        filePath: `${pdfFileDirectory}/grade/g${i}.pdf`
    });
}

const JLPTData: GroupData = {
    heading: "JLPT",
    files: []
};

for (let i = 5; i >= 2; i--) {
    JLPTData.files.push({
        title: `N${i}`,
        description: `JLPT Level N${i} Kanji`,
        filePath: `${pdfFileDirectory}/jlpt/n${i}.pdf`
    });
}

const wanikaniData: GroupData = {
    heading: "Wanikani",
    files: []
};

for (let i = 1; i <= 60; i++) {
    wanikaniData.files.push({
        title: `WK${i}`,
        description: `Wanikani Level ${i} Kanji`,
        filePath: `${pdfFileDirectory}/wanikani/${i}.pdf`
    });
}

const frequencyData: GroupData = {
    heading: "Frequency",
    files: [
        {
            title: `F`,
            description: `Kanji from frequency 1 to 1000`,
            filePath: `${pdfFileDirectory}/frequency/all.pdf`
        }
    ]
};

export const data: Array<GroupData> = [JLPTData, gradesData, wanikaniData, frequencyData];
