const button = document.querySelector('button')
const main = document.querySelector('main')
const folderWrap = document.querySelector('.folder-wrap')
const contextWrap = document.querySelector('.context-wrap')

let currentDir
// 当前选中的文件元素
let currentFileEl

// 获取文件夹信息
const getDirInfo = async (dirHandle) => {
  const res = []

  const processHandle = async (dirHandle, dirInfo, deep = 0) => {
    for await (const [_, itemHandle] of dirHandle.entries()) {
      const { kind, name } = itemHandle
      const key = `__${deep}__${name}`
      const handle = itemHandle
      if (kind === 'file') {
        dirInfo.push({ kind, name, key, handle })
      }
      if (kind === 'directory') {
        const item = { kind, name, key, children: [], handle }
        dirInfo.push(item)
        await processHandle(itemHandle, item.children, deep + 1)
      }
    }
  }

  await processHandle(dirHandle, res)

  return res
}

// 获取文件信息
const getFile = async (dirInfo, key) => {
  const getFileItem = (dirInfo) => {
    for (let i of dirInfo) {
      if (i.key === key) {
        return i
      }
      if (i?.children?.length) {
        const childrenFile = getFileItem(i.children)
        if (childrenFile) return childrenFile
      }
    }
  }
  const fileItem = getFileItem(dirInfo)
  if (fileItem) {
    return await fileItem.handle.getFile()
  }
}

// 生成文件夹内容元素
const genDir = (tree) => {
  const rootEl = document.createElement('div')
  rootEl.classList.add('folder')

  const sort = (a, b) => {
    if (a.kind < b.kind) return -1
    if (a.kind > b.kind) return 1
    return 0
  }

  tree.sort(sort).forEach(i => {
    const { kind, name, key, children } = i

    const itemEl = document.createElement('div')
    // 设置 data-key 的值
    itemEl.dataset['key'] = key

    if (kind === 'file') {
      itemEl.innerHTML = `${name}`
      itemEl.classList.add('file-name')
      rootEl.appendChild(itemEl)
    }
    if (kind === 'directory') {
      const folderName = document.createElement('div')
      folderName.innerHTML = `${name}`
      folderName.classList.add('folder-name')
      itemEl.appendChild(folderName)
      const childrenEl = genDir(children)
      itemEl.appendChild(childrenEl)
      rootEl.appendChild(itemEl)
    }
  })

  return rootEl
}

button.onclick = async () => {
  // 核心：showDirectoryPicker
  const dirHandle = await showDirectoryPicker()
  const dirInfo = await getDirInfo(dirHandle)
  const dirEl = genDir(dirInfo)
  folderWrap.replaceChildren(dirEl)
  currentDir = dirInfo
  // 显示文件
  main.style.opacity = 1
}

// 点击文件或文件夹（通过父容器事件委托）
folderWrap.onclick = async (e) => {
  console.log(e)
  const target = e.target
  const isFile = e.target.classList.contains('file-name')
  const isFolder = e.target.classList.contains('folder-name')
  // 点击了文件
  if (isFile) {
    if (currentFileEl) {
      currentFileEl.classList.remove('active')
    }
    currentFileEl = target
    currentFileEl.classList.add('active')
    // 拿到 data-key 的值
    const key = target.dataset['key']
    const file = await getFile(currentDir, key)
    const text = await file.text()
    contextWrap.textContent = text
    hljs.highlightElement(contextWrap)
  }
  // 点击了文件夹
  if (isFolder) {
    target.classList.toggle('active')
    target.nextSibling.classList.toggle('active')
  }
}
