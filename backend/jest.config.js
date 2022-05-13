module.exports = {
  reporters: [
    'default',
    [
      'jest-html-reporters',
      {
        publicPath: './test/reports/unit',
        filename: 'index.html',
      },
    ],
  ],
  moduleFileExtensions: ['js', 'json', 'ts'],
  rootDir: 'src',
  testRegex: '.*\\.spec\\.ts$',
  transform: {
    '^.+\\.(t|j)s$': [
      '@swc/jest',
      {
        sourceMaps: true,
        jsc: {
          transform: {
            legacyDecorator: true,
            decoratorMetadata: true,
          },
          parser: {
            syntax: 'typescript',
            decorators: true,
          },
        },
      },
    ],
  },
  collectCoverageFrom: ['**/*.(t|j)s'],
  coverageDirectory: '../coverage',
  testEnvironment: 'node',
}
