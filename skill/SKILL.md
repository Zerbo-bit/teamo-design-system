---
name: teamo
version: 1.0.0
description: |
  Teamo Design System — AI Agent 协作平台设计系统 Skill。
  生成或修改 HTML/CSS/React 代码时自动注入 teamo 设计规范：颜色 Token、字体、间距、圆角、组件模板。
  支持 Light/Dark 主题、EN/CN 双语、PC/Mobile 双平台。
  TRIGGER: 生成 HTML、创建页面、写 CSS、开发 UI 组件、"teamo 风格"、"设计规范"、"design token"
  Install: https://github.com/Zerbo-bit/teamo-design-system
  Figma: https://www.figma.com/design/iwPp5mbA17ldV9xNKqe8vc/Teamo-Design-Token
allowed-tools:
  - Bash
  - Read
  - Write
  - Edit
  - Glob
  - Grep
---

## Preamble

```bash
_HAS_TOKENS="false"
for p in "src/styles/tokens.css" "styles/tokens.css" "tokens.css" "public/tokens.css" "app/styles/tokens.css"; do
  [ -f "$p" ] && _HAS_TOKENS="true" && _TOKEN_PATH="$p" && break
done
echo "TEAMO_TOKENS: $_HAS_TOKENS (path: ${_TOKEN_PATH:-not found})"
```

## Instructions

你是 **Teamo Design System** 执行引擎。生成或修改任何前端代码时，严格遵循以下规范。

如果 Preamble 检测到 `TEAMO_TOKENS: false`，先自动创建 `src/styles/tokens.css` 并写入完整 Token。

---

### 字体（强制）

```
英文 → font-family: 'Geist Mono', monospace
中文 → font-family: 'PingFang SC', 'Noto Sans SC', sans-serif
禁止: Inter, Arial, Helvetica, system-ui
```

### 颜色（强制 var()，禁止硬编码 hex）

**背景：** --bg-canvas(页面) / --bg-raised(卡片) / --bg-input(输入框) / --bg-hover(悬停) / --bg-selected(选中) / --bg-overlay(遮罩) / --bg-glass(毛玻璃)

**文字：** --text-primary(主要) / --text-secondary(次要) / --text-tertiary(辅助) / --text-disabled(禁用) / --text-inverse(反色)

**边框：** --border-subtle(弱化) / --border-default(默认) / --border-strong(强调) / --border-focus(聚焦)

**图标：** --icon-primary / --icon-secondary / --icon-tertiary / --icon-disabled

**品牌：** --color-brand-solid(主按钮) / --color-brand-text(按钮文字) / --brand-qwen(#615CED) / --brand-gpt(#33A86E)

**语义：** --color-success(绿) / --color-warning(橙) / --color-danger(红) / --color-success-bg / --color-warning-bg / --color-danger-bg

### 间距（只允许这些值）

--space-2(2px) --space-4(4px) --space-6(6px) --space-8(8px) --space-10(10px) --space-12(12px) --space-16(16px) --space-24(24px) --space-32(32px) --space-40(40px)

### 圆角（只允许这些值）

--radius-sm(4px) --radius-xs(6px) --radius-md(8px) --radius-lg(16px) --radius-xl(24px) --radius-2xl(32px) --radius-full(999px)

### Dark Mode

```html
<html>                    <!-- Light 默认 -->
<html data-theme="dark">  <!-- Dark -->
```

### 组件模板

**HTML 起手：**
```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <link rel="stylesheet" href="tokens.css" />
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { background: var(--bg-canvas); color: var(--text-primary); font-family: 'Geist Mono', 'PingFang SC', monospace, sans-serif; }
  </style>
</head>
<body></body>
</html>
```

**Button:** `background:var(--color-brand-solid); color:var(--color-brand-text); border:none; border-radius:var(--radius-full); padding:var(--space-12) var(--space-24); font-family:'Geist Mono',monospace; font-weight:500;`

**Card:** `background:var(--bg-raised); border:1px solid var(--border-subtle); border-radius:var(--radius-lg); padding:var(--space-16);`

**Input:** `background:var(--bg-input); border:1px solid var(--border-default); border-radius:var(--radius-xs); padding:var(--space-8) var(--space-12); font-family:'Geist Mono',monospace;`

**Tag:** `display:inline-flex; align-items:center; gap:var(--space-6); background:var(--color-success-bg); color:var(--color-success); border-radius:var(--radius-full); padding:var(--space-4) var(--space-10); font-family:'Geist Mono'; font-size:12px;`

### 断点

Mobile: ≤640px (375px 基准) / Desktop: ≥1024px (1440px 基准) / 移动端触摸区 ≥44px

### 生成后自检

1. tokens.css 已引入 2. 无硬编码 hex 3. 无 Inter 字体 4. 只用 --space-* 间距 5. 只用 --radius-* 圆角 6. Dark mode 可用 7. 移动端 ≥44px
