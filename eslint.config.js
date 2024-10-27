import js from '@eslint/js';
import nxEslintPlugin from '@nx/eslint-plugin';
import eslintConfigPrettier from 'eslint-config-prettier';
import importPlugin from 'eslint-plugin-import';
import jsonParser from 'jsonc-eslint-parser';
import tsESLint from 'typescript-eslint';

export default tsESLint.config(
    js.configs.recommended,
    eslintConfigPrettier,
    importPlugin.flatConfigs.recommended,
    ...tsESLint.configs.recommended,
    {
        plugins: {
            '@nx': nxEslintPlugin,
        },
    },
    // Typescript Settings
    {
        files: ['**/*.@{ts,tsx,mts,cts}'],
        plugins: {
            '@typescript-eslint': tsESLint.plugin,
        },
        languageOptions: {
            parser: tsESLint.parser,
            parserOptions: {
                project: true,
            },
        },
        settings: {
            ...importPlugin.configs.typescript.settings,
            'import/parsers': {
                '@typescript-eslint/parser': ['.ts', '.tsx', '.mts', '.cts'],
            },
        },
        rules: {
            "no-unused-vars": "off",
            "@typescript-eslint/no-unused-vars": ["error"]
        }
    },
    // Import Rules
    {
        files: ['**/*.@(ts|tsx|mts|cts|js|jsx|mjs|cjs)'],
        languageOptions: {
            ecmaVersion: 'latest',
            sourceType: 'module',
            parser: tsESLint.parser,
        },
        settings: {
            typescript: {
                project: true
            },
        },
        rules: {
            'import/order': [
                'error',
                {
                    'newlines-between': 'always',
                    groups: [
                        'builtin',
                        'external',
                        'internal',
                        ['parent', 'sibling'],
                        'index',
                        'unknown',
                        'object',
                    ],
                    pathGroups: [
                        {
                            pattern: '@kanji-sh/**',
                            group: 'internal',
                            position: 'after',
                        },
                        {
                            pattern: 'react',
                            group: 'builtin',
                            position: 'before',
                        },
                        {
                            pattern: '@remix-run/**',
                            group: 'builtin',
                            position: 'after',
                        },
                    ],
                    distinctGroup: true,
                    pathGroupsExcludedImportTypes: ['react'],
                    alphabetize: {
                        order: 'asc',
                        orderImportKind: 'asc',
                        caseInsensitive: true,
                    },
                },
            ],
        }
    },
    {
        files: ['**/*.json'],
        languageOptions: {
            parser: jsonParser,
        },
        rules: {
            '@nx/dependency-checks': 'error',
        },
    },
    // Packages configurations
    // {
    //     files: ['apps/kanji.sh/**'],
    //     languageOptions: {
    //         parser: tsESLint.parser,
    //         parserOptions: {
    //             project: true
    //         }
    //     }
    // }

);
