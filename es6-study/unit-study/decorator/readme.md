# decorator 装饰器

装饰器是用来装饰类的
```
@testable
class MyTestableClass {
  // ...
}

function testable(target) {
  target.isTestable = true;
}

MyTestableClass.isTestable // true
```

基本上，修饰器的行为就是下面这样。

```
@decorator
class A {}

// 等同于

class A {}
A = decorator(A) || A;
```

那么我们该怎么给testable传参呢？可以在修饰器外面再封装一层函数
```
function testable(isTestable) {
  return function(target) {
    target.isTestable = isTestable;
  }
}

@testable(true)
class MyTestableClass {}
MyTestableClass.isTestable // true

@testable(false)
class MyClass {}
MyClass.isTestable // false
```

前面的例子是为类添加一个静态属性，如果想添加实例属性，可以通过目标类的prototype对象操作。

```
function testable(target) {
  target.prototype.isTestable = true;
}

@testable
class MyTestableClass {}

let obj = new MyTestableClass();
obj.isTestable // true
```


修饰器不仅可以修饰类，还可以修饰类的属性。
```
class Person {
  @readonly
  name() { return `${this.first} ${this.last}` }
}


function readonly(target, name, descriptor){
  // descriptor对象原来的值如下
  // {
  //   value: specifiedFunction,
  //   enumerable: false,
  //   configurable: true,
  //   writable: true
  // };
  descriptor.writable = false;
  return descriptor;
}

readonly(Person.prototype, 'name', descriptor);
// 类似于
Object.defineProperty(Person.prototype, 'name', descriptor);

```

修饰符也可以修饰类的方法
```
class Person {
    @myFunction
    say(){}
}

// 如果修饰的是方法
// 参数一：是Person.prototype
// 参数二：是say
// 参数三：是描述器
function myFunction(target,key,descriptor){
    // 给这个类添加一个原型属性
    Object.assign(target,{name:"wz"})
}

let p = new Person()
console.log(p.name) // wz
```

装饰器经常在react中使用~其实decorator是简写，逼格高一些。

————2018.12.21