#!/usr/bin/env bash

set -e

./extract-badges.js
git add README.md
git update-index --refresh
git diff-index --quiet HEAD -- || git commit -m '📝 docs: update README badges'