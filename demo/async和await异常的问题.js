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
  // await会等待promise成功的结果  .then(res=>{})
  // await一旦没有等到promise成功的结果 就会抛出这个异常
  // 如果要考虑到promise的异常，需要使用try..catch语法
  // 如果等到promise失败 走catch报错误信息,后面的操作不影响
  try {
    const res1 = await read('a.json')
    console.log(res1)
    const res2 = await read('bb.json')
    console.log(res3)
    const res3 = await read('c.json')
    console.log(res3)
  } catch {
    console.log('读取失败')
  }
  console.log('1213')
}
fn()
