import { spawn } from 'node:child_process';

// const find = spawn('find', ['.', '-type', 'f'])
// const wc = spawn('wc', ['-l'])
// // 可以在多进程标准输入输出之间相互 pipe，就像我们用 Linux 命令做的那样
// find.stdout.pipe(wc.stdin)
// wc.stdout.on('data', data => {
//   console.log(`Number of files ${data}`)
// })

// spawn 不能直接按下面的方式使用，可以使用 exec 来直接执行
// const child = spawn('find . -type f | wc -l')
// child.stdout.on('data', data => {
//   console.log(`Number of files ${data}`)
// })

// 正确的使用方式如下：
const child = spawn('find . -type f | wc -l', {
  // stdio: 'pipe',
  shell: true,
  // 可以通过 cwd 选项更改脚本的工作目录。统计 ~/Downloads 文件夹下所有的文件的统计信息
  // cwd: '/Uers/samer/Downloads'
  // 可以用 env，可以指定子进程的环境变量。默认的是 process.env
  // env: {ANSWER: 42}
})
// child.stdout.on('data', data => {
//   console.log(`Number of files ${data}`)
// })
