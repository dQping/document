#  vue-cli3.0搭建与配置

## 如何新建项目

### 使用 npm 全局安装 vue-cli 

npm install -g @vue/cli //如果已经安装过就不用安装了

### 创建项目执行

vue create my-project

### 选择项目类型

```
Vue CLI v3.0.0-beta.6
? Please pick a preset: (Use arrow keys)
  default (babel, eslint)
  Manually select features

// 注：按键盘上下键选择默认（default）还是手动（Manually），
//如果选择default，一路回车执行下去就行了（注：现在vue-cli3.0默认使用yarn下载），这里我选择手动，

```

### 选择特性支持

```
? Please pick a preset: Manually select features
? Check the features needed for your project: (Press <space> to select, <a> to toggle all, <i> to invert selection)
>( ) TypeScript                                 // 支持使用 TypeScript 书写源码
 ( ) Progressive Web App (PWA) Support          // PWA 支持
 ( ) Router                                     // 支持 vue-router
 ( ) Vuex                                       // 支持 vuex
 ( ) CSS Pre-processors                         // 支持 CSS 预处理器。
 ( ) Linter / Formatter                         // 支持代码风格检查和格式化。
 ( ) Unit Testing                               // 支持单元测试。
 ( ) E2E Testing                                // 支持 E2E 测试。

 // 注意：你要集成什么就选就行了（注：空格键是选中与取消，A键是全选）

```
**我这边选择vue-router, vuex, stylus, babel, pwa, eslint, unit-jest**


### 选择css预处理，这里我选择SCSS/SASS

```
? Please pick a preset: Manually select features
? Check the features needed for your project: Router, Vuex, CSS Pre-processors, Linter, Unit
? Pick a CSS pre-processor (PostCSS, Autoprefixer and CSS Modules are supported by default):
> SCSS/SASS
  LESS
  Stylus
```

### 选择ESLint + Prettier

```
? Please pick a preset: Manually select features
? Check the features needed for your project: Router, Vuex, CSS Pre-processors, Linter, Unit
? Pick a CSS pre-processor (PostCSS, Autoprefixer and CSS Modules are supported by default): Stylus
? Pick a linter / formatter config: (Use arrow keys)
> ESLint with error prevention only
  ESLint + Airbnb config
  ESLint + Standard config
  ESLint + Prettier
```

### 选择语法检查方式，这里我选择保存就检测

```
Vue CLI v3.0.0-beta.6
? Please pick a preset: Manually select features
? Check the features needed for your project: Router, Vuex, CSS Pre-processors, Linter, Unit
? Pick a CSS pre-processor (PostCSS, Autoprefixer and CSS Modules are supported by default): Stylus
? Pick a linter / formatter config: Prettier
? Pick additional lint features: (Press <space> to select, <a> to toggle all, <i> to invert selection)
>( ) Lint on save // 保存就检测
 ( ) Lint and fix on commit // fix和commit时候检查
```

### 选择单元测试

```
Vue CLI v3.0.0-beta.6
? Please pick a preset: Manually select features
? Check the features needed for your project: Router, Vuex, CSS Pre-processors, Linter, Unit
? Pick a CSS pre-processor (PostCSS, Autoprefixer and CSS Modules are supported by default): Stylus
? Pick a linter / formatter config: Prettier
? Pick additional lint features: Lint on save
? Pick a unit testing solution: (Use arrow keys)
> Mocha + Chai
  Jest
```

### 她会问你 ，把babel,postcss,eslint这些配置文件放哪，这里随便选，我选择放在独立文件夹

```
Vue CLI v3.0.0-beta.6
? Please pick a preset: Manually select features
? Check the features needed for your project: Router, Vuex, CSS Pre-processors, Linter, Unit
? Pick a CSS pre-processor (PostCSS, Autoprefixer and CSS Modules are supported by default): Stylus
? Pick a linter / formatter config: Prettier
? Pick additional lint features: Lint on save
? Pick a unit testing solution: Jest
? Where do you prefer placing config for Babel, PostCSS, ESLint, etc.? (Use arrow keys)
> In dedicated config files // 独立文件放置
  In package.json // 放package.json里
```

### 键入N不记录，如果键入Y需要输入保存名字，如第一步所看到的我保存的名字为xs-default

```
Vue CLI v3.0.0-beta.6
? Please pick a preset: Manually select features
? Check the features needed for your project: Router, Vuex, CSS Pre-processors, Linter, Unit
? Pick a CSS pre-processor (PostCSS, Autoprefixer and CSS Modules are supported by default): Stylus
? Pick a linter / formatter config: Prettier
? Pick additional lint features: Lint on save
? Pick a unit testing solution: Jest
? Where do you prefer placing config for Babel, PostCSS, ESLint, etc.? In dedicated config files
? Save this as a preset for future projects? (Y/n) // 是否记录一下以便下次继续使用这套配置
```

### 确定后，等待下载依赖模块

## 启动项目

- 初始完之后，进入到项目根目录： cd my-project

- 启动项目：npm run serve

- 在浏览器输入http://localhost:8080就可以看到vue的欢迎界面

## 打包上线

- vue-cli 也提供了打包的命令，在项目根目录下执行： npm run build

- 执行完之后，可以看到在项目根目录下多出了一个 dist 目录，该目录下就是打包好的所有静态资源，直接部署到静态资源服务器就好了。

## 项目的大致目录结构

```
├── node_modules     # 项目依赖包目录
├── public
│   ├── favicon.ico  # ico图标
│   └── index.html   # 首页模板
├── src 
│   ├── assets       # 样式图片目录
│   ├── components   # 组件目录
│   ├── views        # 页面目录
│   ├── App.vue      # 父组件
│   ├── main.js      # 入口文件
│   ├── router.js    # 路由配置文件
│   └── store.js     # vuex状态管理文件
├── .gitignore       # git忽略文件
├── .postcssrc.js    # postcss配置文件
├── babel.config.js  # babel配置文件
├── package.json     # 包管理文件
└── yarn.lock        # yarn依赖信息文件
```

根据你安装时选择的依赖不同，最后生成的目录结构也会有所差异

**注意：** 如果想要修改端口号以及webpack配置，需要你在根目录下面创建一个vue.config.js



当你准备着手一个新的项目的时候，请事先想清楚这个项目的架构以及用到的ui组件等等

