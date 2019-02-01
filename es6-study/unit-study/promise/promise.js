function Promise(executor) {
    let self = this;
    self.value = undefined; 
    self.reason = undefined; 
    self.status = 'pending';
    self.onResolvedCallbacks = [];
    self.onRejectedCallbacks = [];
    function resolve(value) { 
        if (self.status === 'pending') {
            self.value = value;
            self.status = 'resolved';
            self.onResolvedCallbacks.forEach(fn => fn());
        }
    }
    function reject(reason) { 
        if (self.status === 'pending') {
            self.reason = reason;
            self.status = 'rejected';
            self.onRejectedCallbacks.forEach(fn => fn());
        }
    }
    try {
        executor(resolve, reject);
    } catch (e) { 
        reject(e);
    }
}
function resolvePromise(promise2,x,resolve,reject){
    if(promise2 === x){
        return reject(new TypeError('Chaining cycle'));
    }
    let called;
    if(x!==null && (typeof x=== 'object' || typeof x === 'function')){
        try{
            let then = x.then; 
            if(typeof then === 'function'){
                then.call(x,y=>{ 
                    if(called) return; 
                    called = true;
                    resolvePromise(promise2,y,resolve,reject);
                },err=>{ 
                    if(called) return;
                    called = true;
                    reject(err);
                });
            }else{
                resolve(x);
            }
        }catch(e){
            if(called) return;
            called = true;
            reject(e);
        }
    }else{ 
        resolve(x);
    }
}
Promise.prototype.then = function (onFulfilled, onRejected) {
    onFulfilled = typeof onFulfilled === 'function'?onFulfilled:val=>val;
    onRejected = typeof onRejected === 'function'?onRejected: err=>{throw err}
    let self = this;
    let promise2;
    promise2 = new Promise((resolve, reject) => {
        if (self.status === 'resolved') {
            setTimeout(()=>{
                try {
                    let x = onFulfilled(self.value);
                    resolvePromise(promise2,x,resolve,reject);
                } catch (e) {
                    reject(e);
                }
            },0)
        }
        if (self.status === 'rejected') {
            setTimeout(()=>{
                try {
                    let x = onRejected(self.reason);
                    resolvePromise(promise2,x,resolve,reject);
                } catch (e) {
                    reject(e);
                }
            },0)
        }
        if (self.status === 'pending') {
            self.onResolvedCallbacks.push(() => {
                setTimeout(()=>{
                    try {
                        let x = onFulfilled(self.value);
                        resolvePromise(promise2,x,resolve,reject);
                    } catch (e) {
                        reject(e);
                    }
                },0)
            });
            self.onRejectedCallbacks.push(() => {
                setTimeout(()=>{
                    try {
                        let x = onRejected(self.reason);
                        resolvePromise(promise2,x,resolve,reject);
                    } catch (e) {
                        reject(e);
                    }
                },0)
            });
        }
    });
    return promise2
}
Promise.defer = Promise.deferred = function(){
    let dfd = {};
    dfd.promise = new Promise((resolve,reject)=>{
        dfd.resolve = resolve;
        dfd.reject = reject;
    })
    return dfd;
}
Promise.reject = function(reason){
    return new Promise((resolve,reject)=>{
        reject(reason);
    })
}
Promise.resolve = function(value){
    return new Promise((resolve,reject)=>{
        resolve(value);
    })
}
Promise.prototype.catch = function(onRejected){
    return this.then(null,onRejected);
};
Promise.all = function(promises){
    return new Promise((resolve,reject)=>{
        let arr = [];
        let i = 0;
        function processData(index,data){
            arr[index] = data;
            if(++i == promises.length){
                resolve(arr);
            }
        }
        for(let i = 0;i<promises.length;i++){
            promises[i].then(data=>{ 
                processData(i,data);
            },reject);
        }
    })
}
Promise.race = function(promises){
    return new Promise((resolve,reject)=>{
        for(let i = 0;i<promises.length;i++){
            promises[i].then(resolve,reject);
        }
    })
}
module.exports = Promise;