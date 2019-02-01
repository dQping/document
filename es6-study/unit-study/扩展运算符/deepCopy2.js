// 方法二：
function deepCopy(fromObj,toObj) { // 深拷贝函数
  // 容错
  if(fromObj === null) return null // 当fromObj为null
  if(fromObj instanceof RegExp) return new RegExp(fromObj) // 当fromObj为正则
  if(fromObj instanceof Date) return new Date(fromObj) // 当fromObj为Date

  toObj = toObj || {}
  
  for(let key in fromObj){ // 遍历
    if(typeof fromObj[key] !== 'object'){ // 是否为对象
      toObj[key] = fromObj[key] // 如果为普通值，则直接赋值
    }else{
      if(fromObj[key] === null){
        toObj[key] = null
      }else{
        toObj[key] = new fromObj[key].constructor // 如果为object，则new这个object指向的构造函数
        deepCopy(fromObj[key],toObj[key]) // 递归          
      }
    }
  }
  return toObj
}

let dog = {
  name:"小白",
  sex:"公",
  firends:[
    {
      name:"小黄",
      sex:"母"
    }
  ]
}

let dogcopy = deepCopy(dog)
// 此时我们把dog的属性进行增加
dog.firends.push({name:"小红",sex:"母"})
console.log(dog) // { name: '小白',
                      sex: '公',
                      firends: [ { name: '小黄', sex: '母' }, { name: '小红', sex: '母' } ] }
// 当我们打印dogcopy，会发现dogcopy不会受dog的影响
console.log(dogcopy) // { name: '小白',
                          sex: '公',
                          firends: [ { name: '小黄', sex: '母' } ] }

