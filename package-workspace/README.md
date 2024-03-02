# npm `workspace` case

配置在 package.json 中的 `workspaces` 字段，在根目录执行 `npm i` 的时候会 `workspace` 里的依赖软链接到根目录的`node_modules`里。

## 在根目录操作示例

npm 大部分命令都能指定到某个或多个工作区，使用`-w`参数

- 添加新的工作区:
```bash
npm init -w packages/a -w app/main
```
- 添加依赖到工作区
```bash
npm install koa -w a
```
- 删除工作区依赖
```bash
npm uninstall koa -w a
```
- 执行工作区命名
```bash
npm run test -w a -w main
```