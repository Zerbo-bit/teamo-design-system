#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const RESET = '\x1b[0m';
const BOLD = '\x1b[1m';
const DIM = '\x1b[2m';
const GREEN = '\x1b[32m';
const CYAN = '\x1b[36m';
const YELLOW = '\x1b[33m';
const RED = '\x1b[31m';

const LOGO = `
${BOLD}  ✦ teamo design system ${DIM}v1.0.0${RESET}
`;

const command = process.argv[2];

if (!command || command === 'help' || command === '--help') {
  console.log(LOGO);
  console.log(`${BOLD}Usage:${RESET}`);
  console.log(`  ${CYAN}teamo-ds init${RESET}          安装 Token + AI 规范到当前项目`);
  console.log(`  ${CYAN}teamo-ds init --full${RESET}   安装全部（Token + 图标 + AI 规范 + 文档）`);
  console.log(`  ${CYAN}teamo-ds tokens${RESET}        仅安装 tokens.css + tokens.json`);
  console.log(`  ${CYAN}teamo-ds ai${RESET}            仅安装 CLAUDE.md（AI 开发规范）`);
  console.log(`  ${CYAN}teamo-ds info${RESET}          查看 Token 速查表`);
  console.log(`  ${CYAN}teamo-ds doctor${RESET}        检查当前项目是否符合规范`);
  console.log('');
  process.exit(0);
}

const pkgRoot = path.resolve(__dirname, '../..');
const projectRoot = process.cwd();

function copyFile(src, destDir, destName) {
  const srcPath = path.resolve(pkgRoot, src);
  if (!fs.existsSync(srcPath)) {
    console.log(`  ${RED}✗${RESET} ${DIM}${src} not found${RESET}`);
    return false;
  }
  const destPath = path.resolve(destDir, destName || path.basename(src));
  fs.mkdirSync(path.dirname(destPath), { recursive: true });
  fs.copyFileSync(srcPath, destPath);
  const relPath = path.relative(projectRoot, destPath);
  console.log(`  ${GREEN}✓${RESET} ${relPath}`);
  return true;
}

function copyDir(srcDir, destDir) {
  const srcPath = path.resolve(pkgRoot, srcDir);
  if (!fs.existsSync(srcPath)) return 0;
  let count = 0;
  fs.mkdirSync(destDir, { recursive: true });
  for (const file of fs.readdirSync(srcPath)) {
    const srcFile = path.join(srcPath, file);
    const destFile = path.join(destDir, file);
    if (fs.statSync(srcFile).isFile()) {
      fs.copyFileSync(srcFile, destFile);
      count++;
    }
  }
  return count;
}

// === INIT ===
if (command === 'init') {
  const isFull = process.argv.includes('--full');
  console.log(LOGO);
  console.log(`${BOLD}Installing teamo design system...${RESET}\n`);

  // Detect project type
  const hasSrc = fs.existsSync(path.join(projectRoot, 'src'));
  const hasPublic = fs.existsSync(path.join(projectRoot, 'public'));
  const hasTailwind = fs.existsSync(path.join(projectRoot, 'tailwind.config.ts')) || fs.existsSync(path.join(projectRoot, 'tailwind.config.js'));
  const hasPackageJson = fs.existsSync(path.join(projectRoot, 'package.json'));

  const styleDir = hasSrc ? path.join(projectRoot, 'src/styles') : projectRoot;

  // 1. Tokens
  console.log(`${CYAN}Tokens:${RESET}`);
  copyFile('tokens/tokens.css', styleDir);
  copyFile('tokens/tokens.json', styleDir);

  // 2. AI rules
  console.log(`\n${CYAN}AI Rules:${RESET}`);
  copyFile('docs/CLAUDE.md', projectRoot, 'CLAUDE.md');

  // 3. Full mode extras
  if (isFull) {
    console.log(`\n${CYAN}Icons:${RESET}`);
    const iconDest = hasSrc ? path.join(projectRoot, 'src/assets/icons') : path.join(projectRoot, 'icons');
    const iconCount = copyDir('icons', iconDest);
    console.log(`  ${GREEN}✓${RESET} ${iconCount} icons → ${path.relative(projectRoot, iconDest)}/`);

    console.log(`\n${CYAN}Docs:${RESET}`);
    copyFile('docs/README.md', projectRoot, 'DESIGN_SYSTEM.md');
    copyFile('docs/HANDOFF.md', projectRoot, 'HANDOFF.md');
  }

  // Summary
  console.log(`\n${GREEN}${BOLD}Done!${RESET}\n`);
  console.log(`${BOLD}Next steps:${RESET}`);
  console.log(`  1. 引入 Token:  ${CYAN}@import './styles/tokens.css';${RESET}`);
  console.log(`  2. 使用变量:    ${CYAN}color: var(--text-primary);${RESET}`);
  console.log(`  3. 切换主题:    ${CYAN}<html data-theme="dark">${RESET}`);
  console.log(`  4. AI 规范已就位: ${DIM}CLAUDE.md${RESET}`);
  if (hasTailwind) {
    console.log(`\n  ${YELLOW}Tailwind detected!${RESET} 在 CSS 中添加:`);
    console.log(`  ${DIM}@import './styles/tokens.css';${RESET}`);
  }
  console.log('');
}

// === TOKENS ONLY ===
else if (command === 'tokens') {
  console.log(LOGO);
  const hasSrc = fs.existsSync(path.join(projectRoot, 'src'));
  const styleDir = hasSrc ? path.join(projectRoot, 'src/styles') : projectRoot;
  console.log(`${CYAN}Installing tokens:${RESET}`);
  copyFile('tokens/tokens.css', styleDir);
  copyFile('tokens/tokens.json', styleDir);
  console.log(`\n${GREEN}Done!${RESET} Use: ${CYAN}@import './styles/tokens.css';${RESET}\n`);
}

// === AI RULES ONLY ===
else if (command === 'ai') {
  console.log(LOGO);
  console.log(`${CYAN}Installing AI rules:${RESET}`);
  copyFile('docs/CLAUDE.md', projectRoot, 'CLAUDE.md');
  console.log(`\n${GREEN}Done!${RESET} Claude Code / Codex will auto-read CLAUDE.md\n`);
}

// === INFO ===
else if (command === 'info') {
  console.log(LOGO);
  console.log(`${BOLD}Token Quick Reference${RESET}\n`);

  console.log(`${CYAN}Colors (most used):${RESET}`);
  console.log(`  --bg-canvas          页面背景`);
  console.log(`  --bg-raised          卡片/浮层`);
  console.log(`  --bg-input           输入框`);
  console.log(`  --text-primary       主要文字`);
  console.log(`  --text-secondary     次要文字`);
  console.log(`  --border-subtle      分隔线`);
  console.log(`  --color-brand-solid  品牌色/主按钮`);
  console.log(`  --color-success      成功 (绿)`);
  console.log(`  --color-warning      警告 (橙)`);
  console.log(`  --color-danger       危险 (红)`);

  console.log(`\n${CYAN}Spacing:${RESET}`);
  console.log(`  --space-4 (4px)  --space-8 (8px)  --space-12 (12px)  --space-16 (16px)  --space-24 (24px)`);

  console.log(`\n${CYAN}Radius:${RESET}`);
  console.log(`  --radius-sm (4px)  --radius-md (8px)  --radius-lg (16px)  --radius-xl (24px)  --radius-full (999px)`);

  console.log(`\n${CYAN}Fonts:${RESET}`);
  console.log(`  English:  'Geist Mono', monospace`);
  console.log(`  Chinese:  'PingFang SC', 'Noto Sans SC', sans-serif`);

  console.log(`\n${CYAN}Theme:${RESET}`);
  console.log(`  Light:  <html>                    (default)`);
  console.log(`  Dark:   <html data-theme="dark">`);
  console.log('');
}

// === DOCTOR ===
else if (command === 'doctor') {
  console.log(LOGO);
  console.log(`${BOLD}Checking project compliance...${RESET}\n`);

  let issues = 0;

  // Check CLAUDE.md
  if (fs.existsSync(path.join(projectRoot, 'CLAUDE.md'))) {
    console.log(`  ${GREEN}✓${RESET} CLAUDE.md found`);
  } else {
    console.log(`  ${RED}✗${RESET} CLAUDE.md missing — run ${CYAN}teamo-ds ai${RESET}`);
    issues++;
  }

  // Check tokens
  const tokenPaths = [
    'src/styles/tokens.css', 'styles/tokens.css', 'tokens.css',
  ];
  const foundToken = tokenPaths.find(p => fs.existsSync(path.join(projectRoot, p)));
  if (foundToken) {
    console.log(`  ${GREEN}✓${RESET} tokens.css found at ${foundToken}`);
  } else {
    console.log(`  ${RED}✗${RESET} tokens.css missing — run ${CYAN}teamo-ds tokens${RESET}`);
    issues++;
  }

  // Scan for hardcoded colors in CSS/TSX files
  const scanDirs = ['src'];
  let hardcodedCount = 0;
  const interCount = { files: [] };

  function scanFile(filePath) {
    const content = fs.readFileSync(filePath, 'utf-8');
    // Check for hardcoded hex colors (not in comments or token files)
    if (filePath.includes('tokens')) return;
    const hexMatches = content.match(/#[0-9a-fA-F]{6}\b/g);
    if (hexMatches) hardcodedCount += hexMatches.length;
    // Check for Inter font
    if (content.includes("'Inter'") || content.includes('"Inter"') || content.includes('font-family: Inter')) {
      interCount.files.push(path.relative(projectRoot, filePath));
    }
  }

  function scanDir(dir) {
    const fullDir = path.join(projectRoot, dir);
    if (!fs.existsSync(fullDir)) return;
    for (const item of fs.readdirSync(fullDir, { withFileTypes: true })) {
      if (item.isDirectory() && !item.name.startsWith('.') && item.name !== 'node_modules') {
        scanDir(path.join(dir, item.name));
      } else if (item.isFile() && /\.(css|scss|tsx?|jsx?)$/.test(item.name)) {
        scanFile(path.join(fullDir, item.name));
      }
    }
  }

  for (const dir of scanDirs) scanDir(dir);

  if (hardcodedCount === 0) {
    console.log(`  ${GREEN}✓${RESET} No hardcoded hex colors found`);
  } else {
    console.log(`  ${YELLOW}⚠${RESET} ${hardcodedCount} hardcoded hex colors found — use var(--token) instead`);
    issues++;
  }

  if (interCount.files.length === 0) {
    console.log(`  ${GREEN}✓${RESET} No Inter font references`);
  } else {
    console.log(`  ${RED}✗${RESET} Inter font found in ${interCount.files.length} files — use Geist Mono / PingFang SC`);
    interCount.files.slice(0, 3).forEach(f => console.log(`    ${DIM}${f}${RESET}`));
    issues++;
  }

  console.log('');
  if (issues === 0) {
    console.log(`${GREEN}${BOLD}All checks passed!${RESET} ✦\n`);
  } else {
    console.log(`${YELLOW}${BOLD}${issues} issue(s) found.${RESET} Run ${CYAN}teamo-ds init${RESET} to fix.\n`);
  }
}

else {
  console.log(`${RED}Unknown command: ${command}${RESET}`);
  console.log(`Run ${CYAN}teamo-ds help${RESET} for usage.`);
}
