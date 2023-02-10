export default {
    coverageDirectory: '../../coverage/libs/api',
    displayName: 'api',
    globals: {
        'ts-jest': {
            tsconfig: '<rootDir>/tsconfig.spec.json',
        },
    },
    moduleFileExtensions: ['ts', 'js', 'html'],
    preset: '../../jest.preset.js',
    transform: {
        '^.+\\.[tj]s$': 'ts-jest',
    },
};
