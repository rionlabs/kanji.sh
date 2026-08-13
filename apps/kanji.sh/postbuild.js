import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';

const copyRequiredDirectory = (sourceDir, targetDir) => {
    if (!fs.existsSync(sourceDir)) {
        throw new Error(`Missing required build directory: ${sourceDir}`);
    }

    fs.mkdirSync(path.dirname(targetDir), { recursive: true });
    fs.cpSync(sourceDir, targetDir, {
        recursive: true
    });
};

/** @type {import('next').NextAdapter} */
const adapter = {
    name: 'kvg-assets-copy',
    async onBuildComplete({ projectDir, distDir }) {
        // Keep the dist output self-contained for Vercel deployments.
        const publicDestination = path.join(process.cwd(), 'public', 'assets');
        copyRequiredDirectory(path.join(projectDir, 'public'), publicDestination);
        console.log('Copied public assets to dist directory.');
        copyRequiredDirectory(
            path.join(projectDir, 'print-assets'),
            path.join(distDir, 'print-assets')
        );
        console.log('Copied print assets to dist directory.');
    }
};

export default adapter;
