
# Symbol

在js中，常见的数据类型有**undefined null string number boolean object**，而es6中，则新增了第七种数据类型symbol。

+ 1.symbol会生成一个独一无二的值，为常量

```
let s1 = Symbol()
let s2 = Symbol()
console.log(s1 === s2) // false

// 因为Symbol生成的是一个独一无二的值，为常量，一般是作为对象的属性
let obj = {
  [s1]:1,
  [s2]:2
}

console.log(obj) // { [Symbol()]: 1, [Symbol()]: 2 }
```
s1和s2是两个 Symbol 值。如果不加参数，它们在控制台的输出都是Symbol()，不利于区分。

+ 2.有了参数以后，就等于为它们加上了描述，输出的时候就能够分清，到底是哪一个值。

+ 3.如果 Symbol 的参数是一个**对象**，就会调用该对象的**toString方法**，将其转为字符串，然后才生成一个 Symbol 值。

+ 4.Symbol函数的参数只是表示对当前 Symbol 值的描述，因此相同参数的Symbol函数的返回值是不相等的。

```
const obj = {
  toString() {
    return 'abc';
  }
};
const sym = Symbol(obj);
sym // Symbol(abc)

// 没有参数的情况
let s1 = Symbol();
let s2 = Symbol();

s1 === s2 // false

// 有参数的情况
let s1 = Symbol('foo');
let s2 = Symbol('foo');

s1 === s2 // false
```
+ 5.Symbol 值不能与其他类型的值进行运算，会报错
+ 6.Symbol 值可以显式转为字符串。
+ 7.Symbol 值也可以转为布尔值，但是不能转为数值。
```
let sym = Symbol('My symbol');

String(sym) // 'Symbol(My symbol)'
sym.toString() // 'Symbol(My symbol)'


let sym2 = Symbol();
Boolean(sym2) // true
!sym2  // false

if (sym2) {
  // ...
}

Number(sym2) // TypeError
sym2 + 2 // TypeError
```
+ **8.注意，Symbol 值作为对象属性名时，不能用点运算符。**

```
const mySymbol = Symbol();
const a = {};

a.mySymbol = 'Hello!';
a[mySymbol] // undefined
a['mySymbol'] // "Hello!"
```
上面代码中，因为点运算符后面总是字符串，所以不会读取mySymbol作为标识名所指代的那个值，导致a的属性名实际上是一个字符串，而不是一个 Symbol 值。

同理，在对象的内部，使用 Symbol 值定义属性时，Symbol 值必须放在方括号之中。
```
let s = Symbol();

let obj = {
  [s]: function (arg) { ... }
};

obj[s](123);
```
上面代码中，如果s不放在方括号中，该属性的键名就是字符串s，而不是s所代表的那个 Symbol 值。


+ 9.Symbol 作为属性名，**该属性不会出现在for...in、for...of循环中，也不会被Object.keys()、Object.getOwnPropertyNames()、JSON.stringify()返回**。但是，它也不是私有属性，有一个**Object.getOwnPropertySymbols**方法，可以获取指定对象的所有 Symbol 属性名。

### Symbol.for()与Symbol()

Symbol.for()与Symbol()这两种写法，都会生成新的 Symbol。它们的区别是，**前者会被登记在全局环境中供搜索，后者不会**。Symbol.for()不会每次调用就返回一个新的 Symbol 类型的值，而是会先检查给定的key是否已经存在，如果不存在才会新建一个值。
```
let s1 = Symbol.for('foo')
let s2 = Symbol.for('foo')
console.log(s1 === s2) // true

// 也可以通过Symbol.keyFor把标识找出来
console.log(Symbol.keyFor(s1)) // foo
```

————2018.12.21