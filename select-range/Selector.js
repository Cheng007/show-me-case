import Position from './Position.js'

function setStyle(ele, styleInfo = {}) {
  ele.style = Object.keys(styleInfo).reduce(
    (prev, cur) => {
      return `${prev}${cur}: ${styleInfo[cur]};`
    },
    ''
  )
}

const rectAreaCommonStyle = {
  position: 'fixed',
  'user-select': 'none'
}

export default class Selector {
  #targetEle = []
  // 方形框，标识框选区域
  #rectAreaEle
  #elementRectInfo = []
  #isStart = false
  #position = new Position()

  constructor({ targetEle, rectAreaClass }) {
    this.#targetEle = Array.isArray(targetEle) ? targetEle : [targetEle]
    this.getElementRectInfo()
    this.addListener()
    this.initRectEle(rectAreaClass)
  }

  initRectEle(rectAreaClass) {
    const ele = document.createElement('div')
    setStyle(ele, {
      ...rectAreaCommonStyle,
      display: 'none',
      left: '-999px',
      top: '-999px',
    })
    if (rectAreaClass) {
      ele.classList.add(rectAreaClass)
    }
    document.body.appendChild(ele)
    this.#rectAreaEle = ele
  }

  getElementRectInfo() {
    this.#elementRectInfo = this.#targetEle.map(i => {
      const {x, y, width, height} = i.getBoundingClientRect()
      const start = {
        x,
        y
      }
      const end = {
        x: x + width,
        y: y + height
      }
      return { range: {start, end}, el: i }
    })
  }

  setRectAreaStyle(isEnd) {
    const { start: {x: sx, y: sy}, end: {x: ex, y: ey} } = this.#position.get()
    const { innerWidth, innerHeight } = window
    const horizontal = ex - sx > 0 ? 'left' : 'right'
    const vertical = ey - sy > 0 ? 'top' : 'bottom'

    setStyle(this.#rectAreaEle, {
      display: isEnd ? 'none' : 'block',
      ...rectAreaCommonStyle,
      width: Math.abs(ex - sx) + 'px',
      height: Math.abs(ey - sy) + 'px',
      [horizontal]: `${horizontal === 'left' ? sx : innerWidth - sx}px`,
      [vertical]: `${vertical === 'top' ? sy : innerHeight - sy}px`,
    })
  }

  update({ x, y }, isEnd = false) {
    requestAnimationFrame(() => {
      this.#position.end({ x, y })
      this.#elementRectInfo.forEach(i => {
        const { range, el } = i
        const isIntersect = this.#position.isIntersect(range)
        isIntersect ? el.classList.add('selected') : el.classList.remove('selected')
      })
      this.setRectAreaStyle(isEnd)
    })
  }

  start = (e) => {
    this.#position.start(e)
    this.#isStart = true
  }

  move = (e) => {
    if (!this.#isStart) return
    this.update(e)
  }

  end = (e) => {
    this.update(e, true)
    this.#isStart = false
  }

  addListener() {
    document.addEventListener('mousedown', this.start)
    document.addEventListener('mousemove', this.move)
    document.addEventListener('mouseup', this.end)
  }

  destory() {
    document.removeEventListener('mousedown', this.start)
    document.addEventListener('mousemove', this.move)
    document.removeEventListener('mouseup', this.end)
    document.removeChild(this.#rectAreaEle)
  }
}
