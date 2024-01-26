const inputFile = document.querySelector('input[type="file"]')
const range = document.querySelector('input[type="range"]')
const btn = document.querySelector('button')

const apiHost = 'http://127.0.0.1:3001'

// 上传
inputFile.onchange = (e) => {
  const file = e.target.files[0]
  const fd = new FormData()
  fd.append('file', file)

  const xhr = new XMLHttpRequest()
  xhr.open('post', `${apiHost}/api/upload`)

  // 监听上传进度事件
  xhr.upload.addEventListener('progress', e => {
    if (e.lengthComputable) {
      const percent = Math.round(e.loaded / e.total * 100);
      range.value = percent
      console.log(`文件上传进度：${percent}%`)
    }
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

  // 监听后再 send
  xhr.send(fd)
}

// 下载
btn.onclick = () => {
  // 创建 XMLHttpRequest 对象
  var xhr = new XMLHttpRequest();

  // 设置请求方法和请求 URL
  xhr.open('GET', `${apiHost}/book.txt`, true);

  // 监听 progress 事件
  xhr.addEventListener('progress', function (e) {
    if (e.lengthComputable) {
      const percent = Math.round(e.loaded / e.total * 100);
      range.value = percent
      console.log(`文件下载进度：${percent}%`)
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
