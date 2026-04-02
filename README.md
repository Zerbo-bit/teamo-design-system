# Teamo Design System v1.0.0

> AI Agent 协作平台的统一设计语言，适用于产品、研发、设计、运营全角色。

## Figma 设计源文件

查看和使用完整的组件库、设计规范和 Design Token：

**[打开 Figma 文件 →](https://www.figma.com/design/iwPp5mbA17ldV9xNKqe8vc/Teamo-Design-Token?node-id=88-24699&t=iVUGFdHbyATlE3AN-1)**

---

## 一键安装

```bash
# 安装 Token + AI 规范到你的项目
npx teamo-ds init

# 完整安装（含图标 + 文档）
npx teamo-ds init --full
```

**其他命令：**

| 命令 | 作用 |
|------|------|
| `npx teamo-ds tokens` | 仅安装 tokens.css + tokens.json |
| `npx teamo-ds ai` | 仅安装 CLAUDE.md（AI 开发规范） |
| `npx teamo-ds info` | 查看 Token 速查表 |
| `npx teamo-ds doctor` | 检查项目是否符合设计规范 |

**或直接克隆：**

```bash
git clone https://github.com/Zerbo-bit/teamo-design-system.git
```

---

## 数据概览

| 指标 | 数量 |
|------|------|
| 组件集 | 37 |
| 变体 | 609+ |
| 设计变量 | 218 |
| 图标 | 1666 |
| 主题 | Light / Dark |
| 语言 | EN / CN |
| 平台 | PC + Mobile |

---

## 这个包里有什么

```
teamo-design-system/
├── README.md           ← 你正在读的文件（快速上手指南）
├── CLAUDE.md           ← AI 开发规范（Claude Code / Codex 自动读取）
├── HANDOFF.md          ← 设计交付文档（设计→研发）
├── tokens.css          ← CSS 变量文件（直接引入项目）
├── tokens.json         ← JSON 格式 Token（JS/TS/React Native 使用）
├── icons/              ← 常用 SVG 图标
└── cut/                ← 设计切图资源
```

---

## 各角色快速上手

### 产品经理 / 运营

**你需要关注：**
- 颜色含义：绿色=成功，橙色=警告，红色=危险
- 组件名称：用中文名在 Figma 搜索即可（如"按钮"、"卡片"、"标签"）
- 断点：手机 ≤640px，桌面 ≥1024px

**Figma 文件：**
打开 Figma → Assets 面板 → 搜索组件名即可拖入使用。
每个组件右侧属性面板可切换：样式、颜色、语言(EN/CN)、显隐图标/按钮。

**可用组件清单：**

| 分类 | 组件 |
|------|------|
| 表单 | 按钮 Button、输入框 Input、文本域 Textarea、下拉选择 Select、复选框 Checkbox、单选框 Radio、开关 Switch |
| 展示 | 标签 Tag、头像 Avatar、卡片 Card、提示 Tooltip、骨架屏 Skeleton、分割线 Divider |
| 导航 | 标签页 Tab、菜单 Menu、面包屑 Breadcrumb |
| 反馈 | 灵动岛 Dynamic Island、弹窗 Pop-up、空状态 Empty State |
| 移动端 | 顶部导航 Navigation Bar、底部导航 Bottom Tab Bar、底部面板 Bottom Sheet、操作菜单 Action Sheet、下拉刷新 Pull to Refresh、滑动操作 Swipe Action |

---

### 前端研发

**1. 安装字体**
```bash
# Geist Mono（必须）
npm install geist
# 或直接下载：https://vercel.com/font

# PingFang SC — macOS/iOS 系统自带，无需安装
# Windows 需 fallback 到 Noto Sans SC
```

**2. 引入 Token**

方式 A — CSS 变量（推荐）：
```html
<link rel="stylesheet" href="tokens.css" />
```

方式 B — JS/TS 引用：
```typescript
import tokens from './tokens.json';
// tokens.colors['bg-canvas'].light → '#F7F7F7'
// tokens.spacing['space-16'] → 16
```

方式 C — Tailwind CSS v4：
```css
@import './tokens.css';

@theme {
  --color-bg-canvas: var(--bg-canvas);
  --color-text-primary: var(--text-primary);
  /* ... 映射所有 token */
}
```

**3. 使用颜色**
```css
/* 正确 ✅ */
background: var(--bg-canvas);
color: var(--text-primary);
border: 1px solid var(--border-subtle);

/* 错误 ❌ */
background: #F7F7F7;
color: #121212;
border: 1px solid #DCDCDC;
```

**4. 主题切换**
```javascript
// 切换到深色模式
document.documentElement.setAttribute('data-theme', 'dark');

// 切换到浅色模式
document.documentElement.removeAttribute('data-theme');

// 跟随系统
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
if (prefersDark) document.documentElement.setAttribute('data-theme', 'dark');
```

**5. 字体使用**
```css
/* 英文内容 */
font-family: 'Geist Mono', monospace;

/* 中文内容 */
font-family: 'PingFang SC', 'Noto Sans SC', sans-serif;

/* 通用 fallback（自动匹配中英文）*/
font-family: 'Geist Mono', 'PingFang SC', 'Noto Sans SC', monospace, sans-serif;
```

**6. 断点**
```css
/* Mobile */
@media (max-width: 640px) { ... }

/* Desktop */
@media (min-width: 1024px) { ... }
```

**7. 移动端触摸规则**
- 所有可交互元素最小高度 **44px**
- 按钮 padding 至少 `var(--space-12)` 纵向
- 表单控件使用 `Size=touch` 变体

---

### 设计师

**Figma 文件结构：**

| 页面 | 内容 |
|------|------|
| Design System | Typography、Elevation、Spacing、Radius 规范 |
| color | 色板展示 |
| Icon | 1666 个 Lucide 图标 |
| 各组件页面 | 每个组件独立一页，含 Component Set |

**设计规范：**
- Token 系统：`teamo Color System`（61 色，Light/Dark）+ `teamo Metrics`（23 指标）+ `Primitive Colors`（134 原始色）
- 字体：Geist Mono（英文）、PingFang SC（中文）
- 所有颜色必须绑定 Variable，不要硬编码
- 组件使用 Boolean Property 控制显隐，减少变体数量
- 图标必须使用 Icon 页面的组件实例

---

### AI 开发者（Claude Code / Codex / Cursor）

将 `CLAUDE.md` 放到你的项目根目录，AI 工具会自动读取并遵循规范。

```bash
cp teamo-design-system/CLAUDE.md your-project/CLAUDE.md
```

`CLAUDE.md` 包含：
- 字体强制规则（禁止 Inter，必须 Geist Mono / PingFang SC）
- 颜色 token 完整对照表（Light/Dark）
- 间距、圆角 token 表
- 组件标准代码示例
- 6 条禁止事项

---

## Token 速查

### 最常用的 10 个颜色 Token

| Token | 用途 | 速记 |
|-------|------|------|
| `--bg-canvas` | 页面背景 | "最底层" |
| `--bg-raised` | 卡片/浮层背景 | "浮起来的" |
| `--bg-input` | 输入框背景 | "可输入的" |
| `--text-primary` | 主要文字 | "最重要的字" |
| `--text-secondary` | 次要文字 | "补充说明的字" |
| `--text-tertiary` | 辅助文字 | "最不重要的字" |
| `--border-subtle` | 默认分隔线 | "看得见但不抢眼" |
| `--color-brand-solid` | 品牌主色/主按钮 | "teamo 的颜色" |
| `--color-success` | 成功/正确 | "绿色" |
| `--color-danger` | 错误/危险 | "红色" |

### 最常用的间距

| Token | 值 | 速记 |
|-------|-----|------|
| `--space-4` | 4px | 图标内间距 |
| `--space-8` | 8px | 元素间距 |
| `--space-12` | 12px | 内容间距 |
| `--space-16` | 16px | 卡片内边距 |
| `--space-24` | 24px | 区块间距 |

---

## 版本记录

| 版本 | 日期 | 变更 |
|------|------|------|
| v1.0.0 | 2026-04-02 | 初始发布。37 组件集、609+ 变体、218 设计变量、1666 图标。支持 Light/Dark、EN/CN、PC/Mobile。 |

---

## 搭配 Agentation Skill 使用

在 [Agentation](https://www.agentation.com/) 上一键安装 **teamo** Skill，AI 生成代码时自动遵循设计规范。

### 安装

前往 [agentation.com](https://www.agentation.com/) → 搜索 **teamo** → 安装

### 不会写代码也能改页面

Agentation 让你不需要懂代码就能精准修改页面细节：

1. **点击** — 在页面上点击你想改的元素
2. **定位** — 自动定位到代码位置
3. **描述** — 写你要改什么（"圆角大一点"、"颜色换成绿色"）
4. **复制** — 一键复制修改指令
5. **粘贴给 Claude Code** — AI 精准执行

| 你想做的 | 以前 | 用 Agentation |
|----------|------|---------------|
| 改按钮颜色 | 翻代码找半天 | 点击 → 描述 → 复制给 CC |
| 调间距 | 猜 class 反复试 | 点击 → 看到间距值 → 改完 |
| 换字号 | 开 DevTools | 点击文字 → "大一号" → 完成 |
