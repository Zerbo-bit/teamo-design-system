---
name: teamo
preamble-tier: 2
version: 1.0.0
description: |
  Teamo Design System 自动化工具。生成 HTML/CSS/React 时自动注入 teamo 设计规范，
  确保颜色、字体、间距、组件严格遵循 design token。
  TRIGGER when: 用户要求生成 HTML、创建页面、写 CSS、开发 UI 组件、"用 teamo 风格"、
  "按照设计规范"、"使用 design token"，或当代码中包含 tokens.css 引用。
  Also triggers on: /teamo, "teamo style", "apply design system"
  DO NOT TRIGGER when: 纯后端逻辑、数据库操作、与 UI 无关的任务。
  Proactively suggest when user is building any frontend UI and teamo tokens.css exists in the project.
allowed-tools:
  - Bash
  - Read
  - Write
  - Edit
  - Glob
  - Grep
  - Agent
---

## Preamble (run first)

```bash
# Check if teamo design system is installed in current project
_HAS_TOKENS="false"
_HAS_CLAUDE_MD="false"
_PROJECT_ROOT=$(pwd)

# Search for tokens.css
for p in "src/styles/tokens.css" "styles/tokens.css" "tokens.css" "public/tokens.css"; do
  [ -f "$p" ] && _HAS_TOKENS="true" && _TOKEN_PATH="$p" && break
done

# Search for CLAUDE.md with teamo reference
if [ -f "CLAUDE.md" ] && grep -q "teamo" "CLAUDE.md" 2>/dev/null; then
  _HAS_CLAUDE_MD="true"
fi

# Search for design system package
_HAS_PKG="false"
[ -d "node_modules/teamo-ds" ] && _HAS_PKG="true"

# Check teamo-design-system source
_DS_PATH=""
[ -d "$HOME/teamo-design-system" ] && _DS_PATH="$HOME/teamo-design-system"

echo "TEAMO_TOKENS: $_HAS_TOKENS (path: $_TOKEN_PATH)"
echo "TEAMO_CLAUDE_MD: $_HAS_CLAUDE_MD"
echo "TEAMO_PKG: $_HAS_PKG"
echo "TEAMO_DS_PATH: $_DS_PATH"
echo "PROJECT_ROOT: $_PROJECT_ROOT"
```

## Instructions

You are the **Teamo Design System** enforcement agent. When generating ANY HTML, CSS, React, Vue, or frontend code, you MUST follow these rules EXACTLY. No exceptions.

### Auto-Setup

If `TEAMO_TOKENS` is "false", automatically install:

```bash
# If teamo-ds package exists
if [ "$_HAS_PKG" = "true" ]; then
  npx teamo-ds init
# If local design system exists
elif [ -n "$_DS_PATH" ]; then
  mkdir -p src/styles
  cp "$_DS_PATH/tokens/tokens.css" src/styles/tokens.css 2>/dev/null || cp "$_DS_PATH/tokens.css" src/styles/tokens.css
  cp "$_DS_PATH/tokens/tokens.json" src/styles/tokens.json 2>/dev/null || cp "$_DS_PATH/tokens.json" src/styles/tokens.json
  cp "$_DS_PATH/docs/CLAUDE.md" CLAUDE.md 2>/dev/null || cp "$_DS_PATH/CLAUDE.md" CLAUDE.md
  echo "✦ Teamo design tokens installed"
fi
```

### Font Rules (MANDATORY)

```
English text → font-family: 'Geist Mono', monospace
Chinese text → font-family: 'PingFang SC', 'Noto Sans SC', sans-serif
Code text   → font-family: 'Geist Mono', 'JetBrains Mono', monospace

BANNED: Inter, Arial, Helvetica, system-ui, sans-serif (alone)
```

### Color Rules (MANDATORY)

**NEVER hardcode hex colors. ALWAYS use CSS variables.**

Every generated HTML file MUST include:
```html
<link rel="stylesheet" href="tokens.css" />
```
or in CSS:
```css
@import './tokens.css';
```

Quick reference for the 10 most-used tokens:

| Variable | Purpose |
|----------|---------|
| `var(--bg-canvas)` | Page background |
| `var(--bg-raised)` | Card/panel background |
| `var(--bg-input)` | Input field background |
| `var(--text-primary)` | Primary text |
| `var(--text-secondary)` | Secondary text |
| `var(--text-tertiary)` | Muted text |
| `var(--border-subtle)` | Default border |
| `var(--border-focus)` | Focus state border |
| `var(--color-brand-solid)` | Primary button / brand |
| `var(--color-brand-text)` | Text on brand background |

Status colors:
| Variable | Use |
|----------|-----|
| `var(--color-success)` | Success (green) |
| `var(--color-warning)` | Warning (orange) |
| `var(--color-danger)` | Danger (red) |
| `var(--color-success-bg)` | Success background |
| `var(--color-warning-bg)` | Warning background |
| `var(--color-danger-bg)` | Danger background |

### Spacing Rules (MANDATORY)

ONLY use these values. No arbitrary numbers like 5px, 7px, 15px, 18px.

```
var(--space-2): 2px    var(--space-4): 4px    var(--space-6): 6px
var(--space-8): 8px    var(--space-10): 10px  var(--space-12): 12px
var(--space-16): 16px  var(--space-24): 24px  var(--space-32): 32px
var(--space-40): 40px
```

### Radius Rules (MANDATORY)

```
var(--radius-sm): 4px       → Checkbox, small elements
var(--radius-xs): 6px       → Input fields
var(--radius-md): 8px       → Cards, modals
var(--radius-lg): 16px      → Large panels
var(--radius-xl): 24px      → Bottom sheets
var(--radius-full): 999px   → Pills, tags, switches
```

### Dark Mode (MANDATORY)

Every page MUST support dark mode. Theme switch via:
```html
<html data-theme="dark">
```

All tokens auto-switch. NEVER write separate dark-mode styles for token colors.

### Component Patterns

**Button (Primary):**
```html
<button style="
  background: var(--color-brand-solid);
  color: var(--color-brand-text);
  border: none;
  border-radius: var(--radius-full);
  padding: var(--space-12) var(--space-24);
  font-family: 'Geist Mono', monospace;
  font-weight: 500;
  font-size: 14px;
  cursor: pointer;
">Button</button>
```

**Button (Secondary):**
```html
<button style="
  background: var(--bg-raised);
  color: var(--text-primary);
  border: 1px solid var(--border-default);
  border-radius: var(--radius-full);
  padding: var(--space-12) var(--space-24);
  font-family: 'Geist Mono', monospace;
  font-weight: 500;
">Button</button>
```

**Card:**
```html
<div style="
  background: var(--bg-raised);
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-lg);
  padding: var(--space-16);
">
  <h3 style="color: var(--text-primary); font-family: 'Geist Mono'; font-weight: 500; margin: 0;">Title</h3>
  <p style="color: var(--text-secondary); font-family: 'PingFang SC'; margin: var(--space-8) 0 0;">Description</p>
</div>
```

**Input:**
```html
<input style="
  background: var(--bg-input);
  color: var(--text-primary);
  border: 1px solid var(--border-default);
  border-radius: var(--radius-xs);
  padding: var(--space-8) var(--space-12);
  font-family: 'Geist Mono', monospace;
  outline: none;
" placeholder="Placeholder..." />
```

**Tag:**
```html
<span style="
  display: inline-flex; align-items: center; gap: var(--space-6);
  background: var(--color-success-bg);
  color: var(--color-success);
  border-radius: var(--radius-full);
  padding: var(--space-4) var(--space-10);
  font-family: 'Geist Mono'; font-size: 12px; font-weight: 500;
">● Active</span>
```

### HTML Template

When generating a full HTML page, ALWAYS start with:

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Teamo</title>
  <link rel="stylesheet" href="tokens.css" />
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      background: var(--bg-canvas);
      color: var(--text-primary);
      font-family: 'Geist Mono', 'PingFang SC', monospace, sans-serif;
      -webkit-font-smoothing: antialiased;
    }
  </style>
</head>
<body>
  <!-- content -->
</body>
</html>
```

### Mobile Rules

- Minimum touch target: **44px** height for interactive elements
- Base width: **375px** for mobile layouts
- Breakpoint: `@media (max-width: 640px)` for mobile, `@media (min-width: 1024px)` for desktop

### Self-Check

After generating HTML/CSS, verify:
1. ✅ `tokens.css` is imported
2. ✅ No hardcoded hex colors (search for `#` in style attributes)
3. ✅ No `Inter` font references
4. ✅ No arbitrary spacing values (only `--space-*` tokens)
5. ✅ No arbitrary radius values (only `--radius-*` tokens)
6. ✅ Dark mode works (add `data-theme="dark"` and check)
7. ✅ Font is Geist Mono (EN) or PingFang SC (CN)

If any check fails, fix it before presenting to the user.
