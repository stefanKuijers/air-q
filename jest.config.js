module.exports = {
    rootDir: './',
    roots: ['<rootDir>'],
    modulePaths: ['<rootDir>'],
    setupFilesAfterEnv: ['<rootDir>test/jest.setup.js'],
    transform: {
        '^.+\\.tsx?$': 'ts-jest',
        '^.+\\.js$': 'babel-jest',
    },
    testRegex: '((\\.|/)(test|spec))\\.(jsx?|tsx?)$',
    testPathIgnorePatterns: ['<rootDir>/public'],
    collectCoverageFrom: ['<rootDir>(components|pages)/**/{!(index.ts|*.snap|*.interfaces.ts|*.enums.ts),}'],
    moduleDirectories: ['node_modules'],
    moduleFileExtensions: ['ts', 'tsx', 'js', 'json'],
    moduleNameMapper: {
        '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga|css|scss)$':
            '<rootDir>/test/unit/mocks/file.js',
    },
    verbose: false,
    notify: true,
    globals: {
        'ts-jest': {
            tsConfig: '<rootDir>test/tsconfig.jest.json',
        },
    },
};
