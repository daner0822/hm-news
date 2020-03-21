// ES6推出promise语法，解决了回调地狱的问题，但是promise的链式调用也不方便。
// ES8又推出async和await的语法：  async和await配合promise来用，非常的方便。

//async和await是两个关键字
//async 用于修饰一个函数 async function fn(){} 就是一个异步函数
//await 用于等待一个值(promise),await必须在async函数中使用才生效

// async修饰一个函数 这个函数代表异步函数

const fs = require('fs')
// 只要调用read方法，就会得到一个promise对象
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

async function fn() {
  const res = await read('a.json')
  console.log(res)
  const res2 = await read('b.json')
  console.log(res2)
  const res3 = await read('c.json')
  console.log(res3)
}
fn()
