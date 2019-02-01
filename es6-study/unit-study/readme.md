# ES6 基础学习

整理的这些文档主是对es6的基础学习，是一些工作当中常用的es6技巧，以及扩展如实现数据双向绑定，class用es5如何实现、如何给伪数组添加迭代器等等。

其中，一些语法在低版本浏览器中不支持，可以通过[BABEL](https://www.babeljs.cn/repl/)编译再运行，也可以引入**babel-polyfill**添加到了全局范围(它需要在你的源代码之前运行)

### babel-polyfill的使用

**1.npm install --save babel-polyfill**

因为这是一个 polyfill （它需要在你的源代码之前运行），我们需要让它成为一个 dependency, 而不是一个 devDependency.

**2.在你的应用入口顶部通过 require 将 polyfill 引入进来。**

+ node中：**require("babel-polyfill")**;
+ browserify中，在入口顶部通过 import 将 polyfill 引入：**import "babel-polyfill"**;
+ 在浏览器中：可以在 **babel-polyfill** npm 发布版中的 **dist/polyfill.js** 文件中找到它。 它需要在你编译过的 Babel 代码之前被包括进去。你可以将它追加到你编译过的代码中，或者在这些代码之前通过 **\<script\>** 引入它

+ 如果你是用使用webpack构建，加入到webpack配置文件(webpack.config.js) ***entry*** 项中
```
module.exports = {
  entry: ["babel-polyfill", "./app/js"]
};
```

**在上层文件夹中（../test-code），我已经写好了 es6 的项目使用环境配置文件,可以进入按说明添加自己的代码练习。**


**如果想详细了解的话可以看看阮一峰老师的es6：es6.ruanyifeng.com/**