import http from "node:http";
import { fork } from 'node:child_process'

const server = http.createServer();

server.on("request", (req, res) => {
  if (req.url === "/compute") {
    console.log('start at:', new Date().toLocaleTimeString())
    const child = fork('./child-long-task.mjs')
    child.send('start')
    child.on('message', sum => {
      res.end(`Sum is ${sum}`)
    })
  } else {
    // 不阻塞其他请求
    res.end("Ok");
  }
});
server.listen(3000);
console.log('app listen at 3000')

