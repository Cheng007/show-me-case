const btn = document.querySelector('.btn')
const sse = document.querySelector('.sse')
const main = document.querySelector('main')

sse.addEventListener('click', () => {
  main.innerHTML = ''

  const source = new EventSource('http://127.0.0.1:3001/api/sse');
  source.onopen = (e) => console.log('open 连接已建立', e)
  source.onmessage = (event) => {
    console.log(event);
    main.innerHTML += `<div>${event.data}</div>`
  };
  source.onerror = (e) => console.log('error', e)
  
  // 服务器自定义事件，通过 addEventListener 来监听
  source.addEventListener('chengevent', e => {
    console.log('chengevent event', e)
  })

  // 关闭连接
  // source.close()
})

btn.addEventListener('click', () => {
  main.innerHTML = ''
  fetch('http://127.0.0.1:3001/api/stream').then(async res => {
    const reader = res.body.getReader()
    let isDone = false
    const decoder = new TextDecoder()
    while(!isDone) {
      const { value, done } = await reader.read()
      const text = decoder.decode(value)
      main.innerHTML += `<div>${text}</div>`
      isDone = done
    }
  })
})