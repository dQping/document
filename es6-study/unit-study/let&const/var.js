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
// 我的理解是在es6之前，是没有块级作用域的概念，
// 变量只有遇到函数的时候才会变为局部变量
{
    var str  = 'hello swr'
}

console.log(str1) // 打印输出 hello swr
