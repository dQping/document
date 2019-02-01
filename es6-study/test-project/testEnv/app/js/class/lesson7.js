{
    let ajax = function (cb) {
        console.log('执行')
        setTimeout(() => {
            cb && cb.call()
        }, 1000);
    }
    ajax(() => {
        console.log('timeout1')
    })
}
{
    let ajax = function () {
        console.log('执行2')
        return new Promise(function (resolve, reject) {
            setTimeout(() => {
                resolve()
            }, 1000);
        })
    }
    ajax().then(() => {
        console.log('promise', 'timeout2')
    })

}
{
    let ajax = function () {
        console.log('执行3')
        return new Promise(function (resolve, reject) {
            setTimeout(() => {
                resolve()
            }, 1000);
        })
    }
    ajax()
    .then(() => {
        return new Promise(function (resolve, reject) {
            setTimeout(() => {
                resolve()
            }, 1000);
        })
    })
    .then(() => {
        console.log('promise2','timeout3')
    }).catch(function(err){
        console.log('catch',err)
    })
}
{
    function loadImg(src){
        return new Promise((resolve,reject) => {
            let img = document.createElement('img');
            img.src = src;
            img.onload = function(){
                resolve(img);
            }
            img.onerror=function(err){
                reject(err);
            }
        })
    }
    // function showImgs(imgs){
    //     imgs.forEach(function(img){
    //         document.body.appendChild(img);
    //     })
    // }
    // Promise.all([
    //     loadImg(''),
    //     loadImg(''),
    //     loadImg(''),
    // ]).then(showImgs)
    function showImgs(img){
        let p = document.createElement('p');
        p.appendChild(img);
        document.body.appendChild(p)
    }
    Promise.race([
        loadImg(''),
        loadImg(''),
        loadImg(''),
    ]).then(showImgs)
}