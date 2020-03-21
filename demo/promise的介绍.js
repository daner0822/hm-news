// 在es6之前，我们写异步代码，都是伴随着回调函数，缺点：回调嵌套过多，会导致回调地狱
// ES6的时候，为了解决回调函数嵌套的问题，ES6推出了一种新的语法： Promise，现今越来越多的第三方库都是基于promise进行封装。
// 比如 axios  vant-ui

// promise是一个构造函数 Promise
// promise内部可以封装一个异步的任务,promise: 承诺
//内部有三种状态
//pending : 渲染 还没有结果
// fullfilled: 成功的状态  需要调用resolve()  就代表promise是成功的
// rejected: 失败的状态 需要调用reject() 就代表承诺失败了
// 状态的凝固： pending -----> fullfilled    pending----->rejected

//创建一个promise对象,创建一个承诺

const fs = require('fs')
const p = new Promise(function(reslove, reject) {
  fs.readFile('a.json', 'utf8', (err, data) => {
    if (err) {
      reject(err)
    } else {
      reslove(data)
    }
  })
})
// p是一个promise对象 ,通过.then可以获取到成功的结果
p.then(function(data) {
  console.log('承诺成功了')
  console.log(data)
}).catch(function(err) {
  console.log('承诺失败了')
  console.log(err)
})
