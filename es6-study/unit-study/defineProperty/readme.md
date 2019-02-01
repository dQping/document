# Object.defineProperty

Object.defineProperty这个并不是es6的语法，这个是给一个对象，添加属性，但是目前框架很多是用这个方法，来实现数据劫持，也就是数据双向绑定
```
// 平时我们这样给一个对象添加属性
let obj = {str:"hello world"}
obj.str = 'hello pp'
console.log(obj.str) // 'hello pp'
```
那么当我们想在给一个对象，读取值或写入值时，进行别的操作，该怎么做呢？
```
// 使用Object.defineProperty()
// 接收的第一个参数为对象，第二个参数为属性名，第三个参数为配置对象
let obj = {}
Object.defineProperty(obj,'name',{
    enumerable:true,// 是否可枚举，默认值 false
                    // 如果为false的话，打印这个obj对象，是看不到name这个属性
    writable:true,  // 是否可写，默认值 false
                    // 如果为false的话，给name赋值，不会生效
    configurable:true, // 是否可配置（是否可删除），默认值 false
                       // 如果为true，delete obj.name，再打印obj，则显示{}
                       // 如果为false，delete obj.name，再打印obj,则显示{name:undefined}
   value:'ppp', // name对应的值
})

// 上面的写法其实和下面的写法是一样的
let obj = {}
obj.name = 'ppp'

```

那么既然一样，我们有必要写这么大串的代码吗？

其实核心是get和set，往下看
```
// 需要注意的是，当使用get set时，则不能使用value和writable
let obj = {}
let str
Object.defineProperty(obj,'name',{
    enumerable:true,
    configurable:true, 
    get(){ // 读，当我们读取时，则会执行到get，比如obj.name
        // return 'swr' // 当我们obj.name进行读取时，会返回'swr'
        return str
    },
    set(newValue){ // 写，当我们写入时，则会执行到set，比如obj.name = 'ppp'
                   // 并且会把newValue作为参数传进去
        str = newValue
    }
})

obj.name = 'ppp' // 写入
console.log(obj.name) // 'ppp'  // 读取

```

这样一来，我们可以在get set函数中，写出对应的业务逻辑，

包括很多框架底层，例如
```
// 一般不再选择这样的写法
Fn.prototype.xxx = xxx

// 更多的是选择这样的写法
// 这样的好处就是当读取值的时候，可以做一系列我们想做的事情
Object.defineProperty(Fn.prototype,'xxx',{...})

```

## 那么我们实现数据双向绑定呢？
这个问题在面试当中，会经常问这个问题，但是面试官更希望听到的是具体底层的实现方式，那么接下来我们也实现一下吧~ （ 简陋版的……(#^.^#) :
[点击查看代码](bind.html)

这样我们就实现了一个简陋版的数据双向绑定了，但是这也是有缺点的，这个只是针对对象进行了数据双向绑定,而尤大大的Vuejs就是基于Object.defineProperty实现的。

除了Object.defineProperty可以实现数据双向绑定之外，还有其他方式吗？

肯定是有其他方式可以实现的，利用es6的proxy代理也可以实现数据双向绑定，但是目前的框架还是比较少使用这种方式。

———— 2018.12.19