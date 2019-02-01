{
    function test(x, y = 'world') {
        console.log(x, y)
    }
    test('hello', 'kill')
    let x = 'test'
    const test1 = (c, y = x) => {
        console.log(c, y)
    }
    test1('double')
}
{
    function test2(...arg) {
        for (let stt of arg) {
            console.log(stt)
        }
    }

    console.log(4, ...[1, 1, 2, 4])
    function fx(...arg) {
        return test2(...arg)
    }
    fx('a1', 'bb2', 'cc2', 'dd4')
}
{
    let o = 1;
    let a = 'b';
    let es6 = {
        o,
        [a]: 'c'
    }
    console.log(Object.is('abc', 'abc'))
    console.log(Object.is([], []))
    console.log('拷贝', Object.assign({ a: 'a' }, { b: 'b' }))

    for (let [key, value] of Object.entries(es6)) {
        console.log([key, value])
    }
}
{
    //let {a,b,...c} = {a:'test',b:'kill',c:'ddd',d:'ccc'}
    let [a,b,...c] = ['test','kill','ddd','ccc']
    console.log(c)
}