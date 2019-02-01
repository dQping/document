# Class类

ES6 的class可以看作只是一个语法糖，它的绝大部分功能，ES5 都可以做到，新的class写法只是让对象原型的写法更加清晰、更像面向对象编程的语法而已。

- 类和模块的内部，默认就是严格模式，所以不需要使用use strict指定运行模式。只要你的代码写在类或模块之中，就只有严格模式可用。考虑到未来所有的代码，其实都是运行在模块之中，所以 ES6 实际上把整个语言升级到了严格模式。

- 类不存在变量提升（hoist），这一点与 ES5 完全不同。

## 基础语法

```
class Point {
  // 在constructor中写实例属性、方法
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  // 原型方法
  toString() {
    return '(' + this.x + ', ' + this.y + ')';
  }

  // 静态方法 也会被继承
  static sayWhat(){
    return "我是静态方法的sayWhat"
  }

  // 在es6中静态属性不能这样写 static prop = "丸子"  这样会报错
  // 在es7中可以这样写static prop = "丸子"
}

// 静态属性
  Point.prop = "丸子"

  let p = new Point(5,15) // new一个对象
  console.log(p.x) //  5
  p.toString() // ('')
  console.log(Point.sayWhat()) // 我是静态方法的sayWhat

```

实例的属性方法每次new的时候都会创建一份，每个实例之间不共用，写在原型上的属性和方法，会被所有实例继承共用。

加上static关键字，就表示该方法不会被实例继承，而是直接通过类来调用，这就称为“静态方法”



ES6 的类，完全可以看作ES5构造函数的另一种写法。
类的数据类型就是函数，类本身就指向构造函数。
```
class Point {
  // ...
}

typeof Point // "function"
Point === Point.prototype.constructor // true
```
类的所有方法都定义在类的prototype属性上面。

**实例属性的新写法：** 实例属性除了在constructor()方法里面定义，也可以直接写在类的最顶层。
```
class IncreasingCounter {
  _count = 0;
  get value() {
    console.log('Getting the current value!');
    return this._count;
  }
  increment() {
    this._count++;
  }
}
// 实例属性_count与取值函数value()和increment()方法，处于同一个层级。这时，不需要在实例属性前面加上this。
```

## 继承

Class 可以通过extends关键字实现继承，父类的静态方法，可以被子类继承。

```
class Point {
}

// class ColorPoint extends Point实际上相当于
// ColorPoint.prototype = Object.create(Point.prototype)
// 打印出来可以看到
// console.log(ColorPoint.prototype === Point.prototype) // false
// console.log(ColorPoint.prototype.__proto__ === Point.prototype) // true


class ColorPoint extends Point {
  constructor(x, y, color) {
    super(x, y); // 调用父类的constructor(x, y),相当于Point.call(this)
    this.color = color;
  }

  toString() {
    return this.color + ' ' + super.toString(); // 调用父类的toString()
  }
}
```
子类必须在constructor方法中调用super方法，否则新建实例时会报错

**Object.getPrototypeOf**方法可以用来从子类上获取父类。
```
Object.getPrototypeOf(ColorPoint) === Point
// true
```

#### 类的 prototype 属性和__proto__属性

大多数浏览器的 ES5 实现之中，每一个对象都有 **\_\_proto\_\_** 属性，指向对应的 **构造函数的prototype** 属性。Class 作为构造函数的语法糖，同时有**prototype** 属性和 **\_\_proto\_\_** 属性，因此同时存在两条继承链。

-  子类的__proto__属性，表示构造函数的继承，总是指向父类。
-  子类prototype属性的\_\_proto\_\_属性，表示方法的继承，总是指向父类的prototype属性。





———— 2018.12.21