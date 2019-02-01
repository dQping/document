# 解构赋值

解构赋值主要分为对象的解构和数组的解构，在没有解构赋值的时候，我们赋值是这样的

```
let arr = [0,1,2]
let a = arr[0]
let b = arr[1]
let c = arr[2]
```

这样写很繁琐，那么我们有没办法既声明，又赋值，更优雅的写法呢？肯定是有的，那就是解构赋值，解构赋值，简单理解就是等号的左边和右边相等。

## 数组的解构赋值

```
let arr = [0,1,2]
let [a,b,c] = arr
console.log(a) // 0
console.log(b) // 1
console.log(c) // 2

```

但是很多时候，数据并非一一对应的，并且我们希望得到一个默认值

```
let arr = [,1,2]
let [a='我是默认值',b,c] = arr
console.log(a) // '我是默认值'
console.log(b) // 1
console.log(c) // 2
// 从这个例子可以看出，在解构赋值的过程中，a=undefined时，会使用默认值
// 那么当a=null时呢？当a=null时，那么a就不会使用默认值，而是使用null

```

数组的拼接
```
let a = [0,1,2]
let b = [3,4,5]
let c = a.concat(b)
console.log(c) // [0,1,2,3,4,5]

let d = [...a,...b]
console.log(d) // [0,1,2,3,4,5]
```

数组的克隆
```
// 假如我们简单地把一个数组赋值给另外一个变量
let a = [0,1,2,3]
let b = a
b.push(4)
console.log(a) // [0,1,2,3,4]
console.log(b) // [0,1,2,3,4]
// 因为这只是简单的把引用地址赋值给b，而不是重新开辟一个内存地址，所以
// a和b共享了同一个内存地址，该内存地址的更改，会影响到所有引用该地址的变量
// 那么用下面的方法，把数组进行克隆一份，互不影响

let a = [0,1,2,3]
let b = [...a]
b.push(4)
console.log(a) // [0,1,2,3]
console.log(b) // [0,1,2,3,4]

```

## 对象的解构赋值
对象的解构赋值和数组的解构赋值其实类似，但是数组的数组成员是有序的

而对象的属性则是无序的，所以对象的解构赋值简单理解是等号的左边和右边的结构相同
```
let {name,age} = {name:"ddd",age:28}
console.log(name) // 'ddd'
console.log(age) // 28

```

对象的解构赋值是根据key值进行匹配
```
// 这里可以看出，左侧的name和右侧的name，是互相匹配的key值
// 而左侧的name匹配完成后，再赋值给真正需要赋值的Name
let { name,age } = { name:'ddd',sex:0,age:28 }
console.log(Name) // 'ddd'
console.log(age) // 28
```

那么当变量已经被声明了呢？
```
let name,age
// 需要用圆括号，包裹起来
({name,age} = {name:"ddd",age:28})
console.log(name) // 'ddd'
console.log(age) // 28
```

变量能否也设置默认值？
```
let {name="ddd",age} = {age:28}
console.log(name) // 'ddd'
console.log(age) // 28
// 这里规则和数组的解构赋值一样，当name = undefined时，则会使用默认值
```

```
let [a] = [{name:"ddd",age:28}]
console.log(a) // {name:"ddd",age:28}

let { length } = "hello ddd"
console.log(length) // 9
```

```
function ajax({method,url,type='params'}){
    console.log(method) // 'get'
    console.log(url) // '/'
    console.log(type) // 'params'
}

ajax({method:"get",url:"/"})
```

如果想详细了解的话可以看看阮一峰老师的es6：es6.ruanyifeng.com/

————2018.12.18
