# Array

Array的常用方法有**from reduce map forEach findIndex find every some filter includes**等等

## Array.from

Array.from方法用于将两类对象转为真正的数组：类似数组的对象（array-like object）和可遍历（iterable）的对象（包括 ES6 新增的数据结构 Set 和 Map）。

```
let arrayLike = {
    '0': 'a',
    '1': 'b',
    '2': 'c',
    length: 3
};

// ES5的写法
var arr1 = [].slice.call(arrayLike); // ['a', 'b', 'c']

// ES6的写法
let arr2 = Array.from(arrayLike); // ['a', 'b', 'c']

// 使用扩展运算符会报错
let arr2 = [...arrayLike] // 报错 arrayLike is not iterable
```
arrayLike is not iterable意思是，arrayLike这个伪数组没有迭代器

那么可以看出，Array.from和...扩展运算符的区别了，

扩展运算符背后调用的是**遍历器接口（Symbol.iterator）**，如果一个对象没有部署这个接口，就无法转换.

Array.from方法还支持类似数组的对象。所谓类似数组的对象，本质特征只有一点，即必须有**length属性**。因此，任何有length属性的对象，都可以通过Array.from方法转为数组，

```
Array.from({ length: 3 });
// [ undefined, undefined, undefined ]
```

而...扩展运算符只能把拥有迭代器的伪数组转为数组，如arguments、map、set，



那么我们如果想用...扩展运算符转为数组，该怎么办呢？
```
// 既然扩展运算符只能把有迭代器的伪数组转为数组，
// 那么我们就给伪数组添加一个迭代器
// 迭代器iterator需要一个generator生成器生成
// 我们给这个伪数组新增一个[Symbol.iterator]的迭代器
let arrayLike = { 0:1,1:2,2:3,length:3,[Symbol.iterator]:function *() {
  for(let i = 0;i < this.length;i++){
    yield this[i]
  }
} }

console.log([...arrayLike]) // [1,2,3]
```

实际应用中，常见的类似数组的对象是 DOM 操作返回的 NodeList 集合，以及函数内部的arguments对象。Array.from都可以将它们转为真正的数组。
```
// NodeList对象
let ps = document.querySelectorAll('p');
Array.from(ps).filter(p => {
  return p.textContent.length > 100;
});

// arguments对象
function foo() {
  var args = Array.from(arguments);
  // ...
}
```

Array.from还可以接受第二个参数，作用类似于数组的map方法，用来对每个元素进行处理，将处理后的值放入返回的数组。

```
Array.from(arrayLike, x => x * x);
// 等同于
Array.from(arrayLike).map(x => x * x);

Array.from([1, 2, 3], (x) => x * x)
// [1, 4, 9


let spans = document.querySelectorAll('span.name');

// map()
let names1 = Array.prototype.map.call(spans, s => s.textContent);

// Array.from()
let names2 = Array.from(spans, s => s.textContent)
```

如果**map**函数里面用到了**this关键字**，还可以传入Array.from的**第三个参数**，用来**绑定this**。

## reduce

```
let arr = [1,2,3,4,5]

// 参数一：前一个值
// 参数二：下一个值（当前值）
// 参数三：当前的索引
// 参数四：arr数组
let total = arr.reduce(function(prev,next,currentIndex,arr){
    return prev + next
})

console.log(total) // 15

```

```
// 那么reduce是怎样一个运行流程呢？
// 我们一步步拆解出来看
let arr = [1,2,3,4,5]

// arr会一直是[1,2,3,4,5]
// 第一步：此时的prev为1，next为2，currentIndex为1
let total = arr.reduce(function(prev,next,currentIndex,arr){
    return prev + next // 1+2=3   并且把3当做下一次的prev
})

// 第二步：此时的prev为3，next为3，currentIndex为2
let total = arr.reduce(function(prev,next,currentIndex,arr){
    return prev + next // 3+3=6   并且把6当做下一次的prev
})

// 第三步：此时的prev为6，next为4，currentIndex为3
let total = arr.reduce(function(prev,next,currentIndex,arr){
    return prev + next // 6+4=10   并且把10当做下一次的prev
})

// 第四步：此时的prev为10，next为5，currentIndex为4
let total = arr.reduce(function(prev,next,currentIndex,arr){
    return prev + next // 10+5=15 最终结果会作为返回值返回
})

```
那我们自己实现一个reduce，看看是如何实现的
```
Array.prototype.myReduce = function (callback) {
  let prev = this[0]
  for(let i = 0;i < this.length-1;i++){
    prev = callback(prev,this[i+1],i+1,this)
  }
  return prev
}

let arr = [1,2,3,4,5]
let total = arr.myReduce(function(prev,next,currentIndex,arr){
  console.log(prev,next)
  return prev + next
})

console.log(total) // 15

```

## map

可以把数组返回成一个映射后的数组
```
let arr = [1,2,3].map(item => item+1)
console.log(arr) // [2,3,4]

```

## find 和 findIndex

**find**查找，查找到后不再继续查找，查找不到则返回**undefined**，内部返回true的话，则返回当前**value**
```
[1, 5, 10, 15].find(function(value, index, arr) {
  return value > 3;
}) // 10

```

**findIndex**方法的用法与find方法非常类似，返回第一个符合条件的数组成员的**位置**，如果所有成员都不符合条件，则返回**-1**。
```
[1, 5, 10, 15].findIndex(function(value, index, arr) {
  return value > 9;
}) // 2
```

这两个方法都可以接受第二个参数，用来绑定回调函数的this对象。
```
function f(v){
  return v > this.age;
}
let person = {name: 'John', age: 20};
[10, 12, 26, 15].find(f, person);    // 26
```

另外，这两个方法都可以发现NaN，弥补了数组的indexOf方法的不足。
```
[NaN].indexOf(NaN)
// -1

[NaN].findIndex(y => Object.is(NaN, y))
// 0
```


## every
每个值是否满足条件，如果是则返回true，如果不是则返回false

```
let arr = [1,2,3,4]
let isTrue = arr.every(item => {
    return item > 0
})

console.log(isTrue) // true

let isTrue2 = arr.every(item => {
    return item > 2
})

console.log(isTrue2) // false

```
## some

是否有其中一个值满足条件，如果是则返回true，如果不是则返回false

```
let arr = [1,2,3,4]
let isTrue = arr.some(item => {
    return item > 2
})

console.log(isTrue) // true

let isTrue2 = arr.some(item => {
    return item > 4
})

console.log(isTrue2) // false

```

## filter
过滤，在回调函数中返回的为false的话，相当于过滤掉当前项，返回一个过滤后的数组

```
let arr = [1,2,3,4]

let newArr = arr.filter(item=>{
  return item > 2
})

console.log(newArr) // [3,4]

```
## includes

基本和some一样

Array.prototype.includes方法返回一个布尔值，表示某个数组是否包含给定的值，与字符串的includes方法类似

```
// 没有该方法之前，我们通常使用数组的indexOf方法，检查是否包含某个值。
if (arr.indexOf(el) !== -1) {
  // ...
}

// 内部使用严格相等运算符（===）进行判断，这会导致对NaN的误判
[NaN].indexOf(NaN)
// -1

[1, 2, 3].includes(2)     // true
[1, 2, 3].includes(4)     // false
[1, 2, NaN].includes(NaN) // true
```

该方法的第二个参数表示搜索的起始位置，默认为0。如果第二个参数为负数，则表示倒数的位置，如果这时它大于数组长度（比如第二个参数为-4，但数组长度为3），则会重置为从0开始。
```
[1, 2, 3].includes(3, 3);  // false
[1, 2, 3].includes(3, -1); // true
```

下面代码用来检查当前环境是否支持该方法，如果不支持，部署一个简易的替代版本。
```
const contains = (() =>
  Array.prototype.includes
    ? (arr, value) => arr.includes(value)
    : (arr, value) => arr.some(el => el === value)
)();
contains(['foo', 'bar'], 'baz'); // => false
```

**另外，Map 和 Set 数据结构有一个has方法，需要注意与includes区分。**

Map 结构的has方法，是用来**查找键名**的，比如Map.prototype.has(key)、WeakMap.prototype.has(key)、Reflect.has(target, propertyKey)。

Set 结构的has方法，是用来**查找值**的，比如Set.prototype.has(value)、WeakSet.prototype.has(value)。

## Array.of

Array.of方法用于将一组值，转换为数组。

这个方法的主要目的，是弥补数组构造函数Array()的不足。因为参数个数的不同，会导致Array()的行为有差异

```
Array() // []
Array(3) // [, , ,]
Array(3, 11, 8) // [3, 11, 8]
```

Array.of基本上可以用来替代Array()或new Array()，并且不存在由于参数不同而导致的重载。它的行为非常统一。

```
Array.of() // []
Array.of(undefined) // [undefined]
Array.of(1) // [1]
Array.of(1, 2) // [1, 2]


// Array.of方法可以用下面的代码模拟实现。
function ArrayOf(){
  return [].slice.call(arguments);
}
```

## copyWithin

数组实例的copyWithin方法，在当前数组内部，将指定位置的成员复制到其他位置（会覆盖原有成员），然后返回当前数组。也就是说，使用这个方法，会修改当前数组。

它接受三个参数,这三个参数都应该是数值，如果不是，会自动转为数值。

- target（必需）：从该位置开始替换数据。如果为负值，表示倒数。
- start（可选）：从该位置开始读取数据，默认为 0。如果为负值，表示倒数。
- end（可选）：到该位置前停止读取数据，默认等于数组长度。如果为负值，表示倒数。

```
Array.prototype.copyWithin(target, start = 0, end = this.length)


// -2相当于3号位，-1相当于4号位
[1, 2, 3, 4, 5].copyWithin(0, -2, -1)
// [4, 2, 3, 4, 5]

```

## fill

fill方法使用给定值，填充一个数组。
```
['a', 'b', 'c'].fill(7)
// [7, 7, 7]

new Array(3).fill(7)
// [7, 7, 7]
```

fill方法还可以接受第二个和第三个参数，用于指定填充的起始位置和结束位置。
```
['a', 'b', 'c'].fill(7, 1, 2)
// ['a', 7, 'c']
```

如果填充的类型为对象，那么被赋值的是同一个内存地址的对象，而不是深拷贝对象。
```
let arr = new Array(3).fill({name: "Mike"});
arr[0].name = "Ben";
arr
// [{name: "Ben"}, {name: "Ben"}, {name: "Ben"}]

let arr = new Array(3).fill([]);
arr[0].push(5);
arr
// [[5], [5], [5]]
```

## entries()，keys() 和 values()

**keys()**是对键名的遍历、**values()**是对键值的遍历，**entries()**是对键值对的遍历

```
for (let index of ['a', 'b'].keys()) {
  console.log(index);
}
// 0
// 1

for (let elem of ['a', 'b'].values()) {
  console.log(elem);
}
// 'a'
// 'b'

for (let [index, elem] of ['a', 'b'].entries()) {
  console.log(index, elem);
}
// 0 "a"
// 1 "b"
```

##  flat()，flatMap()

数组的成员有时还是数组，**Array.prototype.flat()** 用于将嵌套的数组“拉平”，变成一维的数组。该方法返回一个新数组，对原数据没有影响。

**flatMap()** 方法对原数组的每个成员执行一个函数（相当于执行Array.prototype.map()），然后对返回值组成的数组执行flat()方法。该方法返回一个新数组，不改变原数组。

#### flat语法
```
[1, 2, [3, 4]].flat()
// [1, 2, 3, 4]
```
- **flat()** 默认只会“拉平”一层，如果想要“拉平”多层的嵌套数组，可以将flat()方法的参数写成一个整数，表示想要拉平的层数，默认为1。
- 如果不管有多少层嵌套，都要转成一维数组，可以用**Infinity**关键字作为参数
- 如果原数组有空位，flat()方法会跳过空位。
```
[1, 2, [3, [4, 5]]].flat()
// [1, 2, 3, [4, 5]]

[1, 2, [3, [4, 5]]].flat(2)
// [1, 2, 3, 4, 5]

[1, [2, [3]]].flat(Infinity)
// [1, 2, 3]

[1, 2, , 4, 5].flat()
// [1, 2, 4, 5]
```

#### flatMap语法

**flatMap()** 方法的参数是一个遍历函数，该函数可以接受三个参数，分别是当前数组成员、当前数组成员的位置（从零开始）、原数组。

flatMap()方法还可以有第二个参数，用来绑定遍历函数里面的this。
```
arr.flatMap(function callback(currentValue[, index[, array]]) {
  // ...
}[, thisArg])


// 相当于 [[2, 4], [3, 6], [4, 8]].flat()
[2, 3, 4].flatMap((x) => [x, x * 2])
// [2, 4, 3, 6, 4, 8]
```

————2018.12.21