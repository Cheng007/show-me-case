import { onDprChange } from './util.js'

const canvasWrap = document.querySelectorAll('ul li')
// 显示尺寸（css 样式尺寸）
const size = getComputedStyle(canvasWrap[0].querySelector('canvas')).width.replace('px', '')

function drawDefault() {
  const canvas = canvasWrap[0].querySelector('canvas')
  const infoEl = canvasWrap[0].querySelector('.placeholder')
  const ctx = canvas.getContext('2d')

  // 原始尺寸
  canvas.width = 200
  canvas.height = 200

  // 画图
  ctx.beginPath()
  const r = 80
  ctx.arc( size / 2, size / 2, r, 0, 2 * Math.PI)
  ctx.strokeStyle = '#fff'
  ctx.lineWidth = 10
  ctx.stroke()

  showInfo(infoEl, canvas)
}

function draw1() {
  const canvas = canvasWrap[1].querySelector('canvas')
  const infoEl = canvasWrap[1].querySelector('.placeholder')
  const ctx = canvas.getContext('2d')
  const dpr = window.devicePixelRatio

  // 原始尺寸：放大 DPR 倍
  canvas.width = size * dpr
  canvas.height = size * dpr

  // 画图：相关尺寸均要放大 DPR 倍
  ctx.beginPath()
  const r = 80 * dpr
  ctx.arc(size / 2 * dpr, size / 2 * dpr, r, 0, 2 * Math.PI)
  ctx.strokeStyle = '#fff'
  ctx.lineWidth = 10 * dpr
  ctx.stroke()

  showInfo(infoEl, canvas)
}

function draw2() {
  const canvas = canvasWrap[2].querySelector('canvas')
  const infoEl = canvasWrap[2].querySelector('.placeholder')
  const ctx = canvas.getContext('2d')
  const dpr = window.devicePixelRatio

  // 原始尺寸：放大 DPR 倍
  canvas.width = size * dpr
  canvas.height = size * dpr
  console.log('dpr', dpr)

  // 然后直接画布整体放大 DPR 倍
  ctx.scale(dpr, dpr)

  // 画图
  ctx.beginPath()
  const r = 80
  ctx.arc(size / 2, size / 2, r, 0, 2 * Math.PI)
  ctx.strokeStyle = '#fff'
  ctx.lineWidth = 10
  ctx.stroke()

  showInfo(infoEl, canvas)
}

function showInfo(infoEl, canvas) {
  let info = `当前 DPR：${devicePixelRatio}<br>`
  info += `当前原始宽度${canvas.width}，样式宽度${size}`
  infoEl.innerHTML = info
}

function draw() {
  drawDefault()
  draw1()
  draw2()
}

draw()

const changeHandle = () => {
  console.log('理论上每次放大缩小页面都会导致dpr变化，你可以每次放大缩小后刷新页面查看dpr验证')
  draw()
}

// 监听 dpr 变化
onDprChange(() => changeHandle())
