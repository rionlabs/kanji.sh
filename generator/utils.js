const fs = require('fs');
const path = require('path');

const config = {
    srcDir: "sources",
    outDir: "build",
    templateAbsolutePath: path.relative("/", "template/page.html"),
}

const ensureDirectories = (...dirNames) => {
    for (const dirName of dirNames) {
        fs.existsSync(dirName) || fs.mkdirSync(dirName, {recursive: true});
    }
};

ensureDirectories(config.srcDir, config.outDir)

const readSourceFile = (inputFilePath) => {
    const content = fs.readFileSync(inputFilePath, {encoding: 'utf-8', flag: 'r'});
    return content.split('\n').filter(Boolean);
}

const generatePageTitle = (sourceName, sourceGroup) => {
    switch (sourceName) {
        case 'frequency': // Grouping
            return `Frequency ${sourceGroup}`;
        case 'grade': // G1, G2, G3, ...
            return `Grade ${sourceGroup.charAt(1)}`;
        case 'jlpt': // N1, N2, N3, ...
            return `JLPT ${sourceGroup.toUpperCase()}`;
        case 'kanjigarden': // Grouping
            return `KanjiGarden ${sourceGroup}`;
        case 'wanikani': // 1, 2, 3 ...
            return `Wanikani Level ${sourceGroup}`;
    }
}

module.exports = {
    config,
    ensureDirectories,
    readSourceFile,
    generatePageTitle,
    logger: {
        start: (message) => console.log(`[START] ${message}`),
        done: (message) => console.log(`[DONE✓] ${message}`),
        error: (message) => console.error(`[ERROR] ${message}`)
    }
};


