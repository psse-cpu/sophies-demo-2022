#!/usr/bin/env node

const fs = require('fs')
const path = require('path')
const { execSync } = require('child_process')

const frontendReadme = fs
  .readFileSync(path.join(__dirname, 'frontend/README.md'))
  .toString()
const backendReadme = fs
  .readFileSync(path.join(__dirname, 'backend/README.md'))
  .toString()
const rootReadme = fs.readFileSync(path.join(__dirname, 'README.md')).toString()

const frontendRegex =
  /!\[Statements]\(https:\/\/img\.shields\.io\/badge\/Frontend[^)]+\)/
const backendRegex =
  /!\[Statements]\(https:\/\/img\.shields\.io\/badge\/Backend[^)]+\)/

const frontendBadge = frontendRegex.exec(frontendReadme)[0]
const backendBadge = backendRegex.exec(backendReadme)[0]

const newReadme = rootReadme
  .replace(frontendRegex, frontendBadge)
  .replace(backendRegex, backendBadge)

fs.writeFileSync(path.join(__dirname, 'README.md'), newReadme)

execSync('git add README.md', {
  cwd: __dirname,
  encoding: 'utf-8', // eslint-disable-line unicorn/text-encoding-identifier-case -- follow the docs
})

execSync(
  "git diff-index --quiet HEAD || git commit -m '📝 docs: update README badges'",
  {
    cwd: __dirname,
    encoding: 'utf-8', // eslint-disable-line unicorn/text-encoding-identifier-case -- follow the docs
  }
)
