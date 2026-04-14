# 项目目录结构

```
US-CN-Sector-Mapper/
├── 📄 README.md                          # 项目说明文档
│
├── 🎨 design/                            # 设计系统目录
│   ├── README.md                         # 设计目录说明
│   ├── UI-STANDARDS.md                   # 完整设计标准文档
│   ├── UI-QUICK-REF.md                   # 开发快速参考指南
│   ├── UI-REDESIGN-SUMMARY.md            # UI 改造总结
│   └── design-system.html                # 设计系统原型（可在浏览器中打开）
│
├── 💻 web/                               # Web 应用
│   ├── index.html                        # HTML 入口
│   ├── package.json                      # 项目配置
│   ├── vite.config.js                    # Vite 配置
│   ├── src/                              # 源代码
│   │   ├── main.js                       # 入口文件
│   │   ├── style.css                     # 全局样式（已重构）
│   │   ├── data.js                       # 数据处理
│   │   ├── components/                   # 组件
│   │   │   ├── heatmap-block.js          # 热力图区块
│   │   │   ├── indicators.js             # 指标切换
│   │   │   ├── nav.js                    # 导航组件
│   │   │   ├── radar-card.js             # 雷达卡片
│   │   │   ├── sector-detail.js          # 板块详情
│   │   │   ├── signal-card.js            # 信号卡片
│   │   │   ├── sparkline.js              # 迷你图
│   │   │   └── stats-panel.js            # 统计面板
│   │   └── views/                        # 页面视图
│   │       ├── heatmap.js                # 热力图页面
│   │       ├── radar.js                  # 雷达页面
│   │       ├── signals.js                # 信号页面
│   │       └── news.js                   # 新闻页面
│   ├── data/                             # 静态数据
│   └── dist/                             # 构建输出
│
├── 📈 data/                              # 数据目录
│   ├── watchlist/                        # 美股观察列表数据
│   ├── cn_watchlist/                     # A股观察列表数据
│   ├── signals/                          # 信号数据
│   ├── news/                             # 新闻数据
│   ├── stats/                            # 统计数据
│   ├── results/                          # 数据输出
│   └── history.json                      # 历史数据
│
├── 🐍 scripts/                           # Python 脚本
│   ├── fetch_watchlist.py                # 获取美股数据
│   ├── fetch_cn_watchlist.py             # 获取A股数据
│   ├── fetch_news.py                     # 获取新闻
│   ├── generate_signals.py               # 生成信号
│   ├── run_daily.py                      # 执行日常任务
│   └── ...                               # 其他脚本
│
├── 🧪 tests/                             # 测试
│   ├── test_watchlist_calc.py            # 观察列表计算测试
│   ├── test_fetch_cn_watchlist.py        # A股数据获取测试
│   ├── test_calc.py                      # 计算测试
│   └── ...                               # 其他测试
│
├── 📚 docs/                              # 文档
│   ├── prd/                              # 产品需求文档
│   ├── specs/                            # 技术规格
│   ├── reports/                          # 报告
│   ├── research/                         # 研究
│   └── superpowers/                      # Superpowers 相关
│
├── ⚙️ requirements.txt                    # Python 依赖
└── 🤖 .claude/                           # Claude Code 配置
    └── settings.local.json               # 本地设置
```

## 🎨 设计系统 (design/)

所有设计相关文件都在 `design/` 目录中：

| 文件 | 说明 |
|------|------|
| `README.md` | 设计目录说明文档 |
| `UI-STANDARDS.md` | 完整设计标准（色彩、字体、组件等） |
| `UI-QUICK-REF.md` | 开发快速参考（代码片段、常见问题） |
| `UI-REDESIGN-SUMMARY.md` | UI 改造前后对比 |
| `design-system.html` | 设计系统原型（浏览器中打开查看） |

### 查看设计原型

```bash
# 方式 1: 直接打开
open design/design-system.html

# 方式 2: 通过开发服务器
# 访问 http://localhost:5174/OvernightRadar/design/design-system.html
```

## 💻 Web 应用 (web/)

前端应用使用原生 JavaScript + Vite 构建：

| 目录/文件 | 说明 |
|----------|------|
| `src/style.css` | 全局样式（已按新设计系统重构） |
| `src/main.js` | 应用入口 |
| `src/components/` | 可复用组件 |
| `src/views/` | 页面视图 |

### 开发命令

```bash
cd web
npm install        # 安装依赖
npm run dev        # 启动开发服务器 (http://localhost:5174)
npm run build      # 构建生产版本
npm run preview    # 预览构建结果
```

## 📈 数据 (data/)

所有市场数据存储在 `data/` 目录：

| 子目录 | 内容 |
|--------|------|
| `watchlist/` | 美股 ETF 数据 |
| `cn_watchlist/` | A股板块数据 |
| `signals/` | 市场信号 |
| `news/` | 新闻数据 |
| `results/` | 数据输出 |

## 🐍 脚本 (scripts/)

Python 数据获取和处理脚本：

| 脚本 | 功能 |
|------|------|
| `fetch_watchlist.py` | 获取美股数据 |
| `fetch_cn_watchlist.py` | 获取A股数据 |
| `fetch_news.py` | 获取新闻 |
| `generate_signals.py` | 生成市场信号 |
| `run_daily.py` | 执行日常任务 |

---

**最后更新**: 2026-04-14
