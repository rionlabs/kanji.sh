import path from 'node:path';

import { workspaceRoot } from '@nx/devkit';
import globals from 'globals';

import baseConfig from '../../eslint.config.js';

const baseTsConfig = path.resolve(workspaceRoot, 'tsconfig.base.json');
const tsConfig = path.resolve(workspaceRoot, 'apps/kanji.sh/tsconfig.json');

const tsConfigPaths = [baseTsConfig, tsConfig];

export default [
    ...baseConfig,
    {
        settings: {
            "import/resolver": {
                "typescript": {
                    "project": tsConfigPaths
                },
                "node": {
                    "project": tsConfigPaths
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
                ...globals.browser,
            },
        }
    }
    // {
    //     ignorePatterns: ["!**/.server", "!**/.client"],
    // }
];

// /** @type {import('eslint').Linter.Config} */
// module.exports = {
//   root: true,
//   parserOptions: {
//     ecmaVersion: "latest",
//     sourceType: "module",
//     ecmaFeatures: {
//       jsx: true,
//     },
//   },
//   env: {
//     browser: true,
//     commonjs: true,
//     es6: true,
//   },
//
//
//   // Base config
//   extends: ["eslint:recommended"],
//
//   overrides: [
//     // React
//     {
//       files: ["**/*.{js,jsx,ts,tsx}"],
//       plugins: ["react", "jsx-a11y"],
//       extends: [
//         "plugin:react/recommended",
//         "plugin:react/jsx-runtime",
//         "plugin:react-hooks/recommended",
//         "plugin:jsx-a11y/recommended",
//       ],
//       settings: {
//         react: {
//           version: "detect",
//         },
//         formComponents: ["Form"],
//         linkComponents: [
//           { name: "Link", linkAttribute: "to" },
//           { name: "NavLink", linkAttribute: "to" },
//         ],
//         "import/resolver": {
//           typescript: {},
//         },
//       },
//     },
//
//     // Typescript
//     {
//       files: ["**/*.{ts,tsx}"],
//       plugins: ["@typescript-eslint", "import"],
//       parser: "@typescript-eslint/parser",
//       settings: {
//         "import/resolver": {
//           node: {
//             extensions: [".ts", ".tsx"],
//           },
//           typescript: {
//             alwaysTryTypes: true,
//           },
//         },
//       },
//       extends: [
//         "plugin:@typescript-eslint/recommended",
//         "plugin:import/recommended",
//         "plugin:import/typescript",
//       ],
//     },
//
//     // Node
//     {
//       files: [".eslintrc.cjs"],
//       env: {
//         node: true,
//       },
//     },
//   ],
// };
