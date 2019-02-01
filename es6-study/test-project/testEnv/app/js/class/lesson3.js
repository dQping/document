{
    let arr = Array.of(3, 4, 7, 9, 11);
    console.log(arr)

    let ps = document.querySelectorAll('p');
    let parr = Array.from(ps);
    parr.forEach((item, index) => {
        console.log(item.textContent, '----', index)
    })

    console.log(Array.from([1, 3, 5], item => item * 2))
    
    console.log([1,2,undefined,4,5].fill(7))
    console.log(['a','b','c','d','e'].fill(7,2,3))
}
{
    for (let index of ['1','c','ks'].keys()){
        console.log(index)
    }
    for (let value of ['1','c','ks'].values()){
        console.log(value)
    }
    for (let [key,value] of ['1','c','ks'].entries()){
        console.log(key,value)
    }
}
{
    console.log([1,2,3,4,5,6].copyWithin(0,3,5))
    
    console.log([1,2,3,4,5,6].find(item => item > 3))
    console.log([1,2,3,4,5,6].findIndex(item => item > 3))
}

{
    console.log([1,2,3,NaN].includes(NaN))
}
{
    
}