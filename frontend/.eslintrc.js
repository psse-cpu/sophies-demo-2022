

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
      files: ['**/*.vue'],
      rules: {
        'unicorn/filename-case': [
          'error',
          {
            case: 'pascalCase',
            ignore: ['^quasar.config.js$'],
          },
        ],
      },
    },
  ],
}
