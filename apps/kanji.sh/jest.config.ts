 
export default {
    displayName: 'kanji.sh',
    preset: '../../jest.preset.js',
    transform: {
        '^(?!.*\\.(js|jsx|ts|tsx|css|json)$)': '@nx/react/plugins/jest',
        '^.+\\.[tj]sx?$': ['babel-jest', { presets: ['@nx/next/babel'] }]
    },
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
    coverageDirectory: '../../coverage/apps/kanji.sh'
};
