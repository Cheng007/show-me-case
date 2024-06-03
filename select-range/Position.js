const defaultRange = {
  start: {
    x: 0,
    y: 0,
  },
  end: {
    x: 0,
    y: 0
  }
}

export default class Position {
  #range = structuredClone(defaultRange)
  
  get() {
    return this.#range
  }

  start({ x, y }) {
    this.#range.start = { x, y }
  }

  end({ x, y }) {
    this.#range.end = {x, y}
  }

  reset() {
    this.#range = structuredClone(defaultRange)
  }

  // 目标区间是否和当前区间相交
  isIntersect(range) {
    const { start: { x: sx1, y: sy1 }, end: { x: ex1, y: ey1 } } = this.#range
    const { start: { x: sx2, y: sy2 }, end: { x: ex2, y: ey2 } } = range

    const [ax1, ax2] = [Math.min(sx1, ex1), Math.max(sx1, ex1)]
    const [bx1, bx2] = [Math.min(sx2, ex2), Math.max(sx2, ex2)]
    const [ay1, ay2] = [Math.min(sy1, ey1), Math.max(sy1, ey1)]
    const [by1, by2] = [Math.min(sy2, ey2), Math.max(sy2, ey2)]

    const isIntersectX = !(bx1 > ax2 || ax1 > bx2)
    const isIntersectY = !(by1 > ay2 || ay1 > by2)
    return isIntersectX && isIntersectY
  }
}