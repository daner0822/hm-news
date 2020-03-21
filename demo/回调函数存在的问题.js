//需求 按顺序读取a,b,c三个json文件
// 异步任务的问题: 如果多个异步任务需要有顺序执行,会设计回调的嵌套
// 回调地狱: 在回调函数中嵌套回调函数,就会造成回调地狱,代码难维护

const fs = require('fs')
fs.readFile('./a.json', 'utf8', (err, data) => {
  if (err) {
    console.log(err)
  } else {
    console.log(data)
    //读取完a文件 才开始读b文件
    fs.readFile('./b.json', 'utf8', (err, data) => {
      if (err) {
        console.log(err)
      } else {
        console.log(data)
        //读取完b文件 才开始读c文件
        fs.readFile('./c.json', 'utf8', (err, data) => {
          if (err) {
            console.log(err)
          } else {
            console.log(data)
          }
        })
      }
    })
  }
})
