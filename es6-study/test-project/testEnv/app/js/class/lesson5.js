{
    let set1=new Set([3,2,3,4,5,5,5,5])
    
    set1.add(9)
    set1.add(5)
    set1.delete(3)
    console.log(set1.has(3))
    set1.clear()
    console.log(set1)
    console.log(set1.size)
    let arr = [1,2,3,4,5,5,6,6,3,7,'7']
    console.log(new Set([...arr]))
    
}
{
    let arr = ['add','clear','delete','hasOwnPropertySymbols','reflect','ownKeys']
    let list = new Set(arr)
    for (let [key,value] of list.entries()) {
        console.log(key,value)
    }
}

{
    let weakList = new WeakSet();
    let arg = {};
    weakList.add(arg)
    // 不能遍历，集合的值只能是对象，没有clear()方法，没有set属性
    console.log(weakList)
}
{
    let map = new Map()
    let arr = [1,2,3,'3']
    map.set(arr,456)
    console.log(map,map.get(arr))
}
{
    let map = new Map([['a',123],['b',456]])
    console.log(map.size)
    console.log(map.delete('a'),map)
    map.clear()
    console.log(map)
}
{
    let weakmap=new WeakMap();
    //key值只能是对象，没有clear()方法，没有set属性，不能遍历
    weakmap.set({},'123')
}