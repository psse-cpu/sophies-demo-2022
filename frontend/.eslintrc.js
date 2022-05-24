module.exports = {
  rules: {
    'unicorn/prevent-abbreviations': [
      'error',
      {
        allowList: {
          props: true,
        },
        replacements: {
          props: {
            properties: false,
          },
          env: {
            environment: false,
          },
        },
        ignore: [/^props$/i, /^env$/i],
      },
    ],
  },
  overrides: [
    {
      files: ['**/*.vue', '**/*.spec.ts'],
      rules: {
        'unicorn/filename-case': [
          'error',
          {
            cases: { pascalCase: true, camelCase: true },
            ignore: ['^quasar.config.js$'],
          },
        ],
      },
    },
  ],
}
