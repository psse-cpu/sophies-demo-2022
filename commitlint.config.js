const gitmojis = require('commitizen-emoji/dist/data/gitmojis.json')
const { TYPE_NAMES: types } = require('commitizen-emoji/dist/constants/types')

const gitmojiLookup = new Map(
  gitmojis.map((gitmoji) => [gitmoji.code, gitmoji.emoji])
)
const typeEnum = types.map(
  ([code, text]) => `${gitmojiLookup.get(code)} ${text}`
)

// prettier-ignore
const defaultHeaderPatternWithEmoji =
  `^(${typeEnum.join('|')})(?:\\((.*)\\))?!?: (.*)$`

module.exports = {
  extends: ['@commitlint/config-conventional'],
  parserPreset: {
    parserOpts: {
      headerPattern: new RegExp(defaultHeaderPatternWithEmoji),
    },
  },
  rules: {
    'type-enum': [2, 'always', typeEnum],
  },
}
