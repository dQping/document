# loader

loader 用于对模块的源代码进行转换。loader 可以使你在 import 或"加载"模块时预处理文件。因此，loader 类似于其他构建工具中“任务(task)”，并提供了处理前端构建步骤的强大方法。loader 可以将文件从不同的语言（如 TypeScript）转换为 JavaScript，或将内联图像转换为 data URL。loader 甚至允许你直接在 JavaScript 模块中 import CSS文件！

示例：
```
npm install --save-dev css-loader
npm install --save-dev ts-loader


module.exports = {
  module: {
    rules: [
      { test: /\.css$/, use: 'css-loader' },
      { test: /\.ts$/, use: 'ts-loader' }
    ]
  }
};
```

## loader 特性
- loader 支持**链式传递**。能够对资源使用流水线(pipeline)。一组链式的 loader 将**按照相反的顺序**执行。loader 链中的第一个 loader 返回值给下一个 loader。在最后一个 loader，返回 webpack 所预期的 JavaScript。

- loader 可以是同步的，也可以是异步的。
- loader 运行在 Node.js 中，并且能够执行任何可能的操作。

- loader 接收查询参数。用于对 loader 传递配置。

- loader 也能够使用options 对象进行配置。

- 除了使用 package.json 常见的 main 属性，还可以将普通的 npm 模块导出为 loader，做法是在 package.json 里定义一个 loader 字段。

- 插件(plugin)可以为 loader 带来更多特性。
loader 能够产生额外的任意文件。
