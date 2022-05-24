#!/usr/bin/env bash

./extract-badges.js && \
git add README.md && \
git diff-index --quiet HEAD || git commit -m '📝 docs: update README badges'