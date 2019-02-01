{
    let str="string"
    let obj={
        name:'lili',
        age:'18'
    }
    console.log(str.includes('in'))
    console.log(str.startsWith('str'))
    console.log(str.endsWith('ing'))
    console.log(str.repeat(4))
    console.log(str.padEnd(8,'0'))
    console.log(str.padStart(8,'0'))
    console.log(`i am ${obj.name}, age ${obj.age}`)
    abc`i am ${obj.name}, age ${obj.age}`
    function abc(s,v1,v2){
        console.log(s)
        console.log(v1)
        console.log(v2)
    }
    console.log(String.raw`hi\nhao\thsgf\rss<>`)
    console.log(`hi\nhao\thsgf\rss<>`)
}
{
    console.log(String.fromCharCode('0x20bb7'))
    console.log(String.fromCodePoint('0x20bb7'))
}
{
    let str = '\u{20bb7}abc'
    
    for (let c of str) {
        console.log('es6', c)
    }
}
