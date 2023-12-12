const filePath = './book.txt'
const statusEle = document.getElementById('status')

// 传统方式直接等下载完后处理
async function getBigFile() {
  statusEle.innerText = '开始请求\n'
  const time = +new Date()
  const res = await fetch(filePath)
  const time1 = +new Date()
  statusEle.innerText += `已经拿到header里的信息(${time1 - time}ms)，准备获取 body 里的内容\n`
  
  const text = await res.text()
  const time2 = +new Date()
  statusEle.innerText += `body内容已获取(${time2 - time1}ms)，准备渲染\n`

  const div = document.createElement('div')
  div.innerText = text
  div.style.color = 'gray'
  document.body.appendChild(div)
  const time3 = +new Date()
  statusEle.innerText += `渲染完毕(${time3 - time2}ms)\n\n`
}

// 分块读取
async function getBigFileChunk() {
  statusEle.innerText = '开始请求\n'
  const time = +new Date()
  const res = await fetch(filePath)
  const time1 = +new Date()
  statusEle.innerText += `已经拿到header里的信息(${time1 - time}ms)，准备获取 body 里的内容\n`

  // 分块读取body内容
  const reader = res.body.getReader()

  const div = document.createElement('div')
  div.innerText = ''
  div.style.color = 'gray'

  document.body.appendChild(div)

  // 接口表示一个文本解码器，一个解码器只支持一种特定文本编码，例如 UTF-8、ISO-8859-2、KOI8-R、GBK，等等。
  // 解码器将字节流作为输入，并提供码位流作为输出
  const decoder = new TextDecoder()

  let isDone = false
  while(!isDone) {
    // value is Uint8Array type
    const { value, done } = await reader.read()
    const text = decoder.decode(value)
    // 粘包问题可能导致乱码
    // console.log('粘包问题可能导致乱码', text.slice(-5))
    div.innerText += text
    isDone = done
  }
}

// 分块读取，处理乱码问题
async function getBigFileChunk2() {
  statusEle.innerText = '开始请求\n'
  const time = +new Date()
  const res = await fetch(filePath)
  const time1 = +new Date()
  statusEle.innerText += `已经拿到header里的信息(${time1 - time}ms)，准备获取 body 里的内容\n`

  const reader = res.body.getReader()

  const div = document.createElement('div')
  div.innerText = ''
  div.style.color = 'gray'

  document.body.appendChild(div)

  // 接口表示一个文本解码器，一个解码器只支持一种特定文本编码，例如 UTF-8、ISO-8859-2、KOI8-R、GBK，等等。
  // 解码器将字节流作为输入，并提供码位流作为输出
  const decoder = new TextDecoder()

  let remainChunk = new Uint8Array(0)

  let isDone = false
  while(!isDone) {
    // value is Uint8Array type
    const { value, done } = await reader.read()


    // 以某个特定字符作为标志截断，一般为换行（\n）或回车(\r)
    const code = `\n`.codePointAt()
    // const code = `\n`.charCodeAt() // 也行

    const lastIndex = value.lastIndexOf(code)
    const chunk = value.slice(0, lastIndex)
    const readChunk = new Uint8Array(remainChunk.length + chunk.length)
    readChunk.set(remainChunk)
    readChunk.set(chunk, remainChunk.length)
    remainChunk = value.slice(lastIndex)
    
    const text = decoder.decode(readChunk)
    div.innerText += text
    isDone = done
  }
}

// getBigFile()
getBigFileChunk2()
