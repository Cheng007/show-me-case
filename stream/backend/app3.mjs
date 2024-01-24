import express from "express";

const app = express();
const port = 3001;

// CORS
app.use('/api/*', (req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  // 简单请求的 Content-Type 不包含application/json，只包含：application/x-www-form-urlencoded, multipart/form-data, 或者 text/plain
  // res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
  next()
})

app.get("/api/answer", (req, res) => {
  // res.writeHead(200, {
  //   // Transfer-Encoding: 设置传输编码为 chunked，以启用流式传输
  //   // 'Transfer-Encoding': 'chunked'
  // });

  res.write('start')
  const interval = setInterval(() => {
    res.write(`${new Date().toLocaleDateString()}`);
  }, 1000);

  setTimeout(() => {
    clearInterval(interval);
    res.write("end");
    res.end();
  }, 10 * 1000);
});

// server send event
app.get('/api/sse', (req, res) => {
  res.writeHead(200, {
    // Content-Type MIME 必须指定为 text/event-stream
    "Content-Type": "text/event-stream",
    // 会自动带上这个头
    // 'Transfer-Encoding': 'chunked'
  })

  // 事件流是一个简单的文本数据流，文本应该使用 UTF-8 格式的编码。事件流中的消息由一对换行符(\n\n)分开。
  // 以冒号开头的行为注释行，会被忽略。注释行可以用来防止连接超时，服务器可以定期发送一条消息注释行，以保持连接不断
  // 每条消息由一行或多行文字组成，格式如：[field]: value\n
  // 规范中 field 可以取的值为：event,data,id,retry
  // event: 服务器可以自定义事件名，默认是 message 事件
  // data: 数据内容
  // id: 每条数据编号，浏览器可以通过 lastEventId 读取这个值，浏览器再重联的时候会带上 Last-Event-Id 头字段
  // retry: 指定浏览器重新发起连接的时间间隔，毫秒，整数，两种情况会导致浏览器重新发起连接：一种是时间间隔到期，二是由于网络错误等原因，导致连接出错。

  res.write('retry: 10000\n')
  res.write('id: msgid\n')
  res.write('event: chengevent\n')
  

  const interval = setInterval(() => {
    const d = { date: new Date().toLocaleTimeString() }
    res.write(`data: ${JSON.stringify(d)}\n\n`)
  }, 2 * 1000)

  // 停止推送消息，模拟前端连接出错后重连场景
  setTimeout(() => {
    clearInterval(interval)
    res.end()
  }, 10 * 1000)
})

app.listen(port);
console.log("Express started on port 3001");
