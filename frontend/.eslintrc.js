/* eslint-disable unicorn/prefer-module */

module.exports = {
  rules: {
    'unicorn/prevent-abbreviations': [
      'error',
      {
        allowList: {
          props: true,
        },
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
