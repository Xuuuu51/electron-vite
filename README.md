# electron-vite

使用 `create electron` 初始化的 [electron-vite](https://electron-vite.org) 官方模板（React + TypeScript），并在此基础上修复了 **Electron v41** 的兼容性问题。

## 为什么需要这个项目？

[electron-vite 官方模板](https://electron-vite.org) 默认依赖 `electron` npm 包内置的预编译二进制文件。但从 **Electron v41** 开始，npm 包不再包含预编译二进制，改由 `@electron/rebuild` 按需下载。这导致模板开箱即用失败 —— `electron-vite dev` 和 `electron-builder` 在开发/构建时找不到 Electron 可执行文件。

本仓库在官方模板基础上，新增了 `scripts/ensure-electron.mjs`，在 `postinstall` 阶段自动检测并下载对应平台的 Electron 二进制文件到正确位置，确保 `electron-vite dev` 和 `electron-builder` 在 Electron v41 下正常工作。

## 技术栈

- **Electron** v41 — 跨平台桌面应用框架
- **React** 19 + **TypeScript** 5.9 — UI 层
- **Vite** 7 — 构建工具
- **electron-vite** 5 — Electron 集成 Vite 的工具链
- **electron-builder** 26 — 应用打包与分发

## 推荐 IDE

- [VSCode](https://code.visualstudio.com/) + [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) + [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)

## 项目结构

```
├── src/
│   ├── main/          # Electron 主进程
│   ├── preload/       # 预加载脚本
│   └── renderer/      # React 渲染进程
├── scripts/
│   └── ensure-electron.mjs  # Electron v41 二进制兼容修复
├── electron.vite.config.ts  # electron-vite 配置
├── electron-builder.yml     # 打包配置
└── package.json
```

## 快速开始

### 安装

```bash
$ pnpm install
```

安装时会自动执行 `ensure-electron.mjs` 下载 Electron 二进制文件。

### 开发

```bash
$ pnpm dev
```

### 构建

```bash
# macOS
$ pnpm build:mac

# Windows
$ pnpm build:win

# Linux
$ pnpm build:linux
```

## 关键修复说明

| 问题 | Electron v41 的 npm 包不再包含预编译二进制 |
|------|------------------------------------------|
| 影响 | `electron-vite dev` 报错找不到 Electron 可执行文件 |
| 方案 | `ensure-electron.mjs` 从 GitHub Releases 下载正确版本的二进制文件并放置到 `electron/dist/` 目录 |
| 触发时机 | `postinstall` 自动执行，也可手动运行 |

## 许可证

MIT
