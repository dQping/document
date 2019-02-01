# test-project

testEnv文件夹中没有任何业务代码，只做了运行es6项目所需要的简单配置(基于gulp任务的自动化构建)，便于初学者学习。


## 快速使用步骤

### 系统环境安装

#### 1.安装nodejs 和 npm

下载地址：http://nodejs.cn/download/
下载对应安装包安装，

安装完成后打开命令行窗口查看版本确认安装成功
输入:

node -v
npm -v

#### 2.下载testEnv文件包
#### 3.输入 cd testEnv
#### 4.输入 npm install

接下开可以运行项目试试，

#### 5.输入 gulp --watch 启动项目
#### 6.访问 http://localhost:3000/ 可以看到页面

#### 7.在 testEnv/app/class/ 目录下新建自己的js文件，编写自己的代码
#### 8.在 testEnv/app/index.js 文件中 import 自己写的文件
#### 9.在浏览器页面中查看自己代码的效果
#### 10.重复7-9步骤
#### 命令行窗口 Ctrl+C 退出项目运行


## 目录说明
```
    
    |-- app
        |-- css
        |-- js
            |-- class               // class 此文件夹下放自己编写的js文件
                |-- lesson1.js
                |-- lesson2.js
                |-- ....
            |-- index.js
        |-- views                  // 存放html文件，文件后缀名.ejs ，因为项目使用的是express ejs模版引擎
            |-- error.ejs
            |-- index.ejs          // 入口html文件
    |-- server                     // server 文件夹放服务器代码，使用的是express脚手架
    |-- tasks                      // tasks文件夹放gulp任务文件
        |-- util
            |-- args.js
        |-- browser.js
        |-- build.js
        |-- clean.js
        |-- css.js
        |-- default.js
        |-- pages.js
        |-- scripts.js
        |-- server.js
    |-- .babelrc
    |-- gulpfile.babel.js
    |-- package-lock.js
    |-- package.json
    |-- README.md
            
```

## 配置文件说明

+ **gulpfile.babel.js** ：gulp运行时读取此文件，执行对应任务
+ **\.babelrc** ：babel进行编译的时候会自动读取\.babelrc文件内容