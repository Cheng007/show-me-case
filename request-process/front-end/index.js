const input = document.querySelector('input')
const btn = document.querySelector('button')
const log = document.querySelector('.log')

const apiHost = 'http://127.0.0.1:3001'

input.onchange = (e) => {
  const file = e.target.files[0]
  console.log(file)
  const fd = new FormData()
  fd.append('file', file)

  const xhr = new XMLHttpRequest()
  // const url = 'https://55a5acdc-7780-451e-b1e5-568e353b4381.mdnplay.dev/zh-CN/docs/Web/API/XMLHttpRequest/progress_event/dgszyjnxcaipwzy.jpg'
  xhr.open('post', `${apiHost}/api/upload`)
  // xhr.open('post', url)

  xhr.send(fd)

  function handleEvent(e) {
    log.textContent += `${e.type}: ${e.loaded} bytes transferred \n`;
    if (e.type === 'process') {
      log.textContent += `${e.loaded}/${e.total}\n`
    }
  }

  function addListeners(xhr) {
    xhr.addEventListener("loadstart", handleEvent);
    xhr.addEventListener("load", handleEvent);
    xhr.addEventListener("loadend", handleEvent);
    xhr.addEventListener("progress", handleEvent);
    xhr.addEventListener("error", handleEvent);
    xhr.addEventListener("abort", handleEvent);
  }

  // addListeners(xhr)
  
  // 监听进度事件
  xhr.upload.addEventListener('progress', event => {
    // TODO：上传的时候这个值一直是 false
    if (event.lengthComputable) {
      const progress = (event.loaded / event.total) * 100;
      console.log(`文件上传进度：${progress}%`);
    }
  })

  xhr.addEventListener('progress', e => {
    const log = `${e.type}: ${e.loaded} bytes transferred\n`
    console.log(log)
  })

  // 监听状态变化事件
  xhr.addEventListener('readystatechange', (e) => {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        console.log('文件上传成功')
        console.log(xhr.responseText)
      } else {
        console.log('文件上传失败')
      }
    }
  });
}

btn.onclick = () => {
  // 创建 XMLHttpRequest 对象
  var xhr = new XMLHttpRequest();

  // 设置请求方法和请求 URL
  xhr.open('GET', `${apiHost}/book.txt`, true);

  // 监听 progress 事件
  xhr.addEventListener('progress', function (event) {
    if (event.lengthComputable) {
      var percentComplete = event.loaded / event.total;
      console.log('下载进度：' + Math.round(percentComplete * 100) + '%');
    }
  });

  // 设置响应类型为 blob，以便将响应数据作为二进制数据处理
  xhr.responseType = 'blob';

  // 监听 load 事件，该事件在请求成功完成时触发
  xhr.addEventListener('load', function () {
    if (xhr.status === 200) {
      console.log('文件下载成功');
      // 处理下载的文件，例如将其保存到本地或显示在页面上
      var blob = xhr.response;
      var url = URL.createObjectURL(blob);
      var a = document.createElement('a');
      a.href = url;
      a.download = 'file.zip';
      a.click();
    } else {
      console.log('文件下载失败，状态码：' + xhr.status);
    }
  });

  // 发送请求
  xhr.send();
}
