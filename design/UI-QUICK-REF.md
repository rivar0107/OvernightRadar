# Overnight Radar UI 快速参考

> 🚀 给开发者的快速查阅指南

## 🎨 CSS 变量速查

```css
/* ── 颜色 ────────────────────────────────────────────────────────── */
var(--color-primary)         /* #F59E0B 金色 - 主要操作、激活状态 */
var(--color-accent)          /* #8B5CF6 紫色 - 特殊功能、CTA */
var(--color-background)      /* #0F172A 深蓝黑 - 页面背景 */
var(--color-surface)         /* #1E293B 深灰蓝 - 卡片背景 */
var(--color-foreground)      /* #F8FAFC 浅灰白 - 主要文字 */
var(--color-muted)           /* #94A3B8 灰色 - 次要文字 */
var(--color-border)          /* #334155 灰蓝 - 边框 */

/* 金融色彩 */
var(--color-bull)            /* #10B981 绿色 - 上涨（美股） */
var(--color-bear)            /* #EF4444 红色 - 下跌（美股） */

/* ── 字体 ────────────────────────────────────────────────────────── */
var(--font-family)           /* IBM Plex Sans */
var(--font-size-sm)          /* 12px */
var(--font-size-base)        /* 14px */
var(--font-size-lg)          /* 16px */
var(--font-size-xl)          /* 18px */
var(--font-size-2xl)         /* 20px */
var(--font-size-3xl)         /* 24px */
var(--font-weight-semibold)  /* 600 */
var(--font-weight-bold)      /* 700 */

/* ── 间距 ────────────────────────────────────────────────────────── */
var(--spacing-2)             /* 8px  */
var(--spacing-3)             /* 12px */
var(--spacing-4)             /* 16px */
var(--spacing-6)             /* 24px */
var(--spacing-8)             /* 32px */

/* ── 其他 ────────────────────────────────────────────────────────── */
var(--radius-md)             /* 8px  */
var(--radius-lg)             /* 12px */
var(--radius-xl)             /* 16px */
var(--shadow-md)             /* 0 4px 6px rgba(0, 0, 0, 0.25) */
var(--transition-base)       /* 200ms ease */
```

## 📦 常用组件代码片段

### 按钮

```html
<!-- 主要按钮 -->
<button class="btn btn-primary">确认</button>

<!-- 次要按钮 -->
<button class="btn btn-ghost">取消</button>

<!-- 禁用按钮 -->
<button class="btn btn-primary" disabled>禁用</button>
```

### 输入框

```html
<input
  type="text"
  class="input"
  placeholder="请输入..."
>
```

### 卡片

```html
<div class="card">
  <h3 class="card-title">标题</h3>
  <p class="card-text">内容...</p>
</div>
```

### 状态标签

```html
<!-- 上涨 -->
<span class="tag tag-success">+2.5%</span>

<!-- 下跌 -->
<span class="tag tag-danger">-1.2%</span>

<!-- 中性 -->
<span class="tag tag-neutral">0.0%</span>
```

### 加载状态

```html
<!-- 旋转加载器 -->
<div class="loading">
  <div class="loading-spinner"></div>
  <p>加载中...</p>
</div>

<!-- 骨架屏 -->
<div class="skeleton skeleton-block"></div>
```

### 图标

```html
<!-- 使用 Lucide 图标 -->
<svg class="icon" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <circle cx="12" cy="12" r="10"></circle>
  <line x1="12" y1="16" x2="12" y2="12"></line>
</svg>

<!-- 尺寸变体 -->
<svg class="icon icon-sm">...</svg>  <!-- 16x16 -->
<svg class="icon icon-lg">...</svg>  <!-- 24x24 -->
```

## 🎯 常见任务清单

### 新建页面

```html
<!-- 基础页面结构 -->
<div class="page">
  <header class="page-header">
    <h1 class="title">页面标题</h1>
    <p class="slogan">副标题/说明</p>
  </header>

  <main class="page-content">
    <!-- 内容 -->
  </main>
</div>
```

### 新建数据列表

```html
<!-- 列表项 -->
<div class="list-item">
  <div class="list-item-header">
    <h3 class="list-item-title">标题</h3>
    <span class="tag">标签</span>
  </div>
  <div class="list-item-body">
    <p>详情内容</p>
  </div>
  <div class="list-item-footer">
    <span class="text-muted">时间戳</span>
  </div>
</div>
```

### 新建表单

```html
<form class="form">
  <div class="form-group">
    <label class="form-label" for="input">标签</label>
    <input
      type="text"
      id="input"
      class="input"
      placeholder="提示文字"
      required
    >
    <p class="form-hint">帮助文字</p>
  </div>

  <div class="form-actions">
    <button type="submit" class="btn btn-primary">提交</button>
    <button type="button" class="btn btn-ghost">取消</button>
  </div>
</form>
```

### 新建模态框

```html
<div class="modal" id="modal">
  <div class="modal-backdrop" onclick="closeModal()"></div>
  <div class="modal-content">
    <button class="modal-close" onclick="closeModal()">✕</button>

    <div class="modal-header">
      <h2 class="modal-title">标题</h2>
    </div>

    <div class="modal-body">
      内容
    </div>

    <div class="modal-footer">
      <button class="btn btn-primary">确认</button>
      <button class="btn btn-ghost">取消</button>
    </div>
  </div>
</div>
```

## ⚠️ 常见错误

### ❌ 错误：使用 emoji 作为图标

```html
<!-- 错误 -->
<button class="btn">🔍 搜索</button>
```

### ✅ 正确：使用 SVG 图标

```html
<!-- 正确 -->
<button class="btn">
  <svg class="icon" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <circle cx="11" cy="11" r="8"></circle>
    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
  </svg>
  <span>搜索</span>
</button>
```

### ❌ 错误：硬编码颜色值

```css
/* 错误 */
.component {
  background: #1E293B;
  color: #F8FAFC;
}
```

### ✅ 正确：使用 CSS 变量

```css
/* 正确 */
.component {
  background: var(--color-surface);
  color: var(--color-foreground);
}
```

### ❌ 错误：无障碍性问题

```html
<!-- 错误：图标按钮无 aria-label -->
<button onclick="close()">
  <svg>...</svg>
</button>
```

### ✅ 正确：添加可访问性属性

```html
<!-- 正确 -->
<button onclick="close()" aria-label="关闭对话框">
  <svg>...</svg>
</button>
```

## 📱 响应式断点

```css
/* 移动端（默认） */
.component {
  padding: var(--spacing-4);
}

/* 平板 */
@media (min-width: 768px) {
  .component {
    padding: var(--spacing-6);
  }
}

/* 桌面 */
@media (min-width: 1024px) {
  .component {
    padding: var(--spacing-8);
  }
}
```

## 🎨 颜色使用指南

### 金融数据颜色

```css
/* 美股：绿涨红跌 */
.value.up { color: var(--color-bull); }
.value.down { color: var(--color-bear); }

/* A股：红涨绿跌 */
.cn .value.up { color: var(--color-bear); }
.cn .value.down { color: var(--color-bull); }
```

### 背景色层级

```css
/* 页面背景 */
background: var(--color-background);

/* 卡片/组件背景 */
background: var(--color-surface);

/* 悬停/激活状态背景 */
background: var(--color-surface-elevated);
```

## ⚡ 性能优化

### 图片优化

```html
<!-- 懒加载 -->
<img src="image.jpg" loading="lazy" alt="描述">

<!-- 响应式图片 -->
<img
  srcset="image-small.jpg 480w,
          image-medium.jpg 768w,
          image-large.jpg 1024w"
  sizes="(max-width: 768px) 100vw, 50vw"
  src="image-medium.jpg"
  alt="描述"
>
```

### 字体加载

```css
/* 避免不可见文本闪烁 */
@import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Sans&display=swap');
```

## 🔍 调试技巧

### 检查色彩对比度

使用浏览器 DevTools:
1. 选择元素
2. 在 Color Picker 中查看对比度
3. 确保达到 WCAG AA 标准 (4.5:1)

### 检查可访问性

```bash
# 使用 Lighthouse
lighthouse http://localhost:5174 --view

# 或使用浏览器扩展
# Axe DevTools
# WAVE Evaluation Tool
```

### 测试响应式

1. Chrome DevTools → 设备工具栏
2. 测试尺寸: 375px, 768px, 1024px, 1440px
3. 测试横屏模式

## 📚 相关资源

- 📖 [完整设计标准](./UI-STANDARDS.md)
- 🎨 [Lucide 图标库](https://lucide.dev/)
- ♿ [WCAG 快速参考](https://www.w3.org/WAI/WCAG21/quickref/)
- 🌈 [色彩对比度检查器](https://contrast-ratio.com/)

---

**提示**: 将此文件加入浏览器书签，方便快速查阅！
