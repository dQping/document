# let 和 const 命令

ES6 新增了 **let** 和 **const** 命令，用来声明变量。它的用法类似于var，但是所声明的变量，只在let和const命令所在的代码块内有效。


 ## var
我的理解是在es6之前，是没有块级作用域的概念，只有函数作用域。

**var存在变量作用域的提升:** 实际上就是var声明的变量，拿到当前作用域的最顶层，而此时尚未赋值,而非当运行到这段代码时才声明，优先声明，当运行到那行的时候，实际上是赋值.

**注：** 同样的，function xx(){}也存在作用域提升
 ```
 // 1.var存在变量作用域的提升
console.log(a) // 打印输出 undefined
var a = 1

// 怎么理解作用域的提升呢？
// var str = 'hello swr'
// function test(){
//     console.log(str) // 打印输出 undefined
//     var str = 'goodbye swr'
// }
// test()

// 上面这段代码实际上是
var str = 'hello swr'
function test(){
    var str
    console.log(str) // 打印输出undefined
                     // 实际上就是var声明的变量，拿到
                     // 当前作用域的最顶层，而此时尚未赋值
                     // 只是声明，所以打印出undefined，而非当运行
                     // 到这段代码时才声明，优先声明，
                     // 当运行到那行的时候，实际上是赋值
                     // 同样的，function xx(){}也存在作用域提升
    str = 'goodbye swr'
}
test()

// var 不存在块级作用域的概念
// 在es6之前，是没有块级作用域的概念，
// 变量只有遇到函数的时候才会变为局部变量
{
    var str 1 = 'hello swr'
}

console.log(str1) // 打印输出 hello swr

 ```
 ## let

 + 不存在变量作用域提升，这样可以避免了我们还没声明变量就拿变量来用
 + 同一作用域的同一个变量不能够重复声明，避免我们重复声明变量
 + var命令和function命令声明的全局变量，依旧是顶层对象的属性；另一方面规定，let命令、const命令、class命令声明的全局变量，不属于顶层对象的属性。也就是说，从 ES6 开始，全局变量将逐步与顶层对象的属性脱钩
 + let和代码块{}结合使用会形成块级作用域

```
// console.log(a) // 报错，a未声明
// let a = 'hello swr'

// let a = 'hello swr'
// let a = 'hello swr' // 报错，变量被重复声明

// let a = 'hello swr'
// console.log(window.a) // undefined,let声明的变量不会到全局上


{
    let str2 = 'hello swr' //在代码块以外调用str2，会报错
}
console.log(str2) // 报错，未找到变量

// 上面这种写法，也有点类型es6之前的立即执行函数
(function(){
    var str2 = 'hello swr'
})()



// 一个例子
// 使用var，会发现最终console.log中打印的i都是3
// 因为for循环不是函数，而此时var i是处于全局当中
// for循环是同步代码，所以会执行完同步代码后
// 再执行setTimeout的异步代码，此时i已为3，所以打印出来都是3
for(var i = 0;i < 3;i++){
    setTimeout(function(){
        console.log(i)
    },1000)
}

// 那么我们用let试下
// let和代码块结合起来使用会形成块级作用域
// 那么当for时，这3个setTimeout会分别在3个不同的块级作用域
// 当执行setTimeout的console.log(i)时，会先寻找最近的块级作用域中的i
// 所以会依次打印出0 1 2
for(let j = 0;j < 3;j++){
    setTimeout(function(){
        console.log(i)
    },1000)
}

```

## const

const和let基本上可以说是完全一致的，但是const声明的对象不能更改其指向的引用地址（即堆区）

```
// 当用普通值赋值给const声明的变量后，再重新赋值时
// 值引用会被更改，所以会报错
const STR1 = 'hello swr'
STR1 = 'goodbye swr' // 报错,Assignment to constant variable

// 当我们修改这个引用地址里面的内容时，则不会报错
// 因为这个变量是指向这个引用地址的
const OBJ = {name:"swr"}
OBJ.name = 'hello swr'
console.log(OBJ) // {name:"hello swr"}
// 但是当我们把这个变量重新赋值一个引用地址时，则会报错
OBJ = {} // 报错

```

————2018.12.18