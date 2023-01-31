#!/bin/sh

npx husky install

# 删除已有的 git hooks
rm .husky/commit-msg
rm .husky/pre-commit

# 添加 pre-commit hook
npx husky add .husky/pre-commit "npx --no-install lint-staged"

chmod u+x .husky/commit-msg

# commit-msg hook 添加 commitlint 调用
npx husky add .husky/commit-msg 'npx --no-install commitlint --edit "$1"'
