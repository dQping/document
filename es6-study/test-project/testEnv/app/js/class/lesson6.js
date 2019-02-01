{
    let obj = {
        time: '2017-03-11',
        name: 'net',
        _r: 123
    };
    let monitor = new Proxy(obj, {
        // 拦截对象属性的读取
        get(target, key) {
            return target[key].replace('2017', '2018')
        },
        //拦截对象设置属性
        set(target, key, value) {
            if (key === 'name') {
                return target[key] = value
            } else {
                return target
            }
        },
        // 拦截 key in obj
        has(target, key) {
            if (key === 'name') {
                return target[key]
            } else {
                return false
            }
        },
        deleteProperty(target, key) {
            if (key.indexOf('_') > -1) {
                delete target[key];
                return true;
            } else {
                return target[key]
            }
        },
        //拦截 Object.keys, Object.getOwnPropertySymbols, Object.getOwnPropertyNames
        ownKeys(target) {
            return Object.keys(target).filter(item => item != 'time')
        }
    });
    // console.log(monitor.time)
    monitor.name = 'es6'
    console.log(monitor.name)
    console.log('time' in monitor)
    console.log(Object.keys(monitor))
}
{
    let obj = {
        time: '2017-03-11',
        name: 'net',
        _r: 123
    };
    console.log(Reflect.get(obj, 'time'));
    Reflect.set(obj, 'name', 'mock')
    console.log(Reflect.get(obj, 'name'))
    console.log(Reflect.has(obj, 'name'))
}
{
   
    function validator(target, validator) {
        console.log(Object.keys(target))
        return new Proxy(target, {
            _validator: validator,
            set(target, key, value, proxy) {
                
                if (target.hasOwnProperty(key)) {
                    let va = this._validator[key];
                    if (va(value)) {
                        return Reflect.set(target, key, value, proxy)
                    } else {
                        throw Error(`不能设置${key}到${value}`)
                    }
                } else {
                    throw Error(`${key}不存在`)
                }
            }
        })
    };
    const personValidators = {
        name(val) {
            return typeof val === 'string'
        },
        age(val) {
            return typeof val === 'number' && val > 18;
        }
    };
    class Person {
        constructor(name,age){
            this.name=name;
            this.age=age;
            return validator(this,personValidators)
        }
    }
    let person = new Person('lily','20')
    console.log(person.name)
    
}