// TODO: gather all subdirectory .eslint config in one place - HERE
// labels: enhancement
// use overrides for subdirectories, easier extraction into a eslint-config-xxx package
module.exports = {
  // https://eslint.org/docs/user-guide/configuring#configuration-cascading-and-hierarchy
  // This option interrupts the configuration hierarchy at this file
  // Remove this if you have an higher level ESLint config file (it usually happens into a monorepos)
  root: true,

  // https://eslint.vuejs.org/user-guide/#how-to-use-a-custom-parser
  // Must use parserOptions instead of "parser" to allow vue-eslint-parser to keep working
  // `parser: 'vue-eslint-parser'` is already included with any 'plugin:vue/**' config and should be omitted
  parserOptions: {
    parser: require.resolve('@typescript-eslint/parser'),
    extraFileExtensions: ['.vue'],
  },

  env: {
    browser: true,
    es2021: true,
    node: true,
    'vue/setup-compiler-macros': true,
  },

  // Rules order is important, please avoid shuffling them
  extends: [
    // Base ESLint recommended rules
    // 'eslint:recommended',

    // ADDED 5/6/2022: Airbnb Style Guide is very strict
    'airbnb-base',

    // https://github.com/typescript-eslint/typescript-eslint/tree/master/packages/eslint-plugin#usage
    // ESLint typescript rules
    'plugin:@typescript-eslint/recommended',

    // Uncomment any of the lines below to choose desired strictness,
    // but leave only one uncommented!
    // See https://eslint.vuejs.org/rules/#available-rules
    'plugin:vue/vue3-essential', // Priority A: Essential (Error Prevention)
    // 'plugin:vue/vue3-strongly-recommended', // Priority B: Strongly Recommended (Improving Readability)
    // 'plugin:vue/vue3-recommended', // Priority C: Recommended (Minimizing Arbitrary Choices and Cognitive Overhead)

    // https://github.com/prettier/eslint-config-prettier#installation
    // usage with Prettier, provided by 'eslint-config-prettier'.
    // Turn-off all Airbnb stylistic rules
    'prettier',
    'plugin:unicorn/recommended',
    'plugin:eslint-comments/recommended',
    'plugin:jsonc/base',
  ],

  plugins: [
    // required to apply rules which need type information
    '@typescript-eslint',

    // https://eslint.vuejs.org/user-guide/#why-doesn-t-it-work-on-vue-files
    // required to lint *.vue files
    'vue',

    // https://github.com/typescript-eslint/typescript-eslint/issues/389#issuecomment-509292674
    // Prettier has not been included as plugin to avoid performance impact
    // add it as an extension for your IDE
    'no-secrets',
  ],

  globals: {
    ga: 'readonly', // Google Analytics
    cordova: 'readonly',
    __statics: 'readonly',
    __QUASAR_SSR__: 'readonly',
    __QUASAR_SSR_SERVER__: 'readonly',
    __QUASAR_SSR_CLIENT__: 'readonly',
    __QUASAR_SSR_PWA__: 'readonly',
    process: 'readonly',
    Capacitor: 'readonly',
    chrome: 'readonly',
  },

  // add your custom rules here
  rules: {
    'prefer-promise-reject-errors': 'off',

    quotes: ['warn', 'single', { avoidEscape: true }],

    // this rule, if on, would require explicit return type on the `render` function
    '@typescript-eslint/explicit-function-return-type': 'off',

    '@typescript-eslint/explicit-module-boundary-types': 'error',

    // in plain CommonJS modules, you can't use `import foo = require('foo')` to pass this rule, so it has to be disabled
    '@typescript-eslint/no-var-requires': 'off',

    '@typescript-eslint/no-unused-vars': [
      'error',
      {
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_',
      },
    ],

    'no-shadow': 'off',
    '@typescript-eslint/no-shadow': 'error',
    'no-underscore-dangle': 'off',

    // The core 'no-unused-vars' rules (in the eslint:recommended ruleset)
    // does not work with type definitions
    'no-unused-vars': 'off',

    // allow debugger during development only
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',

    // turn off eslint-plugin-import rules handled by TS
    'import/no-unresolved': 'off',
    'import/extensions': 'off',
    'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
    'import/prefer-default-export': 'off',
    'import/no-default-export': 'error',

    'no-useless-constructor': 'off',
    '@typescript-eslint/no-useless-constructor': ['error'],
    'eslint-comments/require-description': 'warn',
    'eslint-comments/no-unused-disable': 'warn',
    'no-secrets/no-secrets': ['error'],

    'unicorn/no-array-callback-reference': 'off', // false positives
    'unicorn/no-array-for-each': 'off',
  },
  overrides: [
    {
      files: ['**/*.spec.ts'],
      extends: ['plugin:jest/recommended', 'plugin:jest/style'],
      rules: {
        'arrow-body-style': 'off',
        // some mocks must return undefined, and autofixing will produce TS errors
        'unicorn/no-useless-undefined': 'off',

        'jest/consistent-test-it': 'error',
        'jest/max-nested-describe': ['error', { max: 2 }],
        'jest/no-duplicate-hooks': 'error',
        'jest/prefer-comparison-matcher': 'error',
        'jest/prefer-equality-matcher': 'error',
        'jest/prefer-hooks-on-top': 'error',
        'jest/prefer-spy-on': 'error',
        'jest/prefer-strict-equal': 'error',
        'jest/prefer-todo': 'error',
        'jest/require-top-level-describe': 'error',
        'jest/expect-expect': [
          'error',
          { assertFunctionNames: ['expect', 'request.**.expect'] },
        ],
        'jest/prefer-lowercase-title': [
          'error',
          { ignoreTopLevelDescribe: true },
        ],
      },
    },
    {
      // config files use CommonJS
      files: [
        '*.js',
        'backend/*.js',
        'frontend/*.js',
        'frontend/src/{env,quasar,shims-vue}.d.ts',
      ],
      rules: {
        'unicorn/prefer-module': 'off',
      },
    },
  ],
}
