// 2.let
// 2.1 不存在变量作用域提升，这样可以避免了我们还没声明变量就拿变量来用
// 2.2 同一作用域的同一个变量不能够重复声明，避免我们重复声明变量
// 2.3 let声明的变量不会到全局上
// 2.4 let和代码块{}结合使用会形成块级作用域

// 2.1
// console.log(a) // 报错，a未声明
// let a = 'hello swr'

// 2.2
// let a = 'hello swr'
// let a = 'hello swr' // 报错，变量被重复声明

// 2.3
// let a = 'hello swr'
// console.log(window.a) // undefined

// 2.4
// 在代码块以外调用str2，会报错
{
    let str2 = 'hello swr'
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
