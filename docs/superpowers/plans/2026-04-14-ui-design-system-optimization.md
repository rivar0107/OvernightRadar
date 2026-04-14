# UI 设计系统优化实施计划

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-step. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 根据 `design/design-system.html` 规范优化项目的 UI 设计，提升视觉效果和用户体验

**架构:** 基于 CSS 变量的设计系统，通过更新图标、优化组件样式、统一设计语言来实现

**Tech Stack:** 原生 HTML/CSS/JavaScript、Vite、CSS 变量

---

## 文件结构

**需要修改的文件：**
- `web/index.html` - 更新底部导航图标
- `web/src/style.css` - 确保所有组件样式符合设计规范
- `web/src/components/heatmap-block.js` - 检查热力图区块样式
- `web/src/components/indicators.js` - 检查指标组件样式
- `web/src/views/heatmap.js` - 检查热力图视图样式
- `web/src/views/radar.js` - 检查雷达视图样式

---

## Task 1: 优化底部导航图标

**参考：** `design/design-system.html` 第 787-812 行的图标设计

**Files:**
- Modify: `web/index.html:32-49`

**设计规范中的图标：**

市场观察图标（4个方块网格）：
```html
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <rect x="3" y="3" width="7" height="7"></rect>
  <rect x="14" y="3" width="7" height="7"></rect>
  <rect x="14" y="14" width="7" height="7"></rect>
  <path d="M3 14h7v7H3z"></path>
</svg>
```

隔夜雷达图标（雷达扫描）：
```html
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <path d="M12 20a8 8 0 1 0 0-16 8 8 0 0 0 0 16z"></path>
  <path d="M12 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4z"></path>
  <path d="M12 2v4"></path>
  <path d="M12 18v4"></path>
  <path d="M4.93 4.93l2.83 2.83"></path>
  <path d="M16.24 16.24l2.83 2.83"></path>
  <path d="M2 12h4"></path>
  <path d="M18 12h4"></path>
  <path d="M4.93 19.07l2.83-2.83"></path>
  <path d="M16.24 7.76l2.83-2.83"></path>
</svg>
```

- [ ] **Step 1: 备份当前 index.html**

```bash
cp web/index.html web/index.html.backup
```

- [ ] **Step 2: 更新市场观察图标**

在 `web/index.html` 第 33-37 行，将当前的市场观察图标替换为：

```html
<svg class="tab-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <rect x="3" y="3" width="7" height="7"></rect>
  <rect x="14" y="3" width="7" height="7"></rect>
  <rect x="14" y="14" width="7" height="7"></rect>
  <path d="M3 14h7v7H3z"></path>
</svg>
```

- [ ] **Step 3: 更新隔夜雷达图标**

在 `web/index.html` 第 41-47 行，将当前的隔夜雷达图标替换为：

```html
<svg class="tab-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <path d="M12 20a8 8 0 1 0 0-16 8 8 0 0 0 0 16z"></path>
  <path d="M12 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4z"></path>
  <path d="M12 2v4"></path>
  <path d="M12 18v4"></path>
  <path d="M4.93 4.93l2.83 2.83"></path>
  <path d="M16.24 16.24l2.83 2.83"></path>
  <path d="M2 12h4"></path>
  <path d="M18 12h4"></path>
  <path d="M4.93 19.07l2.83-2.83"></path>
  <path d="M16.24 7.76l2.83-2.83"></path>
</svg>
```

- [ ] **Step 4: 验证 HTML 语法**

```bash
# 确保没有语法错误
grep -n "tab-icon" web/index.html
```

预期：看到两处 tab-icon，都是新的图标代码

- [ ] **Step 5: 在浏览器中测试**

1. 打开 http://localhost:5174/OvernightRadar/
2. 检查底部导航的两个图标
3. 验证图标清晰、美观
4. 切换标签页，验证交互状态

- [ ] **Step 6: 提交更改**

```bash
git add web/index.html
git commit -m "feat: 优化底部导航图标，使用设计规范中的精致图标"
```

---

## Task 2: 优化热力图区块样式

**参考：** `design/design-system.html` 第 276-340 行

**Files:**
- Modify: `web/src/style.css` - 检查并优化 `.wl-block` 相关样式

**设计规范要求：**
```css
.wl-block {
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  padding: var(--spacing-4) var(--spacing-3);
  text-align: center;
  cursor: pointer;
  transition: all var(--transition-base);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 90px;
}

.wl-block:hover {
  background: var(--color-surface-elevated);
  border-color: var(--color-primary);
  transform: translateY(-2px);
  box-shadow: var(--shadow-lg);
}
```

- [ ] **Step 1: 检查当前热力图区块样式**

```bash
grep -n "wl-block" web/src/style.css | head -20
```

- [ ] **Step 2: 对比设计规范，找出差异**

检查以下属性是否存在且正确：
- border-radius: var(--radius-lg) (12px)
- padding: var(--spacing-4) var(--spacing-3) (16px 12px)
- min-height: 90px
- hover 状态的 transform 和 box-shadow

- [ ] **Step 3: 更新样式（如果需要）**

如果当前样式与设计规范不符，更新 `web/src/style.css` 中的 `.wl-block` 相关样式。

- [ ] **Step 4: 在浏览器中测试**

1. 访问市场观察页面
2. 将鼠标悬停在热力图区块上
3. 验证 hover 效果（背景色变化、边框高亮、上移 2px、阴影）

- [ ] **Step 5: 提交更改**

```bash
git add web/src/style.css
git commit -m "style: 优化热力图区块样式，符合设计规范"
```

---

## Task 3: 优化市场切换器样式

**参考：** `design/design-system.html` 第 201-231 行

**Files:**
- Modify: `web/src/style.css` - 检查并优化市场切换器样式

**设计规范要求：**
```css
.wl-market-switcher-top {
  display: inline-flex;
  gap: var(--spacing-1);
  background: var(--color-surface);
  padding: var(--spacing-1);
  border-radius: var(--radius-md);
  margin-bottom: var(--spacing-4);
}

.wl-market-btn {
  padding: var(--spacing-2) var(--spacing-4);
  border: none;
  background: transparent;
  color: var(--color-muted);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-semibold);
  border-radius: var(--radius-sm);
  cursor: pointer;
  transition: all var(--transition-base);
}

.wl-market-btn.active {
  background: var(--color-primary);
  color: var(--color-on-primary);
  box-shadow: var(--shadow-sm);
}
```

- [ ] **Step 1: 检查当前市场切换器样式**

```bash
grep -n "market-switcher\|market-btn" web/src/style.css
```

- [ ] **Step 2: 对比设计规范，确保一致性**

检查：
- 按钮圆角：var(--radius-sm) (6px)
- active 状态背景：var(--color-primary)
- active 状态文字：var(--color-on-primary)
- 过渡动画：var(--transition-base)

- [ ] **Step 3: 在浏览器中测试**

1. 访问市场观察页面
2. 切换美股/A股市场
3. 验证切换动画和视觉效果

- [ ] **Step 4: 提交更改**

```bash
git add web/src/style.css
git commit -m "style: 优化市场切换器样式，符合设计规范"
```

---

## Task 4: 优化指标按钮样式

**参考：** `design/design-system.html` 第 233-276 行

**Files:**
- Modify: `web/src/style.css` - 检查并优化指标按钮样式

**设计规范要求：**
```css
.wl-indicator-btn {
  padding: var(--spacing-2) var(--spacing-4);
  border: 1px solid var(--color-border);
  background: var(--color-surface);
  color: var(--color-muted);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-semibold);
  border-radius: var(--radius-md);
  cursor: pointer;
  transition: all var(--transition-base);
}

.wl-indicator-btn.active {
  background: var(--color-accent);
  color: #fff;
  border-color: var(--color-accent);
  box-shadow: var(--shadow-md);
}
```

- [ ] **Step 1: 检查当前指标按钮样式**

```bash
grep -n "indicator-btn" web/src/style.css
```

- [ ] **Step 2: 确保符合设计规范**

重点检查 active 状态：
- 背景色：var(--color-accent) (#8B5CF6 紫色)
- 文字颜色：#fff (白色)
- 边框颜色：var(--color-accent)
- 阴影：var(--shadow-md)

- [ ] **Step 3: 在浏览器中测试**

1. 访问市场观察页面
2. 切换不同指标（日涨跌、5日强弱等）
3. 验证 active 状态的紫色高亮效果

- [ ] **Step 4: 提交更改**

```bash
git add web/src/style.css
git commit -m "style: 优化指标按钮样式，使用紫色 accent 高亮"
```

---

## Task 5: 添加响应式优化

**参考：** `design/design-system.html` 第 489-509 行

**Files:**
- Modify: `web/src/style.css` - 确保响应式断点正确

**设计规范要求：**
```css
@media (max-width: 768px) {
  :root {
    --font-size-3xl: 20px;
    --font-size-2xl: 18px;
  }

  .wl-blocks {
    grid-template-columns: repeat(auto-fill, minmax(90px, 1fr));
    gap: var(--spacing-2);
  }

  .wl-block {
    padding: var(--spacing-3) var(--spacing-2);
    min-height: 80px;
  }

  .wl-block-value {
    font-size: var(--font-size-xl);
  }
}
```

- [ ] **Step 1: 检查当前响应式样式**

```bash
grep -n "@media" web/src/style.css
```

- [ ] **Step 2: 确保移动端优化到位**

在移动端（<768px）：
- 热力图区块最小宽度 90px
- 区块间距缩小到 8px
- 区块内边距缩小
- 数值字体缩小到 18px

- [ ] **Step 3: 在浏览器中测试**

1. 打开开发者工具（F12）
2. 切换到移动设备视图（iPhone 375px）
3. 验证热力图布局和可读性
4. 测试底部导航和页面滚动

- [ ] **Step 4: 提交更改**

```bash
git add web/src/style.css
git commit -m "style: 优化移动端响应式布局"
```

---

## Task 6: 添加加载和空状态优化

**参考：** `design/design-system.html` 第 168-198 行

**Files:**
- Modify: `web/src/style.css` - 添加骨架屏和加载状态样式

**设计规范要求：**
```css
.loading-spinner {
  width: 40px;
  height: 40px;
  border: 3px solid var(--color-surface-elevated);
  border-top-color: var(--color-primary);
  border-radius: var(--radius-full);
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.skeleton {
  background: linear-gradient(
    90deg,
    var(--color-surface) 0%,
    var(--color-surface-elevated) 50%,
    var(--color-surface) 100%
  );
  background-size: 200% 100%;
  animation: shimmer 1.5s ease-in-out infinite;
  border-radius: var(--radius-md);
}

@keyframes shimmer {
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}
```

- [ ] **Step 1: 检查当前加载状态样式**

```bash
grep -n "loading\|skeleton" web/src/style.css
```

- [ ] **Step 2: 添加骨架屏样式（如果缺失）**

确保加载状态使用金色（var(--color-primary)）作为强调色

- [ ] **Step 3: 测试加载状态**

1. 清除浏览器缓存
2. 刷新页面，观察加载动画
3. 验证加载器颜色为金色

- [ ] **Step 4: 提交更改**

```bash
git add web/src/style.css
git commit -m "style: 优化加载状态样式，使用金色主题"
```

---

## Task 7: 最终测试和验证

**Files:**
- Test: 所有已修改的文件

- [ ] **Step 1: 完整的视觉测试**

检查清单：
- [ ] 底部导航图标清晰美观
- [ ] 热力图区块 hover 效果流畅
- [ ] 市场切换器动画自然
- [ ] 指标按钮 active 状态明显（紫色高亮）
- [ ] 所有颜色符合设计规范（金色主题、红涨绿跌）
- [ ] 字体使用 IBM Plex Sans
- [ ] 圆角、间距、阴影一致

- [ ] **Step 2: 响应式测试**

测试设备尺寸：
- [ ] iPhone SE (375px)
- [ ] iPad (768px)
- [ ] Desktop (1440px)

- [ ] **Step 3: 交互测试**

- [ ] 点击底部导航切换页面
- [ ] 切换市场（美股/A股）
- [ ] 切换指标
- [ ] 点击热力图区块

- [ ] **Step 4: 浏览器兼容性测试**

测试浏览器：
- [ ] Chrome
- [ ] Safari
- [ ] Firefox

- [ ] **Step 5: 最终提交**

```bash
git status
git add .
git commit -m "style: 完成 UI 设计系统优化，符合 design-system.html 规范"
```

---

## 附录：设计系统关键参考

**色彩系统：**
- Primary: #F59E0B (金色 - 信任)
- Secondary: #FBBF24 (浅金)
- Accent: #8B5CF6 (紫色 - 科技)
- Bull: #EF4444 (红色 - 看涨)
- Bear: #10B981 (绿色 - 看跌)

**字体：**
- 字体族：IBM Plex Sans
- 字重：400/500/600/700
- 大小：11px ~ 32px

**间距：**
- 基于 4px/8dp 标尺
- 常用：8px, 12px, 16px, 24px, 32px

**圆角：**
- sm: 6px
- md: 8px
- lg: 12px
- xl: 16px

**阴影：**
- sm: 0 1px 2px rgba(0,0,0,0.2)
- md: 0 4px 6px rgba(0,0,0,0.25)
- lg: 0 10px 15px rgba(0,0,0,0.3)
