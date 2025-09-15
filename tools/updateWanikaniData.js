import fs from 'fs';
import process from 'node:process';
import { URLSearchParams } from 'node:url';

import fetch from 'node-fetch';

const WRITE_LOCATION = './libs/printer/assets/sources/wanikani';
const WK_API_KEY = process.env.WK_API_KEY;

const updateWanikaniData = async () => {
    // Ensure API key is set
    if (!WK_API_KEY) {
        throw new Error('Wanikani API key is not set in environment variables.');
    }

    // Ensure the directory exists
    if (!fs.existsSync(WRITE_LOCATION)) {
        fs.mkdirSync(WRITE_LOCATION, { recursive: true });
    }

    const levels = Array.from({ length: 60 }, (_, i) => i + 1);
    await Promise.all(
        levels.map(async (level) => {
            const paramsString = new URLSearchParams({
                levels: level,
                types: 'kanji',
                hidden: false
            }).toString();

            const apiResponse = await fetch(
                `https://api.wanikani.com/v2/subjects?${paramsString}`,
                {
                    method: 'GET',
                    headers: {
                        'Wanikani-Revision': '20170710',
                        Authorization: `Bearer ${WK_API_KEY}`
                    }
                }
            );
            if (!apiResponse.ok) {
                throw new Error(
                    `Wanikani API request failed with status ${apiResponse.status}: ${apiResponse.statusText}`
                );
            }

            const response = await apiResponse.json();
            const sortedKanji = response.data.sort((a, b) => a.lesson_position - b.lesson_position);
            const levelData = sortedKanji.map((item) => item.data.slug).join('\n');
            const writePath = `${WRITE_LOCATION}/${level}.source`;
            fs.writeFileSync(writePath, levelData + '\n');
        })
    );
};

updateWanikaniData()
    .then(() => {
        console.log('Wanikani source update completed successfully.');
        process.exit(0);
    })
    .catch((error) => {
        console.error('Error updating Wanikani source:', error);
        process.exit(1);
    });
