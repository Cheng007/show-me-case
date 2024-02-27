import { exec } from 'node:child_process'

// exec 会创建 shell，命令的输出放到缓冲区，并且将整个输出值传递给一个回调（exec 函数的第二个参数，而不是像 spawn 那样使用流）
// 如果你想要使用 shell 语法并且运行命令输出的所期望的数据比较小，建议使用 exec 函数（记住，exec 在返回结果数据之前，会在内存中缓存整个数据）。
// 如果期望的数据很大，那么建议使用 spawn 函数，因为数据可以被标准的 IO 对象流化（streamed）

// 相对于../spawn/spawn3.mjs 因为 exec 函数会使用 shell 去执行命令，因此我们可以直接使用 shell 语法代替 pipe 特性。
exec('find . -type f | wc -l', (err, stdout, strerr) => {
  if (err) {
    console.error(`exec error: ${err}`)
    return
  }

  console.log(`Number of files ${stdout}`)
})

// 注意，如果你执行外部提供的任何类型的动态输入，使用 shell 语法是有安全风险的。
// 用户使用 像 ；的shell 语法字符和 $ 来进行命令注入攻击（例如：command + `; rm -rf ~`）
