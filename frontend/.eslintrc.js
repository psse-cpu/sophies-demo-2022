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
      files: ['src/**/*.graphql'],
      parser: '@graphql-eslint/eslint-plugin',
      parserOptions: {
        schema: './schema.graphql',
        operations: './src/**/*.graphql',
      },
      extends: 'plugin:@graphql-eslint/operations-all',
    },
  ],
}
