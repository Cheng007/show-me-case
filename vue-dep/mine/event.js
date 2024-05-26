export function bindEvent(el, methods, events = ['click']) {
  console.log(this)
  events.forEach(event => {
    const eventAttribute = `@${event}`
    const callback = (e) => {
      const methodName = e.target.getAttribute(eventAttribute)
      if (methodName) {
        methods?.[methodName]?.apply(this)
      }
    }
    el.addEventListener(event, callback, true)
  })
}