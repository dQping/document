# 闭包、高阶函数
个人理解，闭包实际上是一种函数，所以闭包技术也是函数技术的一种；闭包能做的事情函数几乎都能做，闭包有最大的两个用处，**一个是可以读取函数内部的变量，另一个就是让这些变量的值始终保持在内存中**。

## 1、封闭作用域
在javascript中，如果一个对象不被引用了，那么这个对象会被GC回收，否则则一直保留在内存中，那么利用这个特点，配合闭包使用，有以下几个优点：封闭作用域、保存作用域、作用域链。

封闭作用域不污染全局变量，团队协作时，比如A，封装了某js插件，如果不使用闭包，则该插件内的变量会污染整个项目，甚至和其他成员的变量有冲突。

```
(function(){
    var str = 'hello swr'
    console.log(str) // 'hello swr'
})()

console.log(str) // 报错,外部无法获取闭包内的变量，封闭了作用域
```

写代码的时候，有时会碰到一些问题，
比如有5个button标签
```
var btns = document.getElementsByTagName('button');
for(var i=0; i< btns.length; i++){   
   var btn = btns[i];        
   btn.onclick = function () {            
     alert('点击了第' + i + '个按钮');       
   }
}

无论我们点击哪个button，都是弹出'点击了第5个按钮'，
因为btn.onclick事件是异步触发的，当事件被触发时，
for循环早已经结束，此时变量i的值已经是5，
所有onclick事件函数从内到外查找变量i时，查找到的值总是5。

```
可以通过封闭作用域把每次循环的i值都封闭起来,
当时间函数顺着作用域链从内到外查找变量i时,
会先找到被封闭在闭包环境中的i,
如果有5个按钮, 则i的值就是0,1,2,3,4

```
var btns = document.getElementsByTagName('button');
for(var i=0; i< btns.length; i++){   
    (function (i) {        
       var btn = btns[i];        
       btn.onclick = function () {            
         alert('点击了第' + i + '个按钮');       
       }    
     })(i);
}
```
注：当然，这个问题现在也可以通过ES6的**let**解决

## 2、作用域链
js执行时，会从内到外查找引用的值，在es6之前，只有函数是有作用域的说法，在es6出现了，则有了块级作用域的说法，比如
```
function person(){
    var name = '丸子'
    console.log(name) // '丸子'
})

console.log(name) // 报错，在函数外部，是访问不了内部的name，这就是作用域，
```

在es6出了一个新的概念，就是块级作用域，效果和闭包一样
```
{
    let name = '丸子'
    console.log(name) // '丸子'
}

console.log(name) // 报错
```
## 3、保存作用域
函数嵌套函数，那么内部的那个函数将形成作用域闭包。简单的说，这种闭包能够达到的好处就是让指令能够绑定一些全局数据去运行，优点是全局数据隐藏化、 将数据绑定在指令上运行，让指令不再依赖全局数据。

```
function plus(num){
    ++num
    return function(){
        console.log(num)
    }
}

let toPlus = plus(5)
//此时toPlus实际上为
function(){
    console.log(num)
}
//而这个num实际上就是plus函数内作用域的num
//此时我们无法从外部修改num
//而且把plus函数内的数据隐藏化，将数据绑定在toPlus上运行。
```
**实际开发中遇到的问题**

比如说，我们实际开发中会遇到一个问题，就是某个函数，要等多个异步执行完毕后才执行，这种情况怎么做呢？**（在es6之后，可以用Promise和async/await解决，这里暂不讨论 ）**

nodejs中的示例：
```
let fs = require('fs')
let arr = []

fs.readFile('./a.txt','utf8',function(err,data){
    arr.push(data) // 假设data为'hello'
})

fs.readFile('./b.txt','utf8',function(err,data){
    arr.push(data) // 假设data为'swr'
})

console.log(arr) // 我们希望打印出来是['hello','swr']或['swr','hello']，但是打印出来的却是[]
这是为什么呢？
是因为javascript执行原理，是先执行同步，再执行异步的，而fs.readFile方法属于异步方法，所以还没执行完毕，就已经执行了console.log(arr)了
```
别是这种异步请求的数据，获取到的时间先后顺序不同，那我们该如何实现“同步”获取呢？

```
let fs = require('fs')

function after(times,callback){
    let arr = []
    return function(data){
        arr.push(data)
        if(--times === 0){
            callback(arr)
        }
    }
}

let fn = after(2,function(arr){
    console.log(arr) // 当fn执行两次后，则会执行该回调函数
})

fs.readFile('./a.txt','utf8',function(err,data){
    fn(data) // 假设data为'hello'
})

fs.readFile('./b.txt','uft8',function(err,data)=>{
    fn(data) // 假设data为'swr'
})

最终当2个fs.readFile读取完毕后，执行了fn()达到2次时，则会打印出['hello','swr']或者['swr','hello']
复制代码
```

虽然以上的方式，实现了我们需要的需求，但是问题来了，难道我们每一次都要特意写一个after函数吗？其实还有一个概念，叫做发布订阅，订阅就类似你收藏了这个电台，而发布，则是这个电台向所有收藏了本电台的粉丝进行广播，看下面代码
```
let fs = require('fs')

let event = {
    arr:[], // 存需要执行的函数
    result:[], // 存结果
    on(fn){ // 订阅
        this.arr.push(fn)
    },
    emit(data){ // 发布
        this.result.push(data)
        this.arr.forEach(fn=>fn(this.result))
    }
}

event.on(function(data){
    if(data.length === 2){
        console.log(data) // ['hello','swr'] 或者 ['swr','hello']
    }
})

fs.readFile('./a.txt','utf8',(err,data)=>{
    event.emit(data) // data为'hello'
})

fs.readFile('./b.txt','utf8',(err,data)=>{
    event.emit(data) // data为'swr'
})

当两个fs.readFile读取完成，并且在其回调函数内执行了event.emit，最终会打印出['hello','swr'] 或者 ['swr','hello']
```


————2018.12.15