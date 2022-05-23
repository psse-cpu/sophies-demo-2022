module.exports = {
  // parser: '@typescript-eslint/parser',
  // parserOptions: {
  //   project: 'tsconfig.json',
  //   tsconfigRootDir : __dirname,
  //   sourceType: 'module',
  // },
  // plugins: ['@typescript-eslint/eslint-plugin'],
  // extends: [
  //   'plugin:@typescript-eslint/recommended',
  //   'plugin:prettier/recommended',
  // ],
  env: {
    node: true,
    jest: true,
  },
  parser: '@typescript-eslint/parser',
  plugins: ['boundaries'],

  settings: {
    'boundaries/elements': [
      {
        type: 'controllers',
        pattern: '*.controller.ts',
        mode: 'file',
      },
      {
        type: 'resolvers',
        pattern: '*.resolver.ts',
        mode: 'file',
      },
      {
        type: 'entities',
        pattern: '*.entity.ts',
        mode: 'file',
      },
      {
        type: 'services',
        pattern: '*.service.ts',
        mode: 'file',
      },
      {
        type: 'guards',
        pattern: '*.guard.ts',
        mode: 'file',
      },
      {
        type: 'strategies',
        pattern: '*.strategy.ts',
        mode: 'file',
      },
    ],
    'boundaries/include': ['src/**/*.ts'],
    'boundaries/ignore': ['test/**/*.spec.ts', 'src/**/*.spec.ts'],
  },
  extends: ['plugin:boundaries/recommended'],
  rules: {
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'error',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-empty-function': [
      'error',
      {
        allow: ['decoratedFunctions'],
      },
    ],

    'class-methods-use-this': 'off',

    // https://basarat.gitbook.io/typescript/main-1/defaultisbad
    'import/prefer-default-export': 'off',

    // architecture
    'boundaries/element-types': [
      'error',
      {
        default: 'disallow',
        rules: [
          {
            from: ['controllers', 'resolvers', 'services'],
            allow: ['services', 'entities', 'guards'],
          },
          {
            from: 'entities',
            allow: ['entities'],
          },
          {
            from: 'strategies',
            allow: ['entities', 'services'],
          },
        ],
      },
    ],
    'boundaries/external': [
      'error',
      {
        default: 'allow',
        rules: [
          {
            // these should not know that they're dealing with TypeORM
            // only services know
            from: ['controllers', 'resolvers', 'guards', 'strategies'],
            disallow: ['typeorm', '@nestjs/typeorm'],
          },
        ],
      },
    ],
  },
  overrides: [
    {
      files: ['src/**/*.resolver.ts'],
      rules: {
        '@typescript-eslint/no-unused-vars': [
          'error',
          {
            argsIgnorePattern: '^_|^returns$',
            varsIgnorePattern: '^_',
          },
        ],
      },
    },
  ],
}
