#!/bin/sh

# 此脚本合并了用于生成 `ChangeId` 的内容，可以使 `Husky` 用于 `icode` 代码仓库，避免因为没有 `ChangeId` 无法提交代码的问题。

npx husky install

# 删除已有的 git hooks
rm .husky/commit-msg
rm .husky/pre-commit

# 添加 pre-commit hook
npx husky add .husky/pre-commit "npx --no-install lint-staged"

# 下载 icode 的 commit-msg hook，用于生成 ChangeId
chmod u+x .husky/commit-msg

# commit-msg hook 添加 commitlint 调用
npx husky add .husky/commit-msg 'npx --no-install commitlint --edit "$1"'
