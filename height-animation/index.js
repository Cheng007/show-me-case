const ele = document.querySelector('#container')
const btn = document.querySelector('input[type="checkbox"]')

const toggleAnimation = (checked) => {
  ele.style.transition = 'height 0.3s'
  ele.style.overflow = 'hidden'

  // 显示，display none -> block
  if (checked) {
    ele.style.display = 'block'
    ele.style.height = 'auto'
    const { height } = ele.getBoundingClientRect()

    ele.style.height = 0

    // 需要触发重排以便后续设置为实际高度能生效（触发重排有很多方式，这里随便选取了一种）
    // 重点：没有下面的代码，不会有动画，会直接跳到最终高度数值
    ele.offsetHeight

    ele.style.height = height + 'px'
  } else {
    // 隐藏，display block -> none
    ele.style.height = 'auto'
    const { height } = ele.getBoundingClientRect()
    ele.style.height = height + 'px'

    // 需要触发重排以便后续设置为实际高度能生效（触发重排有很多方式，这里随便选取了一种）
    // 重点：没有下面的代码，不会有动画，会直接跳到最终高度数值
    ele.offsetHeight
    
    // 重置元素高度为0
    ele.style.height = 0

    const endHandle = () => {
      ele.style.display = 'none'
      ele.removeEventListener('transitionend', endHandle)
    }

    ele.addEventListener('transitionend', endHandle)
  }
}

btn.addEventListener('change', e => {
  const checked = e.target.checked
  toggleAnimation(checked)
})

