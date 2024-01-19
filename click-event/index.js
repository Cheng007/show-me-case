const btn = document.querySelector('.btn')
let start = 0

btn.addEventListener('click', e => {
  console.log('click')
  const end = new Date().valueOf()
  console.log('duration', end - start)
})
btn.addEventListener('dblclick', e => console.log('dblclick'))

// PC端和移动端 mouse 事件
btn.addEventListener('mousedown', e => console.log('mousedown'))
btn.addEventListener('mouseup', e => console.log('mouseup'))

// 移动端 touch 事件
btn.addEventListener('touchstart', e => {
  console.log('touchstart')
  start = new Date().valueOf()
})
btn.addEventListener('touchmove', e => console.log('touchmove'))
btn.addEventListener('touchend', e => console.log('touchend'))
