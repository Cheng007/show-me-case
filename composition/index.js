const input = document.querySelector('input')
const inputValue = document.getElementById('inputValue')
const composedValue = document.getElementById('composedValue')

let isComposition = false

input.addEventListener('input', e => {
  console.log('input', e)
  inputValue.innerHTML = e.target.value
  if (!isComposition) {
    composedValue.innerHTML = e.target.value
  }
})

// 合成事件开始
input.addEventListener('compositionstart', e => {
  isComposition = true
  console.log('compositionstart', e)
})

// 合成事件结束
input.addEventListener('compositionend', e => {
  isComposition = false
  console.log('compositionend', e)
  composedValue.innerHTML = e.target.value
})
