# Set-Map

## Set

set是放不重复的项，也就是去重
```
let items = new Set([1,2,3,4,3,2,1])
console.log(items) // items { 1, 2, 3, 4 }


// add
items.add(5)
console.log(items) // items { 1, 2, 3, 4, 5 }
items.size // 5

// 添加一个已有的值，则不会添加进去
items.add(1)
console.log(items) // items { 1, 2, 3, 4, 5 }
items.size // 5

// delete
items.delete(3)
console.log(items) // items { 1, 2, 4, 5 }

// 去除数组的重复成员
[...new Set(array)]
// 去除数组的重复成员
Array.from(new Set(array));
```

在 Set 内部，两个NaN是相等。
```
let set = new Set();

set.add({});
set.size // 1

set.add({});
set.size // 2
```


#### Set 结构的实例有以下属性。

- **Set.prototype.constructor**：构造函数，默认就是Set函数。
- **Set.prototype.size**：返回Set实例的成员总数。

Set 实例的方法分为两大类：操作方法（用于操作数据）和遍历方法（用于遍历成员）。

#### 4个操作方法：
- **add(value)**：添加某个值，返回 Set 结构本身。
- **delete(value)**：删除某个值，返回一个布尔值，表示删除是否成功。
- **has(value)**：返回一个布尔值，表示该值是否为Set的成员。
- **clear()**：清除所有成员，没有返回值。

Set 结构的实例有四个遍历方法，可以用于遍历成员。

- keys()：返回键名的遍历器
- values()：返回键值的遍历器
- entries()：返回键值对的遍历器
- forEach()：使用回调函数遍历每个成员

```
let set = new Set(['red', 'green', 'blue']);

for (let item of set.keys()) {
  console.log(item);
}
// red
// green
// blue

for (let item of set.values()) {
  console.log(item);
}
// red
// green
// blue

for (let item of set.entries()) {
  console.log(item);
}
// ["red", "red"]
// ["green", "green"]
// ["blue", "blue"]

set.forEach((value, key) => console.log(key + ' : ' + value))

```

因此使用 Set 可以很容易地实现并集（Union）、交集（Intersect）和差集
```
let a = new Set([1, 2, 3]);
let b = new Set([4, 3, 2]);

// 并集
let union = new Set([...a, ...b]);
// Set {1, 2, 3, 4}


// 交集
let intersect = new Set([...a].filter(x => b.has(x)));
// set {2, 3}


// 差集
let difference = new Set([...a].filter(x => !b.has(x)));
// Set {1}
```

## Map

也是集合，主要格式是 key => value，同样是不能放重复的key

Object 结构提供了“字符串—值”的对应，Map 结构提供了“值—值”的对应，是一种更完善的 Hash 结构实现。如果你需要“键值对”的数据结构，Map 比 Object 更合适。

#### Map 结构的实例有以下属性操作方法
- size 属性
- set(key, value)
- get(key)
- has(key)
- delete(key)
- clear()

```
// 如果放重复的key会怎样呢？会被覆盖
let map = new Map()
map.set('name','丸子')
map.set('name','wz')
console.log(map) // Map { 'name' => 'wz' }

// 取的话用get
map.get('name') // 'wz'

// 删的话用delete
map.delete('name')
console.log(map) // Map {}

// 很多方法和set差不多
```

#### 遍历方法

- keys()：返回键名的遍历器。
- values()：返回键值的遍历器。
- entries()：返回所有成员的遍历器。
- forEach()：遍历 Map 的所有成员。
```
let map = new Map()
map.set('name','wz')
map.set('age',18)
// 一般使用for ... of ... 遍历
for(let [key,value] of map.entries()){
    console.log(key,value) // name wz
                           // age 18
}

// 等同于使用map.entries()
for (let [key, value] of map) {
  console.log(key, value);
}

// 也可以用forEach
// forEach方法还可以接受第二个参数，用来绑定this
map.forEach(item => {
    console.log(item) // wz
                      // 18
})

```

Map 结构转为数组结构，比较快速的方法是使用扩展运算符（...）。

```
const map = new Map([
  [1, 'one'],
  [2, 'two'],
  [3, 'three'],
]);

[...map.keys()]
// [1, 2, 3]

[...map.values()]
// ['one', 'two', 'three']

[...map.entries()]
// [[1,'one'], [2, 'two'], [3, 'three']]

[...map]
// [[1,'one'], [2, 'two'], [3, 'three']]

```
结合数组的map方法、filter方法，可以实现 Map 的遍历和过滤（Map 本身没有map和filter方法）。



————2018.12.21