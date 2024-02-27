import { spawn } from 'node:child_process';

// 子进程执行了 wc 命令，是一个计算行数，单词数，和字母数的Linux 命令
const child = spawn("wc");

// 将主进程的 stdin（是可读流）pipe 到子进程的 stdin（是一个可读流）。结合的结果是我们得到了一个标准的输入模式
process.stdin.pipe(child.stdin);

child.stdout.on("data", (data) => {
  console.log(`child stdout: ${data}`);
});

// 使用node命令启动后，输入文字，
// 使用 Ctrl + D 输入文件结束标志
