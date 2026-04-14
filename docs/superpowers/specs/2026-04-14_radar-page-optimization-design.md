# 隔夜雷达页面优化设计

> 版本: v1.0.0
> 更新时间: 2026-04-14
> 目标: 优化用户体验，提升视觉质量

---

## 📋 问题清单

### 当前问题

1. ❌ **emoji 图标不专业** - 违反设计规范
2. ❌ **内容无法分页** - 大量数据时体验差
3. ❌ **缺少加载状态** - Tab 切换无反馈
4. ❌ **空状态不友好** - 提示不够清晰

### 解决方案

1. ✅ **SVG 图标** - 替换所有 emoji
2. ✅ **下拉加载** - "加载更多"按钮，逐步加载内容
3. ✅ **骨架屏** - 加载时显示占位符
4. ✅ **排序功能** - 按不同维度排序
5. ✅ **空状态优化** - 友好的提示和插图

---

## 🎨 1. 图标系统改进

### Tab 导航图标

| Tab | 当前图标 | 新图标（SVG） | 颜色 |
|-----|----------|---------------|------|
| 信号 | 🚨 | 铃铛图标 | #F59E0B（金色） |
| 板块 | 📊 | 网格图标 | #8B5CF6（紫色） |

### SVG 代码

**信号图标（铃铛）**:
```html
<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <path d="M18 8A6 6 0 0 0-6 6v0a6 6 0 0 0 6-6v0a6 6 0 0 0-6 6v0a6 6 0 0 0 6 6v0a6 6 0 0 0-6-6"></path>
  <circle cx="12" cy="13" r="3"></circle>
</svg>
```

**板块图标（网格）**:
```html
<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <rect x="3" y="3" width="7" height="7"></rect>
  <rect x="14" y="3" width="7" height="7"></rect>
  <rect x="3" y="14" width="7" height="7"></rect>
  <rect x="14" y="14" width="7" height="7"></rect>
</svg>
```

---

## 📜 2. 下拉加载更多设计

### 交互流程

```
初始状态
    ↓
显示前 10 条
    ↓
[加载更多] 按钮
    ↓
点击后显示骨架屏
    ↓
追加下 10 条
    ↓
[加载更多] 按钮
    ↓
重复...
    ↓
已加载全部
    ↓
显示"已全部加载"
```

### UI 组件

**加载更多按钮**:
```html
<button class="load-more-btn">
  <span class="btn-text">加载更多</span>
  <span class="btn-count">(剩余 23)</span>
</button>
```

**加载中状态**:
```html
<button class="load-more-btn loading" disabled>
  <div class="spinner"></div>
  <span class="btn-text">加载中...</span>
</button>
```

**已全部加载**:
```html
<div class="load-more-done">
  <span class="done-text">已加载全部内容</span>
</div>
```

---

## ⏳ 3. 加载状态设计

### 骨架屏

**信号列表骨架屏**:
```html
<div class="signals-skeleton">
  <!-- 骨架卡片重复 3 次 -->
  <div class="signal-card skeleton-card">
    <div class="skeleton-header"></div>
    <div class="skeleton-meta"></div>
    <div class="skeleton-action"></div>
    <div class="skeleton-reason"></div>
  </div>
</div>
```

**板块列表骨架屏**:
```html
<div class="sectors-skeleton">
  <!-- 骨架卡片重复 4 次 -->
  <div class="card skeleton-card">
    <div class="skeleton-sentiment"></div>
    <div class="skeleton-header"></div>
    <div class="skeleton-detail"></div>
    <div class="skeleton-stocks"></div>
  </div>
</div>
```

### Tab 切换动画

```css
.radar-content {
  animation: fadeIn 0.2s ease-out;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(8px); }
  to { opacity: 1; transform: translateY(0); }
}
```

---

## 📊 4. 排序功能设计

### 信号排序

```html
<div class="sort-selector">
  <label class="sort-label">排序：</label>
  <select class="sort-select">
    <option value="time">时间</option>
    <option value="confidence">置信度</option>
    <option value="level">信号等级</option>
  </select>
</div>
```

### 板块排序

```html
<div class="sort-selector">
  <label class="sort-label">排序：</label>
  <select class="sort-select">
    <option value="change">涨跌幅</option>
    <option value="sentiment">情绪</option>
    <option value="volatility">波动率</option>
  </select>
</div>
```

---

## 🎯 5. 空状态优化

### 信号空状态

```html
<div class="empty-state empty-signals">
  <svg class="empty-icon">
    <!-- 铃铛图标 -->
  </svg>
  <h3 class="empty-title">暂无信号</h3>
  <p class="empty-desc">
    当市场出现板块突破、趋势反转或异常波动时，系统会自动生成信号
  </p>
</div>
```

### 板块空状态

```html
<div class="empty-state empty-sectors">
  <svg class="empty-icon">
    <!-- 网格图标 -->
  </svg>
  <h3 class="empty-title">暂无板块数据</h3>
  <p class="empty-desc">
    数据更新中，请稍后刷新查看
  </p>
</div>
```

---

## 🎨 6. CSS 样式规范

### 加载更多按钮

```css
.load-more-container {
  display: flex;
  justify-content: center;
  padding: 24px 0;
}

.load-more-btn {
  display: inline-flex;
  align-items: center;
  gap: 12px;
  padding: 12px 32px;
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  color: var(--color-foreground);
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-semibold);
  cursor: pointer;
  transition: all var(--transition-base);
}

.load-more-btn:hover:not(:disabled) {
  background: var(--color-surface-elevated);
  border-color: var(--color-primary);
}

.load-more-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.btn-count {
  font-size: var(--font-size-sm);
  color: var(--color-muted);
  padding: 4px 10px;
  background: var(--color-background);
  border-radius: var(--radius-full);
}

.load-more-done {
  text-align: center;
  padding: 16px;
  color: var(--color-muted);
  font-size: var(--font-size-sm);
}
```

---

## 📋 实施清单

- [ ] 1. 添加 SVG 图标到代码
- [ ] 2. 更新 Tab 导航图标
- [ ] 3. 更新信号卡片图标（移除 emoji）
- [ ] 4. 实现加载更多按钮组件
- [ ] 5. 实现骨架屏组件
- [ ] 6. 添加排序功能
- [ ] 7. 优化空状态
- [ ] 8. 更新 CSS 样式
- [ ] 9. 更新 JavaScript 逻辑
- [ ] 10. 测试所有功能

---

**预计完成时间**: 约 1-2 小时

**开始实施？** 请确认后我开始编写代码。
