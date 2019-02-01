// 方法三：
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
  
  function deepCopy(obj) {
    if(obj === null) return null
    if(typeof obj !== 'object') return obj
    if(obj instanceof RegExp) return new RegExp(obj)
    if(obj instanceof Date) return new Date(obj)
    let newObj = new obj.constructor
    for(let key in obj){
      newObj[key] = deepCopy(obj[key])
    }
    return newObj
  }
  
  let dogcopy = deepCopy(dog)
  dog.firends.push({name:"小红",sex:"母"})
  console.log(dogcopy)
  