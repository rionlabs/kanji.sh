import path from 'node:path';

import { workspaceRoot } from '@nx/devkit';
import { defineConfig } from 'eslint/config';
import globals from 'globals';

import baseConfig from '../../eslint.config.js';

const baseTsConfig = path.resolve(workspaceRoot, 'tsconfig.base.json');
const tsConfig = path.resolve(workspaceRoot, 'apps/kanji.sh/tsconfig.json');

const tsConfigPaths = [baseTsConfig, tsConfig];

export default defineConfig([
    {
        ignores: ['.next/']
    },
    ...baseConfig,
    {
        settings: {
            'import/resolver': {
                typescript: {
                    project: tsConfigPaths
                },
                node: {
                    project: tsConfigPaths
                }
            }
        },
        languageOptions: {
            parserOptions: {
                ecmaFeatures: {
                    jsx: true
                }
            },
            globals: {
                ...globals.browser
            }
        }
    }
]);
