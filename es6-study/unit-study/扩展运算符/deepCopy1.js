// 方法一：利用JSON.stringify和JSON.parse
let swr = {
    name:"邵威儒",
    age:28,
    pets:['小黄']
}

let swrcopy = JSON.parse(JSON.stringify(swr))
console.log(swrcopy) // { name: '邵威儒', age: 28, pets: [ '小黄' ] }
// 此时我们新增swr的属性
swr.pets.push('旺财')
console.log(swr) // { name: '邵威儒', age: 28, pets: [ '小黄', '旺财' ] }
// 但是swrcopy却不会受swr影响
console.log(swrcopy) // { name: '邵威儒', age: 28, pets: [ '小黄' ] }
// 这种方式进行深拷贝，只针对json数据这样的键值对有效
// 对于函数等等反而无效，不好用，接着继续看方法二、三。
