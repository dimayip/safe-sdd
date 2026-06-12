# contract-guard（codex / opencode 入口）

本文件是 codex / opencode 等宿主的接入入口。它不重复定义逻辑，
完整指令见同目录的 **SKILL.md**。

## 接入说明

当用户表达"做 SDD / 写规格 / 调用 speckit / 开始新功能开发"等意图时：

1. 按 **SKILL.md** 中定义的 5 步流程执行；
2. 契约模板库在 `./lib/`，分类索引在 `./lib/_index.json`，运行时只读本地、不联网；
3. 版本升级由 `./scripts/update.sh` 离线执行，与运行解耦。

> 本 skill 宿主无关：只依赖"读本地文件 + 自然语言编排调用其他命令"这一最大公约数能力，
> 不依赖任何宿主私有的 hook / frontmatter 特性。
