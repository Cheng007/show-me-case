import { spawn } from 'node:child_process'

const child = spawn('node', ['./timer.mjs'], {
  // 子进程配置 detached，可以使子进程独立于它的父进程运行
  detached: true,
  stdio: 'ignore'
})
// 解绑的进程上面调用 unref 函数，父进程可以独立于子进程退出
// 如果子进程在运行一个长时间的任务，这将非常有用
child.unref()
