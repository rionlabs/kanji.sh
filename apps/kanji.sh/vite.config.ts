import { workspaceRoot } from '@nx/devkit';
import fs from 'node:fs';
import remarkFrontmatter from 'remark-frontmatter';
import remarkMdxFrontmatter from 'remark-mdx-frontmatter';
import { vitePlugin as remix } from '@remix-run/dev';
import path from 'node:path';
import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';
import svgr from 'vite-plugin-svgr';
import mdx from '@mdx-js/rollup';

const isVercel = process.env.VERCEL === "1";

export default defineConfig(({ mode }) => {
    return {
        cacheDir: path.resolve(workspaceRoot, 'node_modules/.vite'),
        plugins: [
            mdx({
                development: mode === 'development',
                remarkPlugins: [
                    remarkFrontmatter,
                    remarkMdxFrontmatter,
                ]
            }),
            remix({
                basename: "/",
                buildDirectory: path.resolve(workspaceRoot, 'dist/apps/kanji.sh'),
                manifest: true,
                future: {
                    v3_fetcherPersist: true,
                    v3_relativeSplatPath: true,
                    v3_throwAbortReason: true
                },
                serverBuildFile: 'index.js',
                serverModuleFormat: 'esm',
                buildEnd: () => {
                    // For Vercel to deploy, directories need to be moved around
                    if (isVercel) {
                        // Move build to root
                        fs.cpSync(
                            path.resolve(workspaceRoot, 'dist/apps/kanji.sh/'),
                            path.resolve(workspaceRoot, 'build/'),
                            { recursive: true }
                        );
                        // Move server/index.js to build root
                        fs.renameSync(
                            path.resolve(workspaceRoot, 'build/server/index.js'),
                            path.resolve(workspaceRoot, 'build/index.js')
                        );
                        // Move the client assets to root/public directory
                        fs.cpSync(
                            path.resolve(workspaceRoot, 'build/client'),
                            path.resolve(workspaceRoot, 'public'),
                            { recursive: true }
                        );
                    }
                    console.log(`Build complete in ${isVercel ? 'vercel' : 'local'} env!`);
                },
            }),
            svgr(),
            tsconfigPaths({
                root: workspaceRoot,
                configNames: ['tsconfig.json', 'tsconfig.base.json']
            }),
        ],
        ssr: {
            noExternal: ['@supabase/supabase-js', 'react-i18next', "remix-utils"]
        },
        optimizeDeps: {
            include: ['@supabase/supabase-js']
        },
        server: {
            host: '0.0.0.0',
            port: Number(process.env.PORT) || 4200
        },
    };
});
