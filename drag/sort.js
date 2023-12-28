const listEle = document.getElementsByClassName('list')[0]

const img = new Image()
img.src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAMAAABHPGVmAAAAJ1BMVEVHcExmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZKNJ7+AAAADHRSTlMACxwyTmmDnbTN4PJ0xPbsAAAElklEQVR42u1a22LcOghchEAC/P/fe04bO2MZR0pa56mZV601QgwX43394Af/FIgKcyn0jQwszdzDrWml76Gozbd3RJfyPAe32Eb0p60h8S0h9FFjisZ2h84PcjSc3s0cjMbPc7jW8j9Y7GkWOjgcPihiz7Ic/rA6qO2gbk9orAacfCeG0AccYvuBk1xpZ/H6N74oXFX7bke5Wd7XTFXqn+SzUrV7BESUsth5eYvwrvVrsclqMcR2PVtQG1bPCG+VPk/h2wglaLc7GBKi8SfTlG0XWNmXWG1bIHRhDDQzQg4jsDRBL2sO/NotYEiR5AjvTVV+QVv3SCxrO7wL1zgMoasVSDOQgyeWeXi7Mr1euhtCFRQDXMqtYKZ+YXtPUwh2HYqit+ZDeRye70nyGfoeejArmmFPUyYoAHd2rQqdPjbEwQHKAIWUIx/0uDeG2soUGX5AfQNAsS+CZgwNtnkBoI512JUpMk3n60n9I4EVHyyVVWNS0MJYvdSGqFP9WoEKsActmjEXGr2iU5d0wuVBQMtEF42Gw7VXRl4tjqsAqJRCOTRQO3HWmSV6Cf7GYGDt5tbboDMNZBM82D5FIpBn8kCYlksLCxZZkmBVr3qvo6RH1R4s2GauLjpEglKCA96ycGynJkyn6uI4hRFB7jhBYoFGdii9qTLkNSKHESKTsfaGiOHYONAOYTx4i3MY8W1kRqvM0mPMgtRA4g0PTjxvBSRGgyFeB9U2nO6Emd9xtwIfdIJH0tGTncCsauHZC4leohgXf142iKIsS7wkkmvSI0gIJCoxNFHzimJ8TQ4Nj6YoQq4gXRsCUxpd4lazJZmkvQtdXzPIIc4Lidz7pI4kOOSEAlFljOu6qguWOafUioWEnDu6wPE5TiRgGTgVjYFO/X4gLMZt8I7NtSHik8t06nkcAwAJcpd7YHEgkdMesuq7NsAIkrjNwlnhbdZ3oc/o2Mhhtl5YvCZBw6/LvovZ4BrOVTa3F3RTI+qqaFW/TXTcPHdJ2NdLMisD6Qos42+J1dzdusLAVHvm5fcc5DIqCKCS55yEHD1ss2iJwBKd1xO3wIOzvivbKQEPz4AWUtKtJyQ7JfXSd6Bq0Ehu3zJkPEL19aixtEgh9cm+CxcBxc7NyG8Dq74ruRRD4MmoWFOpmaWVTndRHq3SZMyDXZGGpwlSRu2gbWNKFCnLVZ+ESSpN+cVw890aOlNEnNXEhpw3MSWJlvv4HaAMXwZs5xNwgPIWpaeX3ZR/zWJ4K0ZVh9pQ46e10fJoJiN6Pa64YUwBryakAmhNuLy5gKjUfkdBxwOhVS3SNHHCApdab7/RzeOW4kUd7l9yANW2GaAzZMM0hFyDV6PG6MJQCjBP2jklfUzjphVH1SsFZLkEQmFAWBNEfXrr9i9/TGNp5hEYD/RDbQA6vnDwf/2LwNGSeqUPQ7dL/asPnNCocebIK2usJ6yTyelDn4JcaFAgQu8BkMa1PBKKYgPHQyzRtTJXaT5M0h5jORCQ9TMcuaLkNPUIoKUEgxIeQkmdA4aTj9JYIIsp0/f9f6F3601qeX0niIh+/pDyg38M/wEJ6ItUxaVpSAAAAABJRU5ErkJggg=='

// 设置子元素可拖动，（<div draggable></div>不会生效，需要设置draggable="true"才行:<div draggable="true"></div>）
Array.from(listEle.children).forEach(i => {
  i.setAttribute('draggable', true)
})

// 当前正在拖动的元素
let sourceNode

// 默认情况下拖动结束时，拖动元素会回到开始位置（默认情况下其他元素不允许别的元素拖到自身之上，拖动行为会被取消，元素只能回原始位置）
// 可以通过禁用 dragover 默认行为来解决（不能解决脱到容器外面后还是会回到初始位置的效果，sortablejs 库也没解决这个问题 😭）

// 在父元素上委托拖动事件
listEle.addEventListener('dragstart', (e) => {
  sourceNode = e.target

  e.dataTransfer.effectAllowed = 'move'
  
  // 拖动中元素会使用开始拖动时的“源拖动元素”样式（也可以手动改变拖动中样式）
  // 为了不影响拖动时的默认样式，下面添加“源拖动元素”样式需要延迟进行
  setTimeout(() => {
    // 添加“源拖动元素”样式
    // className 操作类名只能人肉自己处理，如：element.className = 'list list2'
    // classList 操作类名使用：add(), remove(), replace(), toggle()
    e.target.classList.add('moving')
  })

  // 可以手动修改拖动中元素图片
  // e.dataTransfer.setDragImage(img, 0, 0)
})

listEle.addEventListener('dragover', (e) => {
  e.preventDefault()
})

listEle.addEventListener('dragenter', e => {
  e.preventDefault()
  // 排除拖动到父元素和自己
  if ([listEle, sourceNode].includes(e.target)) {
    return
  }
  
  const children = Array.from(listEle.children)
  const sourceIndex = children.indexOf(sourceNode)
  const targetIndex = children.indexOf(e.target)
  
  // 改变元素位置

  if (sourceIndex < targetIndex) {
    // 向下拖动
    // Node.insertBefore() 方法在参考节点之前插入一个拥有指定父节点的子节点。
    // 如果给定的子节点是对文档中现有节点的引用，insertBefore() 会将其从当前位置移动到新位置
    // （在将节点附加到其他节点之前，不需要从其父节点删除该节点）
    // 如果引用节点为 null，则将指定的节点添加到指定父节点的子节点列表的末尾
    // Node.appendChild() 方法也有移动位置类似效果
    listEle.insertBefore(sourceNode, e.target.nextElementSibling)
  } else {
    // 向上拖动
    listEle.insertBefore(sourceNode, e.target)
  }
})

listEle.addEventListener('dragend', e => {
  sourceNode.classList.remove('moving')
})