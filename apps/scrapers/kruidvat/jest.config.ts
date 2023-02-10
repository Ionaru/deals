export default {
    coverageDirectory: '../../../coverage/apps/scrapers/kruidvat',
    displayName: 'scrapers-kruidvat',
    globals: {
        'ts-jest': {
            tsconfig: '<rootDir>/tsconfig.spec.json',
        },
    },
    moduleFileExtensions: ['ts', 'js', 'html'],
    preset: '../../../jest.preset.js',
    testEnvironment: 'node',
    transform: {
        '^.+\\.[tj]s$': 'ts-jest',
    },
};
