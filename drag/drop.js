let sourceNode
const dropWrap = document.getElementsByClassName('drop-wrap')[0]
const dropableElement = document.querySelectorAll('td[data-drop="true"]')
const deleteArea = document.getElementsByClassName('delete-area')[0]

const removeDropEnterClass = () => {
  dropableElement.forEach(i => i.classList.remove('enter'))
}
const getDropNode = (node) => {
  while(node) {
    if (node?.dataset?.drop === 'true') {
      return node
    } else {
      node = node.parentNode
    }
  }
}

dropWrap.addEventListener('dragstart', (e) => {
  sourceNode = e.target
  const effectAllowed = getDropNode(sourceNode) ? 'move' : 'copy'

  // none-不允许操作 copy-只复制 move-只移动 link-只链接 
  // copyMove-复制或移动 copyLink-复制或链接 linkMove-链接或移动 all-复制移动链接（默认）
  e.dataTransfer.effectAllowed = effectAllowed

  // move 样式
  if (effectAllowed === 'move') {
    setTimeout(() => {
      sourceNode.classList.add('moving')
      deleteArea.classList.add('moving')
    })
  }
})

// dragover 触发频率很高
dropWrap.addEventListener('dragover', e => {
  // 阻止默认行为以允许放置
  e.preventDefault()
})

// dragenter 进入时只会触发一次
dropWrap.addEventListener('dragenter', e => {
  // 先清掉原先其他地方的样式
  removeDropEnterClass()
  
  // 设置可以放置的样式
  if (getDropNode(e.target)) {
    e.target.classList.add('enter')
  }
})

// drop 事件在元素或文本选择被放置到有效的放置目标上时触发
// 为确保 drop 事件始终按预期触发，应当在处理 dragover 事件的代码部分始终包含 preventDefault() 调用
dropWrap.addEventListener('drop', e => {
  // 阻止默认行为（会作为某些元素的链接打开）
  e.preventDefault();

  const effectAllowed = e.dataTransfer.effectAllowed
  const targetDropNode = getDropNode(e.target)

  // 非drop区
  if (!targetDropNode) {
    // 移到删除里面
    if (effectAllowed === 'move' && e.target === deleteArea) {
      sourceNode.remove()
      deleteArea.classList.remove('moving')
    }
    return
  }

  // 将学科复制到课表
  if (effectAllowed === 'copy') {
    targetDropNode.replaceChildren(sourceNode.cloneNode(true))
  }
  // 移动
  if (effectAllowed === 'move' && e.target !== sourceNode) {
    targetDropNode.replaceChildren(sourceNode)
  }
})

dropWrap.addEventListener('dragend', (e) => {
  removeDropEnterClass()
  sourceNode.classList.remove('moving')
  deleteArea.classList.remove('moving')
})
