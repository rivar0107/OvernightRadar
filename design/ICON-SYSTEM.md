# 图标系统规范

> Overnight Radar v1.0 - 底部导航图标设计

## 📋 图标清单

| 功能 | 图标名称 | 激活色 | SVG 路径 | 说明 |
|------|----------|--------|----------|------|
| 市场观察 | 热力图方块 | 金色 #F59E0B | 4个矩形组成的2x2网格 | 表达热力图和数据可视化概念 |
| 隔夜雷达 | 信号雷达 | 紫色 #8B5CF6 | 圆圈+中心点+8条扫描线 | 表达信号检测和市场扫描功能 |

---

## 🎨 市场观察图标

### 设计理念

使用 2x2 热力图方块布局，每个方块代表一个数据区块，直观表达产品的核心功能——展示板块相对强度的热力图。

### SVG 代码

```html
<svg class="tab-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <rect x="3" y="3" width="7" height="7"></rect>
  <rect x="14" y="3" width="7" height="7"></rect>
  <rect x="14" y="14" width="7" height="7"></rect>
  <path d="M3 14h7v7H3z"></path>
</svg>
```

### 视觉元素

- **左上角方块**: (3,3) 到 (10,10)
- **右上角方块**: (14,3) 到 (21,10)
- **右下角方块**: (14,14) 到 (21,21)
- **左下角方块**: (3,14) 到 (10,21) - 使用 path 绘制

### 色彩状态

| 状态 | 颜色 | CSS 变量 |
|------|------|----------|
| 激活 | 金色 #F59E0B | `var(--color-primary)` |
| 非激活 | 灰色 #94A3B8 | `var(--color-muted)` |
| 悬停 | 金色 #FBBF24 | `var(--color-secondary)` |

### 设计含义

- 四个方块象征不同的板块或数据维度
- 简洁的几何形状，符合现代扁平化设计趋势
- 2x2 网格布局易于识别和理解
- 与热力图组件的视觉语言保持一致

---

## 📡 隔夜雷达图标

### 设计理念

保留雷达圆圈的核心元素，增加扫描线细节，强调"信号检测"和"市场扫描"功能。

### SVG 代码

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

### 视觉元素

- **外圆**: 半径 10，表示雷达扫描范围
- **内圆**: 半径 8，信号检测区域
- **中心点**: 半径 2 的圆，强调"信号"概念
- **扫描线**: 8 条线均匀分布（每 45° 一条）
  - 垂直: 上下各 1 条
  - 水平: 左右各 1 条
  - 对角: 4 条对角线

### 色彩状态

| 状态 | 颜色 | CSS 变量 |
|------|------|----------|
| 激活 | 紫色 #8B5CF6 | `var(--color-accent)` |
| 非激活 | 灰色 #94A3B8 | `var(--color-muted)` |
| 悬停 | 亮紫色 #A78BFA | — |

### 设计含义

- 圆圈象征雷达扫描范围和市场覆盖
- 中心点突出"信号"和"目标"概念
- 8 条扫描线增强动态感和识别度
- 使用紫色（#8B5CF6）体现科技感和智能感

---

## 🔄 激活状态

### 市场观察激活

```css
.tab-item.active .tab-icon {
  color: var(--color-primary); /* #F59E0B 金色 */
  transform: scale(1.1);
}
```

### 隔夜雷达激活

```css
.tab-item.active .tab-icon {
  color: var(--color-accent); /* #8B5CF6 紫色 */
  transform: scale(1.1);
}
```

### 非激活状态

```css
.tab-item .tab-icon {
  color: var(--color-muted); /* #94A3B8 灰色 */
}
```

---

## 📐 尺寸规范

| 尺寸 | 用途 | 实际像素 |
|------|------|----------|
| 标准尺寸 | 底部导航 | 24px × 24px |
| 小尺寸 | 内联使用 | 16px × 16px |
| 大尺寸 | 展示用途 | 48px × 48px |

### 描边宽度

- **标准**: 2px（24px 图标）
- **小图标**: 1.5px（16px 图标）
- **大图标**: 2.5px（48px 图标）

---

## 🎯 使用规范

### 底部导航

```html
<nav class="tab-nav">
  <button class="tab-item active">
    <svg class="tab-icon"><!-- 市场观察图标 --></svg>
    <span class="tab-label">市场观察</span>
  </button>
  <button class="tab-item">
    <svg class="tab-icon"><!-- 隔夜雷达图标 --></svg>
    <span class="tab-label">隔夜雷达</span>
  </button>
</nav>
```

### 内联使用

```html
<!-- 小尺寸 -->
<svg class="icon icon-sm" width="16" height="16"><!-- 图标路径 --></svg>

<!-- 标准尺寸 -->
<svg class="icon" width="24" height="24"><!-- 图标路径 --></svg>

<!-- 大尺寸 -->
<svg class="icon icon-lg" width="48" height="48"><!-- 图标路径 --></svg>
```

---

## ✅ 设计原则

1. **一致性**: 所有图标使用相同的线条粗细（stroke-width: 2）
2. **简洁性**: 使用基本的几何形状，避免过度装饰
3. **识别性**: 确保图标在小尺寸下依然清晰可辨
4. **功能性**: 图标形状直接表达功能含义
5. **品牌一致性**: 激活色与品牌色系统一致（金色/紫色）

---

## 📝 更新记录

| 日期 | 版本 | 更新内容 |
|------|------|----------|
| 2026-04-14 | v1.0.0 | 初始图标系统建立 - 热力图方块 + 信号雷达 |

---

**维护者**: Overnight Radar 开发团队
**最后更新**: 2026-04-14
