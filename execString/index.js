var a = 1
function exec(code) {
  var a = 2;
  // 方法 1 同步，当前作用域
  // eval(code)

  // 方法 2 异步，全局作用域
  // setTimeout(code, 0) // 或者setInterval(code, 10000) 也能触发

  // 方法 3 同步，全局作用域
  // const script = document.createElement('script')
  // script.innerHTML = code
  // document.body.appendChild(script)

  // 方法 4 同步，全局作用域
  // const fun = new Function(code)
  // fun()

  // 方法 5 同步，全局作用域
  /**
   * HTML 元素都有能接受字符串形式 JavaScript 的 attribute，例如 `onclick`、`onfocus` 和 `onmouseenter`
    <div onclick="alert(111)">hello</div>
   */

  // const div = document.createElement('div')
  // div.setAttribute('onclick', code)
  // div.innerText = '点我触发'
  // document.body.appendChild(div)
}

exec('console.log("a", a)')
console.log('end')