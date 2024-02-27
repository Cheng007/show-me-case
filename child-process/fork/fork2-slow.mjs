import http from "node:http";
import { longTask } from './long-task.mjs'

const server = http.createServer();

server.on("request", (req, res) => {
  if (req.url === "/compute") {
    const sum = longTask();
    return res.end(`Sum is ${sum}`);
  } else {
    // 阻塞其他请求
    res.end("Ok");
  }
});
server.listen(3000);
console.log('app listen at 3000')

// 这个程序有一个很大的问题，当请求 /compute 时，服务器将不能处理其他的请求，因为事件循环在忙于长循环操作。
// 根据长循环操作的本质有好几种解决办法，但其中一个适合所有操作的解决方案是用 frok 将计算操作放到另一个进程中。
