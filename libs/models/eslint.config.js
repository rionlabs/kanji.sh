import path from 'node:path';

import { workspaceRoot } from '@nx/devkit';
import globals from 'globals';

import baseConfig from '../../eslint.config.js';

const baseTsConfig = path.resolve(workspaceRoot, 'tsconfig.base.json');
const tsConfig = path.resolve(workspaceRoot, 'libs/models/tsconfig.json');

const tsConfigPaths = [baseTsConfig, tsConfig];

export default [
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
            globals: {
                ...globals.node,
                ...globals.jest
            }
        }
    }
];
