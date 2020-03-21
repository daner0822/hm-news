// 按顺序读取3个文件
const fs = require('fs')
function read(file) {
  return new Promise(function(resolve, reject) {
    fs.readFile(file, 'utf8', (err, data) => {
      if (err) {
        reject(err)
      } else {
        resolve(data)
      }
    })
  })
}

// promise 对象支持链式调用,解决回调地狱的问题
// promise可以在一个.then中返回一个新的promise对象
// 基于promise封装的语法.解决了回调函数嵌套的问题,变成链式编程
read('a.json')
  .then(res => {
    console.log(res)
    //返回一个新的promise对象
    return read('b.json')
  })
  .then(res => {
    console.log(res)
    return read('c.json')
  })
  .then(res => {
    console.log(res)
  })
  .catch(err => {
    console.log(err)
  })
