# Proxy

Proxy代理也可以进行数据劫持，但是和Object.defineProperty不同的是，Proxy是在数据外层套了个壳，然后通过这层壳可以对外界的访问进行过滤和改写。

## 语法

ES6 原生提供 Proxy 构造函数，用来生成 Proxy 实例。
```
var proxy = new Proxy(target, handler);
// Proxy 对象的所有用法，都是上面这种形式，不同的只是handler参数的写法。

```

new Proxy()表示生成一个Proxy实例，**target参数表示所要拦截的目标对象，handler参数也是一个对象，用来定制拦截行为**。

要使得Proxy起作用，必须针对Proxy实例进行操作，而不是针对目标对象进行操作.

上面代码说明，Proxy 实际上重载（overload）了点运算符，即用自己的定义覆盖了语言的原始定义。例如：

```
var obj = new Proxy({}, {
  get: function (target, key, receiver) {
    console.log(`getting ${key}!`);
    return Reflect.get(target, key, receiver);
  },
  set: function (target, key, value, receiver) {
    console.log(`setting ${key}!`);
    return Reflect.set(target, key, value, receiver);
  }

  obj.count = 1
//  setting count!

  ++obj.count
//  getting count!
//  setting count!
//  2
});
```

一个技巧是将 Proxy 对象，设置到 **object.proxy** 属性，从而可以在 **object** 对象上调用。
```
var object = { proxy: new Proxy(target, handler) };
```

同一个拦截器函数，可以设置拦截多个操作。
```
var handler = {
  get: function(target, name) {
    if (name === 'prototype') {
      return Object.prototype;
    }
    return 'Hello, ' + name;
  },

  apply: function(target, thisBinding, args) {
    return args[0];
  },

  construct: function(target, args) {
    return {value: args[1]};
  }
};

var fproxy = new Proxy(function(x, y) {
  return x + y;
}, handler);

fproxy(1, 2) // 1
new fproxy(1, 2) // {value: 2}
fproxy.prototype === Object.prototype // true
fproxy.foo === "Hello, foo" // true
```

## Proxy 实例的方法
下面是 Proxy 支持的拦截操作一览，一共 13 种

### 1. get(target, propKey, receiver)：拦截对象属性的读取，比如proxy.foo 和 proxy['foo']。

get方法用于拦截某个属性的读取操作，可以接受三个参数，依次为目标对象、属性名和 proxy 实例本身（严格地说，是操作行为所针对的对象），其中最后一个参数可选。

下面的例子使用get拦截，实现数组读取负数的索引
```
function createArray(...elements) {
  let handler = {
    get(target, propKey, receiver) {
      let index = Number(propKey);
      if (index < 0) {
        propKey = String(target.length + index);
      }
      return Reflect.get(target, propKey, receiver);
    }
  };

  let target = [];
  target.push(...elements);
  return new Proxy(target, handler);
}

let arr = createArray('a', 'b', 'c');
arr[-1] // c
```

### 2. set(target, propKey, value, receiver)：拦截对象属性的设置，比如proxy.foo = v或proxy['foo'] = v，返回一个布尔值。

set方法用来拦截某个属性的赋值操作，可以接受四个参数，依次为目标对象、属性名、属性值和 Proxy 实例本身，其中最后一个参数可选。

有时，我们会在对象上面设置内部属性，属性名的第一个字符使用下划线开头，表示这些属性不应该被外部使用。结合get和set方法，就可以做到防止这些内部属性被外部读写。

***注意，严格模式下，set代理如果没有返回true，就会报错。***

```
const handler = {
  get (target, key) {
    invariant(key, 'get');
    return target[key];
  },
  set (target, key, value) {
    invariant(key, 'set');
    target[key] = value;
    return true;
  }
};
function invariant (key, action) {
  if (key[0] === '_') {
    throw new Error(`Invalid attempt to ${action} private "${key}" property`);
  }
}
const target = {};
const proxy = new Proxy(target, handler);
proxy._prop
// Error: Invalid attempt to get private "_prop" property
proxy._prop = 'c'
// Error: Invalid attempt to set private "_prop" property
```

### 3. has(target, propKey)：拦截propKey in proxy的操作，返回一个布尔值。

has方法可以接受两个参数，分别是目标对象、需查询的属性名。

值得注意的是，has方法拦截的是HasProperty操作，而不是HasOwnProperty操作，即has方法不判断一个属性是对象自身的属性，还是继承的属性。

***注意，虽然for...in循环也用到了in运算符，但是has拦截对for...in循环不生效。***

例如：如果原对象的属性名的第一个字符是下划线，proxy.has就会返回false，从而不会被in运算符发现。
```
var handler = {
  has (target, key) {
    if (key[0] === '_') {
      return false;
    }
    return key in target;
  }
};
var target = { _prop: 'foo', prop: 'foo' };
var proxy = new Proxy(target, handler);
'_prop' in proxy // false

```

### 4.deleteProperty(target, propKey)：拦截delete proxy[propKey]的操作，返回一个布尔值。

deleteProperty方法用于拦截delete操作，如果这个方法抛出错误或者返回false，当前属性就无法被delete命令删除。

```
var handler = {
  deleteProperty (target, key) {
    invariant(key, 'delete');
    delete target[key];
    return true;
  }
};
function invariant (key, action) {
  if (key[0] === '_') {
    throw new Error(`Invalid attempt to ${action} private "${key}" property`);
  }
}

var target = { _prop: 'foo' };
var proxy = new Proxy(target, handler);
delete proxy._prop
// Error: Invalid attempt to delete private "_prop" property
```

### 5.apply(target, object, args)：拦截 Proxy 实例作为函数调用的操作，比如proxy(...args)、proxy.call(object, ...args)、proxy.apply(...)。

apply方法可以接受三个参数，分别是目标对象、目标对象的上下文对象（this）和目标对象的参数数组。

```
var twice = {
  apply (target, ctx, args) {
    return Reflect.apply(...arguments) * 2;
  }
};
function sum (left, right) {
  return left + right;
};
var proxy = new Proxy(sum, twice);
proxy(1, 2) // 6
proxy.call(null, 5, 6) // 22
proxy.apply(null, [7, 8]) // 30

// 直接调用Reflect.apply方法，也会被拦截。
Reflect.apply(proxy, null, [9, 10]) // 38
```

### 6.construct(target, args)：拦截 Proxy 实例作为构造函数调用的操作，比如new proxy(...args)。

construct方法返回的必须是一个对象，否则会报错。
```
var p = new Proxy(function() {}, {
  construct: function(target, argumentsList) {
    return 1;
  }
});

new p() // 报错
// Uncaught TypeError: 'construct' on proxy: trap returned non-object ('1')

```

### 7.defineProperty(target, propKey, propDesc)：拦截Object.defineProperty(proxy, propKey, propDesc）、Object.defineProperties(proxy, propDescs)，返回一个布尔值。

```
var handler = {
  defineProperty (target, key, descriptor) {
    return false;
  }
};
var target = {};
var proxy = new Proxy(target, handler);
proxy.foo = 'bar' // 不会生效
```

### 8.ownKeys(target)：返回一个数组。该方法返回目标对象所有自身的属性的属性名，而Object.keys()的返回结果仅包括目标对象自身的可遍历属性。

ownKeys方法用来拦截对象自身属性的读取操作。具体来说，拦截以下操作。

+ Object.getOwnPropertyNames()
+ Object.getOwnPropertySymbols()
+ Object.keys()
+ for...in循环

下面是拦截Object.keys()的例子
```
let target = {
  a: 1,
  b: 2,
  c: 3
};

let handler = {
  ownKeys(target) {
    return ['a'];
  }
};

let proxy = new Proxy(target, handler);

Object.keys(proxy)
// [ 'a' ]
```

### 9.getOwnPropertyDescriptor(target, propKey)

拦截Object.getOwnPropertyDescriptor()，返回一个属性描述对象或者undefined。
```
var handler = {
  getOwnPropertyDescriptor (target, key) {
    if (key[0] === '_') {
      return;
    }
    return Object.getOwnPropertyDescriptor(target, key);
  }
};
var target = { _foo: 'bar', baz: 'tar' };
var proxy = new Proxy(target, handler);
Object.getOwnPropertyDescriptor(proxy, 'wat')
// undefined
Object.getOwnPropertyDescriptor(proxy, '_foo')
// undefined
Object.getOwnPropertyDescriptor(proxy, 'baz')
// { value: 'tar', writable: true, enumerable: true, configurable: true }
```

下面的例子是拦截第一个字符为下划线的属性名。
```
let target = {
  _bar: 'foo',
  _prop: 'bar',
  prop: 'baz'
};

let handler = {
  ownKeys (target) {
    return Reflect.ownKeys(target).filter(key => key[0] !== '_');
  }
};

let proxy = new Proxy(target, handler);
for (let key of Object.keys(proxy)) {
  console.log(target[key]);
}
// "baz"
```

注意，使用Object.keys方法时，有三类属性会被ownKeys方法自动过滤，不会返回。

- 目标对象上不存在的属性
- 属性名为 Symbol 值
- 不可遍历（enumerable）的属性

ownKeys方法返回的数组成员，只能是字符串或 Symbol 值。如果有其他类型的值，或者返回的根本不是数组，就会报错。
```
var obj = {};

var p = new Proxy(obj, {
  ownKeys: function(target) {
    return [123, true, undefined, null, {}, []];
  }
});

Object.getOwnPropertyNames(p)
// Uncaught TypeError: 123 is not a valid property name
```

另外，如果目标对象是不可扩展的（non-extensible），这时ownKeys方法返回的数组之中，必须包含原对象的所有属性，且不能包含多余的属性，否则报错。

```
var obj = {
  a: 1
};

Object.preventExtensions(obj);

var p = new Proxy(obj, {
  ownKeys: function(target) {
    return ['a', 'b'];
  }
});

Object.getOwnPropertyNames(p)
// Uncaught TypeError: 'ownKeys' on proxy: trap returned extra keys but proxy target is non-extensible
```

### 10.preventExtensions(target)

preventExtensions方法拦截Object.preventExtensions()。该方法必须返回一个布尔值，否则会被自动转为布尔值。

这个方法有一个限制，只有目标对象不可扩展时 **（即Object.isExtensible(proxy)为false）** ，**proxy.preventExtensions才能返回true**，否则会报错。

为了防止出现这个问题，通常要在proxy.preventExtensions方法里面，调用一次Object.preventExtensions。

```
var proxy = new Proxy({}, {
  preventExtensions: function(target) {
    console.log('called');
    Object.preventExtensions(target);
    return true;
  }
});

Object.preventExtensions(proxy)
// "called"
// Proxy {}

```



### 11.getPrototypeOf(target)：拦截Object.getPrototypeOf(proxy)，返回一个对象。

getPrototypeOf方法主要用来拦截获取对象原型。具体来说，拦截下面这些操作。
+ Object.prototype.\_\_proto\_\_
+ Object.prototype.isPrototypeOf()
+ Object.getPrototypeOf()
+ Reflect.getPrototypeOf()
+ instanceof

**注意，getPrototypeOf方法的返回值必须是对象或者null，否则报错。**

例如：上面代码中，getPrototypeOf方法拦截Object.getPrototypeOf()，返回proto对象。
```
var proto = {};
var p = new Proxy({}, {
  getPrototypeOf(target) {
    return proto;
  }
});
Object.getPrototypeOf(p) === proto // true
```

### 12.isExtensible(target)：拦截Object.isExtensible(proxy)，返回一个布尔值。

注意，该方法只能返回布尔值，否则返回值会被自动转为布尔值。

这个方法有一个强限制，它的返回值必须与目标对象的isExtensible属性保持一致，否则就会抛出错误。
```
var p = new Proxy({}, {
  isExtensible: function(target) {
    console.log("called");
    return true;
  }
});

Object.isExtensible(p)
// "called"
// true
```


### 13.setPrototypeOf(target, proto)

setPrototypeOf方法主要用来拦截Object.setPrototypeOf方法。

下面是一个例子,只要修改target的原型对象，就会报错。。

```
var handler = {
  setPrototypeOf (target, proto) {
    throw new Error('Changing the prototype is forbidden');
  }
};
var proto = {};
var target = function () {};
var proxy = new Proxy(target, handler);
Object.setPrototypeOf(proxy, proto);
// Error: Changing the prototype is forbidden
```
注意，该方法只能返回布尔值，否则会被自动转为布尔值。另外，如果目标对象不可扩展（non-extensible），setPrototypeOf方法不得改变目标对象的原型。

本章学习自阮一峰老师的es6：es6.ruanyifeng.com/
————2018.12.20