import { workspaceRoot } from '@nx/devkit';
import remarkFrontmatter from 'remark-frontmatter';
import remarkMdxFrontmatter from 'remark-mdx-frontmatter';
import { vitePlugin as remix } from '@remix-run/dev';
import path from 'node:path';
import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';
import svgr from 'vite-plugin-svgr';
import mdx from '@mdx-js/rollup';
import { vercelPreset } from '@vercel/remix/vite';

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
                presets: [vercelPreset],
                basename: "/",
                buildDirectory: path.resolve(workspaceRoot, 'dist/apps/kanji.sh'),
                future: {
                    v3_fetcherPersist: true,
                    v3_relativeSplatPath: true,
                    v3_throwAbortReason: true
                },
                serverBuildFile: 'index.js',
                serverModuleFormat: 'esm',
            }),
            svgr(),
            tsconfigPaths({
                root: workspaceRoot,
                configNames: ['tsconfig.json', 'tsconfig.base.json']
            })
        ],
        ssr: {
            noExternal: ['@supabase/supabase-js', "remix-utils"]
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
