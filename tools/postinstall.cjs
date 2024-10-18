const fs = require('fs');
const path = require('path');
const { workspaceRoot } = require('@nx/devkit');

const isVercel = process.env.VERCEL === '1';

if (isVercel) {
    // Workaround for → Error: Missing "root" route file in /vercel/path0/app
    // Move the app directory to root so that Vercel can refer it
    fs.cpSync(
        path.resolve(workspaceRoot, 'apps/kanji.sh/app'),
        path.resolve(workspaceRoot, 'app'),
        {
            recursive: true,
            force: true
        }
    );
}
