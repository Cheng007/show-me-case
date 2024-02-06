const item = document.querySelectorAll('.wrap > *')

const defaultStyles = []
const css = {
  block: `.wrap > * { display: block; }`,
  // 可以设为 bottom top middle，不要设置为 baseline
  'vertical-align': `.wrap > * { vertical-align: bottom; }`,
  'font-size': `.wrap { font-size: 0; }`,
  'line-height': `.wrap { line-height: 0; }`
}

let addedCss = []
function addInternalStyleSheet(css) {
  const styles = document.querySelectorAll('style')
  const item = Array.from(styles).find(i => i.innerHTML === css)
  if (item) return

  const style = document.createElement('style')
  style.innerHTML = css
  document.head.appendChild(style)
  addedCss.push(css)
}

function removeInternalStyleSheet() {
  const styles = document.querySelectorAll('style')
  // 倒叙后再删除，这样在删除元素时不会影响还未处理的元素的索引
  addedCss.reverse().forEach(i => {
    const style = Array.from(styles).find(j => j.innerHTML === i)
    style.parentNode.removeChild(style)
  })
  addedCss = []
}

Array.from(item).forEach(i => {
  const va = getComputedStyle(i).verticalAlign
  console.log(i, va)
})

document.querySelector('.block').addEventListener('click', () => {
  removeInternalStyleSheet()
  addInternalStyleSheet(css.block)
})
document.querySelector('.vertical-align').addEventListener('click', () => {
  removeInternalStyleSheet()
  addInternalStyleSheet(css['vertical-align'])
})
document.querySelector('.font-size').addEventListener('click', () => {
  removeInternalStyleSheet()
  addInternalStyleSheet(css['font-size'])
})
document.querySelector('.line-height').addEventListener('click', () => {
  removeInternalStyleSheet()
  addInternalStyleSheet(css['line-height'])
})

