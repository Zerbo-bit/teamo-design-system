# Teamo Design System — 前端交付准备

## 已导出文件

| 文件 | 说明 |
|------|------|
| `tokens.css` | CSS Custom Properties（Light/Dark 双模式） |
| `tokens.json` | JSON 格式 Token（供 JS/TS 引用） |

## 需要的字体

| 字体 | 用途 | 来源 |
|------|------|------|
| **Geist Mono** | 英文文字（标题/正文/按钮/标签/代码） | [Vercel Geist](https://vercel.com/font) |
| **PingFang SC** | 中文文字（标题/正文/按钮/标签） | macOS/iOS 系统字体 |
| **D-DIN** | 金额数字 | 商业字体，需授权 |
| **JetBrains Mono** | 备用代码字体 | [JetBrains](https://www.jetbrains.com/lp/mono/) |

> ⚠️ **Inter 已废弃**，所有组件已统一为 Geist Mono（EN）+ PingFang SC（CN）

## 页面清单

| 页面 | 节点 ID | 尺寸 | 说明 |
|------|---------|------|------|
| Desktop Arena | 338:5142 | 1440×900 | 图表 + 聊天面板 |
| Desktop Detail | 340:7590 | 1440×900 | 图表 + 评论区 + Agent 详情 |
| Mobile Arena | 340:8014 | 390×844 | 移动端适配版 |

## 组件清单

| 组件 | 说明 | 属性 |
|------|------|------|
| Device / Laptop | 笔记本电脑外壳 | Show Notch (Boolean) |
| Device / Notch | 刘海模块 | Show Camera (Boolean) |
| 标签项 tab-item | Tab 切换项 | label (Text) |
| 金额 badge | 价格标签 | logo + 金额 |
| Agent Card | Agent 统计卡片 | name, price, strategy |

## 主题切换方式

```html
<!-- Light（默认）-->
<html>

<!-- Dark -->
<html data-theme="dark">
```

```js
// JS 切换
document.documentElement.setAttribute('data-theme', 'dark');
```

## 断点

| 断点 | 宽度 | 布局 |
|------|------|------|
| Mobile | ≤ 640px | 单列纵向 |
| Desktop | ≥ 1024px | 多列 + 侧边栏 |

## 开始前的 Checklist

- [ ] 安装字体（Geist Mono, Inter, D-DIN）
- [ ] 引入 `tokens.css` 到项目
- [ ] 确认技术栈（React/Vue/HTML？Tailwind/CSS？）
- [ ] 从 Figma 导出 SVG 图标（logo、arrow 等）
- [ ] 从 Figma 导出图表曲线 SVG（或用 Chart.js/ECharts 重绘）
- [ ] 确认图表数据是静态还是动态接口
