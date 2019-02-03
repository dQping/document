#封装与扩展

一般封装js插件，最后根据想要的调用方式，有两种形式的封装（以下部分代码基于jquery）

## 以构造函数的形式封装

## 闭包形式
```
(function(global){
    // 构造函数
    function SelectTime(options){
        // 参数处理
        this.options = $.extend({}, SelectTime.Default, options || {});
        // 初始化
        init();

    }
    // 默认参数
    SelectTime.Default = {

    }
    // 在对象原型上的方法，所有实例都可以调用
    SelectTime.prototype = {
        init(){
            console.log(‘new了一个新对象‘);
        },
        read:(){
            console.log(‘hello dqp‘)
        }
    }

    // 防止相同元素多次构建实例
    function Plugin (el, option) {
        var args = Array.prototype.slice.call(arguments, 1);


            var $this = $(el),
                selectTime = $this.data('selectTime');

            if (!selectTime) {
                $this.data('selectTime', (selectTime = new SelectTime(this, option)));
            }
            return selectTime;

    }

    //兼容CommonJs规范
    if (typeof module !== 'undefined' && module.exports) module.exports = Plugin;

    //兼容AMD/CMD规范
    if (typeof define === 'function') define(function () { return Plugin; });

    
    // 注册全局变量，兼容直接使用script标签引入该插件
    global.SelectTime = Plugin;
})(this);

```

## es6类形式

```
class SelectTime {
  // 在constructor中写实例属性、方法
  constructor(options) {
    this.options = options;
  }

  // 原型方法
  toString() {
    return 'Hello World';
  }
  init() {
      console.log(‘new了一个新对象‘);
  }

  // 静态方法 也会被继承
  static sayWhat(){
    return "我是静态方法的sayWhat"
  }

}


```

## jq扩展函数形式
```

(function(global){
    // 构造函数
    function SelectTime(options){
        // 参数处理
        this.options = $.extend({}, SelectTime.Default, options || {});
        // 初始化
        init();

    }
    // 默认参数
    SelectTime.Default = {

    }
    // 在对象原型上的方法，所有实例都可以调用
    SelectTime.prototype = {
        init(){
            console.log(‘new了一个新对象‘);
        },
        read:(){
            console.log(‘hello dqp‘)
        }
    }

    // 防止相同元素多次构建实例
    function Plugin (option) {
        var args = Array.prototype.slice.call(arguments, 1);

        return this.each(function () {

            var $this = $(this),
                selectTime = $this.data('selectTime');

            if (!selectTime) {
                $this.data('selectTime', (selectTime = new SelectTime(this, option)));
            }

            if (typeof option == 'string') {
                selectTime[option] && selectTime[option].apply(selectTime, args);
            }
        });
    }

    $.fn.SelectTime = SelectTime;
})(this);
```

