import { ref, addRefDeps } from './hook.js'
import { bindEvent } from './event.js'
import { render } from './render.js'

export const createApp = (el, { refs, methods }) => {
  const container = document.querySelector(el)
  const allNodes = container.querySelectorAll('*')

  // 添加element依赖收集
  const refSet = addRefDeps(refs, allNodes)
  render(refSet)

  bindEvent.apply(refSet, [container, methods, ['click']])
}


export { ref }
