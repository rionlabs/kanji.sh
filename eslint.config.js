import js from '@eslint/js';
import nxEslintPlugin from '@nx/eslint-plugin';
import importPlugin from 'eslint-plugin-import';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
// eslint-disable-next-line import/no-unresolved
import tsESLint from 'typescript-eslint';

export default tsESLint.config(
    js.configs.recommended,
    eslintPluginPrettierRecommended,
    importPlugin.flatConfigs.recommended,
    ...tsESLint.configs.recommended,
    {
        plugins: {
            '@nx': nxEslintPlugin
        }
    },
    {
        ignores: ['**/.next/**', '**/node_modules/**', '**/dist/**']
    },
    /* TypeScript Settings */
    {
        files: ['**/*.@{ts,tsx,mts}'],
        plugins: {
            '@typescript-eslint': tsESLint.plugin
        },
        languageOptions: {
            parser: tsESLint.parser,
            parserOptions: {
                project: true
            }
        },
        settings: {
            ...importPlugin.configs.typescript.settings,
            'import/parsers': {
                '@typescript-eslint/parser': ['.ts', '.tsx', '.mts']
            }
        },
        rules: {
            'no-unused-vars': 'off',
            '@typescript-eslint/no-unused-vars': ['error']
        }
    },
    /* Import Rules */
    {
        files: ['**/*.@(ts|tsx|mts|js|jsx|mjs)'],
        languageOptions: {
            ecmaVersion: 'latest',
            sourceType: 'module',
            parser: tsESLint.parser
        },
        settings: {
            typescript: {
                project: true
            }
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
                        'object'
                    ],
                    pathGroups: [
                        {
                            pattern: '@kanji-sh/**',
                            group: 'internal',
                            position: 'after'
                        },
                        {
                            pattern: 'react',
                            group: 'builtin',
                            position: 'before'
                        }
                    ],
                    distinctGroup: true,
                    pathGroupsExcludedImportTypes: ['react'],
                    alphabetize: {
                        order: 'asc',
                        orderImportKind: 'asc',
                        caseInsensitive: true
                    }
                }
            ]
        }
    }
);
