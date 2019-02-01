// 3.const
// 3.1 const和let基本上可以说是完全一致的，但是const声明的对象不能更改其指向的引用地址（即堆区）


// 3.1
// 当用普通值赋值给const声明的变量后，再重新赋值时
// 值引用会被更改，所以会报错
const STR1 = 'hello swr'
STR1 = 'goodbye swr' // 报错,Assignment to constant variable

// 当我们修改这个引用地址里面的内容时，则不会报错
// 因为这个变量是指向这个引用地址的
const OBJ = {name:"swr"}
OBJ.name = 'hello swr'
console.log(OBJ) // {name:"hello swr"}
// 但是当我们把这个变量重新赋值一个引用地址时，则会报错
OBJ = {} // 报错
