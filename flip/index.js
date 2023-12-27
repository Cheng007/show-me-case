const list = document.getElementsByClassName('list')[0]
const btn = document.getElementsByTagName('button')[0]

// 得到一个两数之间的随机整数，包括两个数在内
const random = (min, max) => {
  min = Math.floor(min)
  max = Math.ceil(max)
  return Math.floor((max - min + 1) * Math.random()) + min
}

btn.addEventListener('click', () => {
  let before = []
  
  // First 记录初始状态
  Array.from(list.children).forEach(el => {
    // 返回值是一个 DOMRect 对象, 除了 width 和 height 以外的属性是相对于视图窗口的左上角来计算的
    const bcr = el.getBoundingClientRect()
    const weakMap = new WeakMap()
    weakMap.set(el, bcr)
    before.push(weakMap)
  })

  // 随机切换位置
  Array.from(list.children).forEach(el => {
    const randomNum = random(0, list.children.length - 1)
    list.insertBefore(el, list.children[randomNum])
  })

  Array.from(list.children).forEach(el => {
    // Last 记录最终位置
    const bcr = el.getBoundingClientRect()
    const beforeMap = before.find(j => j.has(el))
    const beforeBcr = beforeMap.get(el)

    // Invert反转元素到起始位置
    const y = beforeBcr.y - bcr.y
    el.style.transform = `translateY(${y}px)`

    // Play 播放动画同步到适当位置
    requestAnimationFrame(() => {
      el.style.transition = 'transform 0.3s'
      el.style.removeProperty('transform')
    })

    // 动画结束后清除transition
    el.addEventListener('transitionend', () => {
      el.style.removeProperty('transition')
    })
  })
})

