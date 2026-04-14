# Overnight Radar UI 设计标准

> 版本: v1.0.0
> 更新时间: 2026-04-14
> 设计系统: Data-Dense Dashboard + Dark Theme
> 本地化: 中国用户习惯（红涨绿跌）

## 📋 目录

- [设计原则](#设计原则)
- [色彩系统](#色彩系统)
- [字体排版](#字体排版)
- [间距系统](#间距系统)
- [组件规范](#组件规范)
- [图标系统](#图标系统)
- [动画与交互](#动画与交互)
- [响应式设计](#响应式设计)
- [可访问性](#可访问性)
- [代码规范](#代码规范)

---

## 🎯 设计原则

### 核心价值

1. **数据优先**: 信息密度高，但保持可读性
2. **专业可信**: 金融级严谨，避免花哨设计
3. **快速响应**: 实时数据，流畅交互
4. **深色护眼**: 长时间使用不疲劳

### 设计理念

- **形式追随功能**: 每个视觉元素都有明确功能
- **渐进式披露**: 核心信息优先，详情按需展开
- **一致性优先**: 相同功能在不同页面保持一致

---

## 🎨 色彩系统

### 主色调

| 用途 | 颜色 | Hex | CSS 变量 | 应用场景 |
|------|------|-----|----------|----------|
| Primary 主色 | 金色 | `#F59E0B` | `--color-primary` | 主要操作、激活状态、品牌识别 |
| On Primary | 深蓝 | `#0F172A` | `--color-on-primary` | 主色上的文字 |
| Secondary 辅色 | 浅金 | `#FBBF24` | `--color-secondary` | 悬停状态、次要强调 |
| Accent 强调色 | 紫色 | `#8B5CF6` | `--color-accent` | 特殊功能、CTA按钮 |

### 中性色

| 用途 | 颜色 | Hex | CSS 变量 |
|------|------|-----|----------|
| Background 背景 | 深蓝黑 | `#0F172A` | `--color-background` |
| Surface 表面 | 深灰蓝 | `#1E293B` | `--color-surface` |
| Surface Elevated | 中灰蓝 | `#334155` | `--color-surface-elevated` |
| Foreground 前景 | 浅灰白 | `#F8FAFC` | `--color-foreground` |
| Muted 弱化 | 灰色 | `#94A3B8` | `--color-muted` |
| Border 边框 | 灰蓝 | `#334155` | `--color-border` |

### 功能色

| 类型 | 颜色 | Hex | CSS 变量 | 含义 |
|------|------|-----|----------|------|
| Success 成功 | 绿色 | `#10B981` | `--color-success` | 操作成功、看涨（美股） |
| Warning 警告 | 橙色 | `#F59E0B` | `--color-warning` | 注意、中等信号 |
| Info 信息 | 蓝色 | `#3B82F6` | `--color-info` | 信息提示 |
| Destructive 危险 | 红色 | `#EF4444` | `--color-destructive` | 删除、看跌（美股） |

### 金融专用色

| 类型 | 颜色 | Hex | CSS 变量 | 含义 |
|------|------|-----|----------|------|
| Bull 看涨 | 红色 | `#EF4444` | `--color-bull` | 上涨（中国习惯） |
| Bull BG | 浅红 | `rgba(239, 68, 68, 0.1)` | `--color-bull-bg` | 看涨背景 |
| Bear 看跌 | 绿色 | `#10B981` | `--color-bear` | 下跌（中国习惯） |
| Bear BG | 浅绿 | `rgba(16, 185, 129, 0.1)` | `--color-bear-bg` | 看跌背景 |
| Neutral 中性 | 灰色 | `#64748B` | `--color-neutral` | 无明显变化 |
| Neutral BG | 浅灰 | `rgba(100, 116, 139, 0.1)` | `--color-neutral-bg` | 中性背景 |

> **说明**: 本设计系统遵循中国用户习惯，使用红色表示上涨，绿色表示下跌。所有市场统一使用此配色。

---

## 🔤 字体排版

### 字体家族

```css
--font-family: 'IBM Plex Sans', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
```

**导入方式**:
```html
@import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@300;400;500;600;700&display=swap');
```

### 字体大小

| 级别 | 大小 | CSS 变量 | 用途 |
|------|------|----------|------|
| XS | 11px | `--font-size-xs` | 辅助标签、版权信息 |
| SM | 12px | `--font-size-sm` | 说明文字、次要信息 |
| Base | 14px | `--font-size-base` | 正文、默认大小 |
| LG | 16px | `--font-size-lg` | 重要文字、卡片标题 |
| XL | 18px | `--font-size-xl` | 小标题 |
| 2XL | 20px | `--font-size-2xl` | 页面标题 |
| 3XL | 24px | `--font-size-3xl` | 主标题 |
| 4XL | 32px | `--font-size-4xl` | 特大标题 |

### 字重

| 名称 | 值 | CSS 变量 | 用途 |
|------|-----|----------|------|
| Normal | 400 | `--font-weight-normal` | 正文 |
| Medium | 500 | `--font-weight-medium` | 次要标题 |
| Semibold | 600 | `--font-weight-semibold` | 重要标题、按钮 |
| Bold | 700 | `--font-weight-bold` | 主标题、强调 |

### 行高

| 类型 | 值 | CSS 变量 | 用途 |
|------|-----|----------|------|
| Tight | 1.25 | `--line-height-tight` | 标题 |
| Normal | 1.5 | `--line-height-normal` | 正文 |
| Relaxed | 1.75 | `--line-height-relaxed` | 长篇文本 |

---

## 📐 间距系统

基于 4pt/8dp 标准的间距系统：

| 间距 | 值 | CSS 变量 | 用途示例 |
|------|-----|----------|----------|
| 1 | 4px | `--spacing-1` | 图标与文字间距 |
| 2 | 8px | `--spacing-2` | 相关元素间距 |
| 3 | 12px | `--spacing-3` | 小组件内边距 |
| 4 | 16px | `--spacing-4` | 卡片内边距 |
| 5 | 20px | `--spacing-5` | 模块间距 |
| 6 | 24px | `--spacing-6` | 页面边距 |
| 8 | 32px | `--spacing-8` | 大模块间距 |
| 10 | 40px | `--spacing-10` | 页面区域间距 |
| 12 | 48px | `--spacing-12` | 页面顶级间距 |

**使用原则**:
- 组件内部使用 `--spacing-2` ~ `--spacing-4`
- 组件之间使用 `--spacing-4` ~ `--spacing-6`
- 页面区域使用 `--spacing-8` 及以上

---

## 🧩 组件规范

### 按钮

#### 主要按钮 (Primary)

```html
<button class="btn btn-primary">
  <span>确认</span>
</button>
```

#### 幽灵按钮 (Ghost)

```html
<button class="btn btn-ghost">
  <span>取消</span>
</button>
```

#### 按钮状态

| 状态 | 样式 | CSS 类 |
|------|------|--------|
| 正常 | 背景色 + 文字色 | `.btn` |
| 悬停 | 背景色加深 + 轻微上移 | `:hover` |
| 禁用 | 透明度降低 + 禁用光标 | `:disabled` |
| 加载 | 旋转动画 + 禁用点击 | `.btn.loading` |

### 输入框

```html
<input
  type="text"
  class="input"
  placeholder="请输入..."
  required
>
```

**样式规范**:
- 边框: `1px solid var(--color-border)`
- 聚焦边框: `1px solid var(--color-primary)`
- 圆角: `var(--radius-md)`
- 内边距: `var(--spacing-3) var(--spacing-4)`

### 卡片

```html
<div class="card">
  <div class="card-header">
    <h3 class="card-title">标题</h3>
  </div>
  <div class="card-body">
    内容区域
  </div>
</div>
```

**样式规范**:
- 背景: `var(--color-surface)`
- 边框: `1px solid var(--color-border)`
- 圆角: `var(--radius-lg)`
- 阴影: `var(--shadow-sm)`
- 悬停阴影: `var(--shadow-md)`

### 标签

```html
<span class="tag tag-success">上涨</span>
<span class="tag tag-danger">下跌</span>
<span class="tag tag-neutral">平盘</span>
```

### 模态框

```html
<div class="modal">
  <div class="modal-backdrop"></div>
  <div class="modal-content">
    <button class="modal-close">✕</button>
    <div class="modal-body">
      内容
    </div>
  </div>
</div>
```

**规范**:
- 遮罩: `rgba(15, 23, 42, 0.8)` + 毛玻璃效果
- 内容区域: 最大宽度 `400px` / `600px`
- 动画: 淡入 + 上滑
- 关闭: 右上角 X + 点击遮罩 + ESC 键

---

## 🎯 图标系统

### 设计原则

1. **使用 SVG 图标**: 不使用 emoji 或图片
2. **统一风格**: 使用线性图标 (stroke width: 2px)
3. **尺寸标准**: 16px / 20px / 24px
4. **清晰语义**: 图标含义应直观明了

### 图标库

推荐使用 [Lucide Icons](https://lucide.dev/) 或 [Heroicons](https://heroicons.com/)

### 底部导航图标（v1.0）

| 功能 | 图标代码 | 激活色 |
|------|----------|--------|
| 市场观察 | `<rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><path d="M3 14h7v7H3z"></path>` | 金色 #F59E0B |
| 隔夜雷达 | `<path d="M12 20a8 8 0 1 0 0-16 8 8 0 0 0 0 16z"></path><path d="M12 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4z"></path><path d="M12 2v4"></path><path d="M12 18v4"></path><path d="M4.93 4.93l2.83 2.83"></path><path d="M16.24 16.24l2.83 2.83"></path><path d="M2 12h4"></path><path d="M18 12h4"></path><path d="M4.93 19.07l2.83-2.83"></path><path d="M16.24 7.76l2.83-2.83"></path>` | 紫色 #8B5CF6 |

> **设计说明**:
> - **市场观察**: 热力图方块（2x2布局），表达数据可视化概念
> - **隔夜雷达**: 信号雷达（圆圈+中心点+扫描线），强调信号检测功能

详细图标规范请查看 [ICON-SYSTEM.md](./ICON-SYSTEM.md)

### 常用图标

| 功能 | 图标代码 |
|------|----------|
| 关闭 | `<line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line>` |
| 警告 | `<path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line>` |
| 上涨 | `<polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline><polyline points="17 6 23 6 23 12"></polyline>` |
| 下跌 | `<polyline points="23 18 13.5 8.5 8.5 13.5 1 6"></polyline><polyline points="17 18 23 18 23 12"></polyline>` |

### 使用示例

```html
<!-- 内联 SVG -->
<svg class="icon" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <circle cx="12" cy="12" r="10"></circle>
  <line x1="12" y1="16" x2="12" y2="12"></line>
  <line x1="12" y1="8" x2="12.01" y2="8"></line>
</svg>
```

---

## ✨ 动画与交互

### 动画时长

| 类型 | 时长 | CSS 变量 | 用途 |
|------|------|----------|------|
| 快速 | 150ms | `--transition-fast` | 悬停、点击反馈 |
| 标准 | 200ms | `--transition-base` | 大多数过渡 |
| 慢速 | 300ms | `--transition-slow` | 页面切换、模态框 |

### 缓动函数

```css
/* 标准 */
transition: all var(--transition-base) ease;

/* 自定义缓动 */
transition: all var(--transition-base) cubic-bezier(0.4, 0, 0.2, 1);
```

### 常用动画

#### 加载动画

```css
.spinner {
  width: 40px;
  height: 40px;
  border: 3px solid var(--color-surface-elevated);
  border-top-color: var(--color-primary);
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}
```

#### 骨架屏

```css
.skeleton {
  background: linear-gradient(
    90deg,
    var(--color-surface) 0%,
    var(--color-surface-elevated) 50%,
    var(--color-surface) 100%
  );
  background-size: 200% 100%;
  animation: shimmer 1.5s ease-in-out infinite;
}

@keyframes shimmer {
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}
```

#### 淡入

```css
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}
```

#### 上滑

```css
@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
```

### 减少动画

```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## 📱 响应式设计

### 断点系统

| 断点名称 | 宽度 | 设备类型 |
|----------|------|----------|
| XS | < 480px | 小屏手机 |
| SM | 480px - 767px | 大屏手机 |
| MD | 768px - 1023px | 平板 |
| LG | 1024px - 1439px | 桌面 |
| XL | ≥ 1440px | 大屏桌面 |

### 移动端优先

```css
/* 默认样式（移动端） */
.component {
  padding: var(--spacing-4);
}

/* 平板及以上 */
@media (min-width: 768px) {
  .component {
    padding: var(--spacing-6);
  }
}
```

### 网格系统

```css
/* 自动填充网格 */
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
  gap: var(--spacing-3);
}

/* 响应式网格 */
@media (max-width: 480px) {
  .grid {
    grid-template-columns: repeat(auto-fill, minmax(90px, 1fr));
    gap: var(--spacing-2);
  }
}
```

---

## ♿ 可访问性

### 对比度标准

- **正常文字**: 最小 4.5:1 (AA级别)
- **大号文字**: 最小 3:1
- **图标/图形**: 最小 3:1

### 键盘导航

```css
:focus-visible {
  outline: 2px solid var(--color-ring);
  outline-offset: 2px;
  border-radius: var(--radius-sm);
}
```

### 语义化 HTML

```html
<!-- 正确 ✅ -->
<button class="btn">提交</button>
<a href="/details" class="link">查看详情</a>

<!-- 错误 ❌ -->
<div class="btn" onclick="submit()">提交</div>
```

### ARIA 标签

```html
<!-- 图标按钮 -->
<button aria-label="关闭">
  <svg>...</svg>
</button>

<!-- 加载状态 -->
<div role="status" aria-live="polite">
  <div class="spinner"></div>
  <span class="sr-only">加载中...</span>
</div>
```

### 屏幕阅读器

```css
/* 仅屏幕阅读器可见 */
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}
```

---

## 📝 代码规范

### CSS 命名

采用 BEM (Block Element Modifier) 方法论：

```css
/* Block */
.block {}

/* Element */
.block__element {}

/* Modifier */
.block--modifier {}
.block__element--modifier {}
```

### CSS 组织

```css
/* ─── Reset & Base ───────────────────────────── */

/* ─── CSS Variables ────────────────────────────── */

/* ─── Typography ───────────────────────────────── */

/* ─── Components ───────────────────────────────── */

/* ─── Utilities ────────────────────────────────── */

/* ─── Responsive ───────────────────────────────── */
```

### JavaScript 模块化

```javascript
// 推荐的模块结构
export const componentName = {
  init(container, data) {
    // 初始化
  },

  render(data) {
    // 渲染
  },

  update(data) {
    // 更新
  },

  destroy() {
    // 清理
  }
};
```

---

## 🚀 实施清单

### 新功能开发

- [ ] 遵循本设计系统的色彩、字体、间距规范
- [ ] 使用语义化 HTML 和可访问性最佳实践
- [ ] 实现 SVG 图标，不使用 emoji
- [ ] 添加适当的加载状态和错误处理
- [ ] 确保响应式设计和移动端体验
- [ ] 测试键盘导航和屏幕阅读器
- [ ] 添加平滑的过渡动画（尊重 reduced-motion）

### 代码审查

- [ ] 检查色彩对比度是否符合 WCAG AA 标准
- [ ] 验证所有交互元素有清晰的悬停/焦点状态
- [ ] 确认图标使用 SVG 而非图片或 emoji
- [ ] 检查动画时长在 150-300ms 范围内
- [ ] 验证移动端触摸目标不小于 44x44px
- [ ] 确认使用了语义化 HTML 标签
- [ ] 检查表单输入有关联的 label

---

## 📚 参考资料

- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [Material Design Accessibility](https://material.io/design/usability/accessibility.html)
- [Apple Human Interface Guidelines](https://developer.apple.com/design/human-interface-guidelines/)
- [Lucide Icons](https://lucide.dev/)
- [IBM Plex Sans](https://fonts.google.com/specimen/IBM+Plex+Sans)

---

**维护者**: Overnight Radar 开发团队
**最后更新**: 2026-04-14
