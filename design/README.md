# 设计系统目录

> Overnight Radar 项目的设计资源中心
> **当前版本**: v1.0.0 | **最后更新**: 2026-04-14

## 📁 目录结构

```
design/
├── README.md                   # 本文件 - 设计目录说明
├── VERSION.md                  # 版本管理和历史
├── CHANGELOG.md                # 变更日志
├── ICON-SYSTEM.md              # 图标系统规范
├── UI-STANDARDS.md             # 完整设计标准文档
├── UI-QUICK-REF.md             # 开发快速参考指南
├── UI-REDESIGN-SUMMARY.md      # UI 改造总结
├── design-system.html          # 设计系统原型（可在浏览器中打开）
└── icon-options.html           # 图标设计方案页面
```

## 🚀 快速开始

### 查看设计原型

直接在浏览器中打开 `design-system.html` 文件，查看所有组件的实时效果：

```bash
open design/design-system.html
```

或在浏览器中访问：
- 本地项目: `http://localhost:5174/OvernightRadar/design/design-system.html`

### 阅读设计文档

| 文档 | 用途 | 适合人群 |
|------|------|----------|
| **UI-QUICK-REF.md** | 快速查找代码片段和变量 | 开发者 |
| **UI-STANDARDS.md** | 完整的设计规范和标准 | 设计师/开发者 |
| **UI-REDESIGN-SUMMARY.md** | 了解 UI 改造的前后对比 | 项目经理/新成员 |

## 🎨 设计系统概览

### 色彩系统

- **主色**: 金色 `#F59E0B` (财富/信任)
- **强调色**: 紫色 `#8B5CF6` (科技/智能)
- **背景**: 深蓝黑 `#0F172A` (深色主题)
- **表面**: 深灰蓝 `#1E293B` / `#334155`

### 金融色彩（中国习惯）

- **上涨**: 红色 `#EF4444` 🔴
- **下跌**: 绿色 `#10B981` 🟢
- **平盘**: 灰色 `#64748B` ⚪

> **说明**: 本设计系统遵循中国用户的习惯，使用红色表示上涨，绿色表示下跌。

### 字体系统

- **字体**: IBM Plex Sans
- **字重**: 400 / 500 / 600 / 700
- **字号**: 11px ~ 32px (8级)

### 组件库

- 按钮 (Primary / Ghost)
- 标签 (金融数据标签)
- 热力图区块
- 加载状态 (旋转器 / 骨架屏)
- 模态框
- 切换器 (市场 / 指标)
- 底部导航
- **图标系统** (市场观察 / 隔夜雷达)

### 图标系统

- **市场观察**: 热力图方块（金色 #F59E0B）
- **隔夜雷达**: 信号雷达（紫色 #8B5CF6）

详见 [ICON-SYSTEM.md](./ICON-SYSTEM.md)

## 📐 设计原则

1. **数据优先**: 信息密度高，但保持可读性
2. **专业可信**: 金融级严谨，避免花哨设计
3. **快速响应**: 实时数据，流畅交互
4. **深色护眼**: 长时间使用不疲劳

## 🔄 设计流程

### 新功能开发

1. **查阅标准**: 参考 `UI-STANDARDS.md`
2. **使用组件**: 从 `UI-QUICK-REF.md` 复制代码
3. **查看原型**: 在 `design-system.html` 中查看效果
4. **实施开发**: 使用 CSS 变量，保持一致性

### 设计审查

使用 `UI-STANDARDS.md` 中的实施清单：
- [ ] 色彩对比度符合 WCAG AA (4.5:1)
- [ ] 图标使用 SVG 而非 emoji
- [ ] 动画时长在 150-300ms
- [ ] 移动端触摸目标 ≥ 44x44px
- [ ] 语义化 HTML 标签
- [ ] CSS 变量而非硬编码

## 📱 响应式断点

| 断点 | 宽度 | 设备类型 |
|------|------|----------|
| XS | < 480px | 小屏手机 |
| SM | 480px - 767px | 大屏手机 |
| MD | 768px - 1023px | 平板 |
| LG | 1024px - 1439px | 桌面 |
| XL | ≥ 1440px | 大屏桌面 |

## 🛠️ 设计工具

### 浏览器 DevTools

```bash
# Chrome: Cmd + Option + I
# Firefox: Cmd + Option + I
# Safari: Cmd + Option + I (需先在偏好设置中启用)
```

### 可访问性测试

- [Lighthouse](https://developers.google.com/web/tools/lighthouse)
- [Axe DevTools](https://www.deque.com/axe/devtools/)
- [WAVE](https://wave.webaim.org/)

### 色彩对比度检查

- [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/)
- [Colour Contrast Analyser](https://www.tpgi.com/color-contrast-checker/)

## 📚 外部资源

- [Lucide Icons](https://lucide.dev/) - 图标库
- [IBM Plex Sans](https://fonts.google.com/specimen/IBM+Plex+Sans) - 字体
- [WCAG 2.1](https://www.w3.org/WAI/WCAG21/quickref/) - 可访问性标准

## 📝 更新日志

| 日期 | 版本 | 更新内容 |
|------|------|----------|
| 2026-04-14 | v1.0.0 | 初始设计系统建立 |
| | | - 完整的色彩系统（红涨绿跌） |
| | | - IBM Plex Sans 字体系统 |
| | | - 完整的组件库 |
| | | - 响应式设计 |
| | | - 可访问性支持 |

详细版本信息请查看 [VERSION.md](./VERSION.md) 和 [CHANGELOG.md](./CHANGELOG.md)

---

**维护者**: Overnight Radar 开发团队
**最后更新**: 2026-04-14
