# require.ensure() 方法来实现代码打包分离

## require.ensure() 是 webpack 特有的

require.ensure(
  dependencies: String[],
  callback: function(require),
  errorCallback: function(error),
  chunkName: String
)

按照上面指定的顺序，webpack 支持以下参数：

- **dependencies**：字符串构成的数组，声明 callback 回调函数中所需的所有模块。
- **callback**：只要加载好全部依赖，webpack 就会执行此函数。require 函数的实现，作为参数传入此函数。当程序运行需要依赖时，可以使用 require() 来加载依赖。函数体可以使用此参数，来进一步执行 require() 模块。
- **errorCallback**：当 webpack 加载依赖失败时，会执行此函数。
- **chunkName**：由 require.ensure() 创建出的 chunk 的名字。通过将同一个 chunkName 传递给不同的 require.ensure() 调用，我们可以将它们的代码合并到一个单独的 chunk 中，从而只产生一个浏览器必须加载的 bundle。


给定 dependencies 参数，将其对应的文件拆分到一个单独的 bundle 中，**此 bundle 会被异步加**载。 

当使用 **CommonJS** 模块语法时，这是动态加载依赖的唯一方法。意味着，可以在模块执行时才运行代码，只有在满足某些条件时才加载依赖项。 

这个特性**依赖于内置的 Promise**。如果想在低版本浏览器使用 require.ensure， 记得使用像 es6-promise 或者 **promise-polyfill** 这样 **polyfill** 库， 来预先填充(shim) Promise 环境。


虽然我们将 require 的实现，作为参数传递给回调函数，然而如果使用随意的名字，例如 require.ensure([], function(request) { request('someModule'); }) 
则无法被 webpack 静态解析器处理，所以还是请使用 require，例如 require.ensure([], function(require) { require('someModule'); })。

## 在vue中使用import()来代替require.ensure()实现代码打包分离

有时候我们想把某个路由下的所有组件都打包在同个异步块 (chunk) 中。 

只需要使用 命名 chunk，一个特殊的注释语法来提供 chunk name (需要 Webpack > 2.4)。

- const Foo = () => import(/* webpackChunkName: "group-foo" */ './Foo.vue')

- const Bar = () => import(/* webpackChunkName: "group-foo" */ './Bar.vue')

- const Baz = () => import(/* webpackChunkName: "group-foo" */ './Baz.vue')

Webpack 会将任何一个异步模块与相同的块名称组合到相同的异步块中。

**例：require.ensure()实现 **
```
const notFound = r => require.ensure([], () => r(require('@views/common/404')), 'index')
const login = r => require.ensure([], () => r(require('@views/common/login')), 'index')
const register = r => require.ensure([], () => r(require('@views/common/register')), 'index')
const main = r => require.ensure([], () => r(require('@views/main')), 'index')
const myWorks = r => require.ensure([], () => r(require('@views/my/index')), 'my')
const myAccountSetting = r => require.ensure([], () => r(require('@views/my/account-setting')), 'my')
const makeIndex = r => require.ensure([], () => r(require('@views/make/index')), 'make')
```

**例：import()实现**
```
const notFound = () => import(/* webpackChunkName: "index" */ '@views/common/404')
const login = () => import(/* webpackChunkName: "index" */ '@views/common/login')
const register = () => import(/* webpackChunkName: "index" */ '@views/common/register')
const main = () => import(/* webpackChunkName: "index" */ '@views/main')
const myWorks = () => import(/* webpackChunkName: "my" */ '@views/my/index')
const myAccountSetting = () => import(/* webpackChunkName: "my" */ '@views/my/account-setting')
const makeIndex = () => import(/* webpackChunkName: "make" */ '@views/make/index')
```