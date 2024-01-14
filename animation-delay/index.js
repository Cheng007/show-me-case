const input = document.querySelector('input[type="range"]')
const rect = document.querySelector('.rect')

function setDelay() {
  rect.style.setProperty('--delay', `-${input.value}s`)
}

input.oninput = e => {
  setDelay()
}
setDelay()
