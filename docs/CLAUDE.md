# Teamo Design System — AI 开发规范

> 本文件是 teamo 设计系统的强制性开发规范。所有代码生成、UI 开发、样式修改必须严格遵守以下规则。

## 字体规则（MANDATORY）

**绝对不要使用 system-ui、Arial、Helvetica 或其他未列出的字体。**

| 用途 | 字体 | 字重 | 备注 |
|------|------|------|------|
| 英文文字（标题/正文/按钮/标签） | `Geist Mono` | Medium (500) / Regular (400) | 必须使用，不可替换为 Inter |
| 中文文字（标题/正文/按钮/标签） | `PingFang SC` | Medium / Regular / Semibold | macOS/iOS 系统字体 |
| 代码/等宽场景 | `Geist Mono` | Regular (400) | 与英文共用 |
| 金额数字 | `D-DIN` | Regular | 商业字体 |

**字体 fallback 顺序：**
```css
--font-en: 'Geist Mono', monospace;
--font-cn: 'PingFang SC', 'Noto Sans SC', sans-serif;
--font-code: 'Geist Mono', 'JetBrains Mono', monospace;
```

## 颜色规则（MANDATORY）

**必须使用 CSS 变量 `var(--token-name)`，绝对不要硬编码十六进制色值。**

### 引入方式
```html
<link rel="stylesheet" href="tokens.css" />
```

### 主题切换
```html
<!-- Light（默认）-->
<html>
<!-- Dark -->
<html data-theme="dark">
```

### 背景色
| Token | 用途 | Light | Dark |
|-------|------|-------|------|
| `--bg-canvas` | 页面画布背景 | #F7F7F7 | #121418 |
| `--bg-surface` | 表面/面板背景 | #EFEFEF | #191A1C |
| `--bg-elevated` | 浮起元素背景 | #DCDCDC | #292A2D |
| `--bg-raised` | 卡片/弹窗背景 | #F7F7F7 | #292A2D |
| `--bg-input` | 输入框背景 | #FFFFFF | #191A1C |
| `--bg-hover` | 悬停态背景 | #DCDCDC | #292A2D |
| `--bg-selected` | 选中态背景 | #DCDCDC | #505255 |
| `--bg-overlay` | 遮罩背景 | rgba(248,250,252,0.80) | rgba(18,20,24,0.80) |
| `--bg-glass` | 毛玻璃背景 | rgba(18,18,18,0.60) | rgba(247,247,247,0.60) |

### 文字色
| Token | 用途 | Light | Dark |
|-------|------|-------|------|
| `--text-primary` | 主要文字 | #121212 | #F6F7F9 |
| `--text-secondary` | 次要文字 | #525252 | #9C9EA2 |
| `--text-tertiary` | 辅助文字 | #737373 | #717377 |
| `--text-disabled` | 禁用文字 | #9E9E9E | #505255 |
| `--text-inverse` | 反色文字 | #F7F7F7 | #121418 |

### 边框色
| Token | 用途 | Light | Dark |
|-------|------|-------|------|
| `--border-subtle` | 弱化边框 | #DCDCDC | #3B3D40 |
| `--border-default` | 默认边框 | #C4C4C4 | #3B3D40 |
| `--border-strong` | 强调边框 | #9E9E9E | #505255 |
| `--border-focus` | 聚焦边框 | #121212 | #F6F7F9 |

### 图标色
| Token | 用途 |
|-------|------|
| `--icon-primary` | 主要图标 |
| `--icon-secondary` | 次要图标 |
| `--icon-tertiary` | 辅助图标 |
| `--icon-disabled` | 禁用图标 |

### 品牌色
| Token | 值 | 说明 |
|-------|-----|------|
| `--color-brand-solid` | Light: #121212 / Dark: #F6F7F9 | 品牌主色（随主题反转） |
| `--color-brand-text` | Light: #F7F7F7 / Dark: #121418 | 品牌色上的文字 |
| `--brand-qwen` | #615CED | Qwen 品牌紫（固定） |
| `--brand-gpt` | #33A86E | GPT 品牌绿（固定） |

### 语义色
| Token | Light | Dark | 用途 |
|-------|-------|------|------|
| `--color-success` | #16A34A | #00C758 | 成功 |
| `--color-warning` | #D97706 | #F99C00 | 警告 |
| `--color-danger` | #DC2626 | #F43B3E | 危险 |
| `--color-success-bg` | #F0FDF4 | rgba(20,83,45,0.20) | 成功背景 |
| `--color-warning-bg` | #FFFBEB | rgba(120,53,15,0.20) | 警告背景 |
| `--color-danger-bg` | #FEF2F2 | rgba(127,29,29,0.20) | 危险背景 |

## 间距规则（MANDATORY）

**必须使用 spacing token，不要使用任意数值。**

| Token | 值 | 常用场景 |
|-------|-----|---------|
| `--space-2` | 2px | 图标与文字间距 |
| `--space-4` | 4px | 紧凑内边距 |
| `--space-6` | 6px | 小间距 |
| `--space-8` | 8px | 默认间距 |
| `--space-10` | 10px | 中小间距 |
| `--space-12` | 12px | 内容间距 |
| `--space-16` | 16px | 区块内边距 |
| `--space-24` | 24px | 区块间距 |
| `--space-32` | 32px | 大区块间距 |
| `--space-40` | 40px | 页面级间距 |

## 圆角规则（MANDATORY）

| Token | 值 | 用途 |
|-------|-----|------|
| `--radius-sm` | 4px | Checkbox、小元素 |
| `--radius-xs` | 6px | 输入框、小卡片 |
| `--radius-md` | 8px | 卡片、弹窗 |
| `--radius-lg` | 16px | 大卡片、面板 |
| `--radius-xl` | 24px | Bottom Sheet、大面板 |
| `--radius-2xl` | 32px | 特大容器 |
| `--radius-full` | 999px | 胶囊按钮、Tag、Switch |

## 组件开发规则

### 按钮
```css
.btn-primary {
  background: var(--color-brand-solid);
  color: var(--color-brand-text);
  border-radius: var(--radius-full);
  font-family: var(--font-en); /* 或 var(--font-cn) */
  font-weight: 500;
  padding: var(--space-12) var(--space-24);   /* touch size */
  min-height: 44px; /* 移动端最小触摸区域 */
}
.btn-secondary {
  background: var(--bg-raised);
  color: var(--text-primary);
  border: 1px solid var(--border-default);
}
```

### 输入框
```css
.input {
  background: var(--bg-input);
  border: 1px solid var(--border-default);
  border-radius: var(--radius-xs);
  color: var(--text-primary);
  font-family: var(--font-en);
}
.input:focus {
  border-color: var(--border-focus);
}
.input::placeholder {
  color: var(--text-tertiary);
}
```

### 卡片
```css
.card {
  background: var(--bg-raised);
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-lg);
  padding: var(--space-16);
}
.card-elevated {
  border: none;
  box-shadow: 0 2px 8px rgba(0,0,0,0.06), 0 8px 24px rgba(0,0,0,0.1);
}
```

## 断点

| 断点 | 宽度 | 布局 |
|------|------|------|
| Mobile | ≤ 640px | 单列，375px 基准 |
| Desktop | ≥ 1024px | 多列 + 侧边栏，1440px 基准 |

## 禁止事项

- **不要**使用 `Inter` 字体（已全部替换为 Geist Mono）
- **不要**硬编码颜色值（必须使用 CSS 变量）
- **不要**使用非 token 的间距值（如 5px、7px、15px）
- **不要**创建低于 44px 高度的可交互移动端元素
- **不要**在深色固定背景（如灵动岛）上使用会随主题切换的颜色变量
- **不要**自行创建图标，必须使用 Icon 库中的 Lucide 图标
