import fs from 'node:fs';
import path from 'node:path';

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
        copyRequiredDirectory(path.join(projectDir, 'public'), path.join(distDir, 'public'));
        copyRequiredDirectory(
            path.join(projectDir, 'print-assets'),
            path.join(distDir, 'print-assets')
        );

        // The API trace resolves files under apps/kanji.sh/print-assets at runtime.
        copyRequiredDirectory(
            path.join(projectDir, 'print-assets'),
            path.join(distDir, 'apps', 'kanji.sh', 'print-assets')
        );
    }
};

export default adapter;
