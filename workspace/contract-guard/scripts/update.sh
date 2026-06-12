#!/usr/bin/env bash
#
# contract-guard 自动升级脚本
# ---------------------------------------------------------------------------
# 职责：离线、低频地把远端契约模板库同步到本地 lib/，与运行时解耦。
# 设计原则（对应 skill 的"消费侧低方差"信条）：
#   - 升级这件"可能失败的事"放在离线时刻，绝不发生在用户正干活的运行时。
#   - 失败就保留旧版本，运行侧永远拿到一份已落地、已验证的本地 lib/。
#   - 通过 min_skill_required 拦截"旧 skill 配新库"的不兼容升级。
#
# 用法：
#   bash scripts/update.sh            # 检查并升级
#   bash scripts/update.sh --check    # 仅检查，不写入（dry-run）
#
# 建议接入定时任务 / CI，例如 crontab 每天一次：
#   0 3 * * *  cd /path/to/contract-guard && bash scripts/update.sh >> .update.log 2>&1
# ---------------------------------------------------------------------------

set -euo pipefail

SKILL_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
LOCAL_MANIFEST="${SKILL_DIR}/manifest.json"
LIB_DIR="${SKILL_DIR}/lib"
DRY_RUN="false"
[[ "${1:-}" == "--check" ]] && DRY_RUN="true"

log() { echo "[contract-guard:update] $*"; }
die() { echo "[contract-guard:update][ERROR] $*" >&2; exit 1; }

# ---- 依赖检查 -------------------------------------------------------------
command -v git  >/dev/null 2>&1 || die "缺少 git，无法同步模板库。"
command -v jq   >/dev/null 2>&1 || die "缺少 jq，无法解析 manifest.json。"

[[ -f "${LOCAL_MANIFEST}" ]] || die "本地 manifest.json 不存在：${LOCAL_MANIFEST}"

# ---- 读取本地版本信息 -----------------------------------------------------
LOCAL_SKILL_VER="$(jq -r '.skill_version'        "${LOCAL_MANIFEST}")"
LOCAL_LIB_VER="$(jq -r '.template_lib_version'   "${LOCAL_MANIFEST}")"
SOURCE_REPO="$(jq -r '.source'                   "${LOCAL_MANIFEST}")"
SOURCE_BRANCH="$(jq -r '.source_branch // "main"' "${LOCAL_MANIFEST}")"

log "本地 skill 版本    : ${LOCAL_SKILL_VER}"
log "本地模板库版本     : ${LOCAL_LIB_VER}"
log "远端模板库源       : ${SOURCE_REPO} (${SOURCE_BRANCH})"

# ---- 拉取远端 manifest 到临时目录 ----------------------------------------
TMP_DIR="$(mktemp -d)"
trap 'rm -rf "${TMP_DIR}"' EXIT

log "正在检出远端模板库（浅克隆）..."
if ! git clone --depth 1 --branch "${SOURCE_BRANCH}" "${SOURCE_REPO}" "${TMP_DIR}/remote" >/dev/null 2>&1; then
  die "拉取远端模板库失败，保留本地旧版本，运行侧不受影响。"
fi

REMOTE_MANIFEST="${TMP_DIR}/remote/manifest.json"
[[ -f "${REMOTE_MANIFEST}" ]] || die "远端缺少 manifest.json，终止升级。"

REMOTE_LIB_VER="$(jq -r '.template_lib_version'  "${REMOTE_MANIFEST}")"
REMOTE_MIN_SKILL="$(jq -r '.min_skill_required'  "${REMOTE_MANIFEST}")"
log "远端模板库版本     : ${REMOTE_LIB_VER}"
log "远端要求最低 skill : ${REMOTE_MIN_SKILL}"

# ---- 版本比较辅助：返回 0 表示 $1 >= $2 ----------------------------------
ver_ge() {
  [[ "$1" == "$2" ]] && return 0
  local lower
  lower="$(printf '%s\n%s\n' "$1" "$2" | sort -V | head -n1)"
  [[ "${lower}" == "$2" ]]
}

# ---- 判定是否需要升级 -----------------------------------------------------
if [[ "${REMOTE_LIB_VER}" == "${LOCAL_LIB_VER}" ]]; then
  log "已是最新模板库版本（${LOCAL_LIB_VER}），无需升级。"
  exit 0
fi

# ---- 兼容性闸门：min_skill_required <= 本地 skill 版本 --------------------
if ! ver_ge "${LOCAL_SKILL_VER}" "${REMOTE_MIN_SKILL}"; then
  die "新模板库(${REMOTE_LIB_VER})要求 skill >= ${REMOTE_MIN_SKILL}，但本地 skill 为 ${LOCAL_SKILL_VER}。\n        请先升级 contract-guard skill 再同步模板库。已中止，本地库保持不变。"
fi

log "检测到新模板库：${LOCAL_LIB_VER} -> ${REMOTE_LIB_VER}"

if [[ "${DRY_RUN}" == "true" ]]; then
  log "[dry-run] 仅检查，不写入。如需升级请去掉 --check 重新执行。"
  exit 0
fi

# ---- 原子替换 lib/ + 更新本地 manifest 的 template_lib_version -----------
[[ -d "${TMP_DIR}/remote/lib" ]] || die "远端缺少 lib/ 目录，终止升级。"

# 先备份，失败可回滚
if [[ -d "${LIB_DIR}" ]]; then
  rm -rf "${LIB_DIR}.bak"
  cp -r "${LIB_DIR}" "${LIB_DIR}.bak"
fi

if ! cp -r "${TMP_DIR}/remote/lib/." "${LIB_DIR}/"; then
  log "写入失败，正在回滚..."
  [[ -d "${LIB_DIR}.bak" ]] && rm -rf "${LIB_DIR}" && mv "${LIB_DIR}.bak" "${LIB_DIR}"
  die "lib/ 写入失败，已回滚到旧版本。"
fi

# 同步本地 manifest 的模板库版本号（skill_version 不动）
tmp_manifest="$(mktemp)"
jq --arg v "${REMOTE_LIB_VER}" '.template_lib_version = $v' "${LOCAL_MANIFEST}" > "${tmp_manifest}"
mv "${tmp_manifest}" "${LOCAL_MANIFEST}"

rm -rf "${LIB_DIR}.bak"
log "升级完成：模板库已更新至 ${REMOTE_LIB_VER}。运行侧将在下次调用时读取到新契约。"
