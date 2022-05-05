const emojiPattern =
  '(?:\\u00a9|\\u00ae|[\\u2000-\\u3300]|\\ud83c[\\ud000-\\udfff]|\\ud83d[\\ud000-\\udfff]|\\ud83e[\\ud000-\\udfff])'

const defaultHeaderPatternWithEmoji = 
  `^(${emojiPattern}\\s\\w*)(?:\\((.*)\\))?!?: (.*)$`


module.exports = {
  extends: ['@commitlint/config-conventional'],
  parserPreset: {
    parserOpts: {
      headerPattern: new RegExp(defaultHeaderPatternWithEmoji)
    }
  },
  rules: {
    "type-enum": [
      2,
      'always',
      [
        '🎨 codestyle',
        '⚡️ perf',
        '🔥 prune',
        '🐛 bugfix',
        '🚑️ hotfix',
        '✨ feature',
        '📝 docs',
        '🚀 deploy',
        '💄 ui',
        '🎉 init',
        '✅ tests',
        '🔒️ security',
        '🔖 tags',
        '🚨 lint',
        '🚧 wip',
        '💚 fixci',
        '⬇️ downgrade',
        '⬆️ upgrade',
        '📌 depver',
        '👷 ci',
        '📈 analytics',
        '♻️ refactor',
        '➕ depadd',
        '➖ deprm',
        '🔧 config',
        '🔨 devscripts',
        '🌐 i18n',
        '✏️ typo',
        '💩 flaky',
        '⏪️ revert',
        '🔀 merge',
        '📦️ binary',
        '👽️ contract',
        '🚚 relocate',
        '📄 license',
        '💥 breaking',
        '🍱 assets',
        '♿️ a11y',
        '💡 comment',
        '🍻 gibberish',
        '💬 text',
        '🗃️ db',
        '🔊 addlogs',
        '🔇 rmlogs',
        '👥 contrib',
        '🚸 ux',
        '🏗️ arch',
        '📱 responsive',
        '🤡 mock',
        '🥚 joke',
        '🙈 gitignore',
        '📸 snapshots',
        '⚗️ poc',
        '🔍️ seo',
        '🏷️ types',
        '🌱 seed',
        '🚩 flags',
        '🥅 detect',
        '💫 animation',
        '🗑️ deprecate',
        '🛂 auth',
        '🩹 fix',
        '🧐 explore',
        '⚰️ clean',
        '🧪 fall'
      ]
    ]
  }
}
