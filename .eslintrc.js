module.exports = {
    root: true,
    env: {
        node: true,
        es6: true
    },
    parserOptions: { ecmaVersion: 8 },
    ignorePatterns: ['node_modules/*', '.next/*'],
    extends: ['eslint:recommended'],
    overrides: [
        {
            files: ['**/*.ts', '**/*.tsx'],
            parser: '@typescript-eslint/parser',
            settings: { react: { version: 'detect' } },
            env: {
                browser: true,
                node: true,
                es6: true
            },
            extends: [
                'eslint:recommended',
                'plugin:@typescript-eslint/recommended',
                'plugin:react/recommended',
                'plugin:react-hooks/recommended',
                'plugin:jsx-a11y/recommended',
                'plugin:prettier/recommended'
            ],
            rules: {
                'react/prop-types': 'off',
                'react/react-in-jsx-scope': 'off',
                '@typescript-eslint/no-unused-vars': ['error'],
                '@typescript-eslint/explicit-function-return-type': [
                    'warn',
                    {
                        allowExpressions: true,
                        allowConciseArrowFunctionExpressionsStartingWithVoid: true
                    }
                ],
                'prettier/prettier': ['error', {}, { usePrettierrc: true }]
            }
        },
        {
            files: ['**/*.js'],
            parserOptions: {
                ecmaVersion: 2020,
                sourceType: 'script'
            },
            env: {
                browser: false,
                node: true,
                es6: true
            },
            extends: ['eslint:recommended', 'plugin:prettier/recommended'],
            rules: {
                'prettier/prettier': ['error', {}, { usePrettierrc: true }]
            }
        }
    ]
};
