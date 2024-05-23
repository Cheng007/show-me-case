/**
 * 监听 dpr 变化
 * @param {(dpr: number) => void} callback dpr变化回调
 * @description
 * dpr: devicePixelRatio
 * window.devicePixelRatio 的变化没有事件监听器，
 * 但可以通过监听媒体查询变化方式来实现，
 * 参见：https://developer.mozilla.org/zh-CN/docs/Web/API/Window/devicePixelRatio
 * 下面是 MDN 中文翻译上的老代码实现方案：
 *     let mqString = `(resolution: ${window.devicePixelRatio}dppx)`;
 *     matchMedia(mqString).addEventListener('change', changeHandle)
 * 经放大缩小窗口多次验证测试，上面的方式不能 100% 触发change事件
 * 英文版有如下说法：
 * Note that every time the resolution changes, the example has to create a new media query, based on the new resolution, and a new MediaQueryList instance.
 * 参见：https://developer.mozilla.org/en-US/docs/Web/API/Window/devicePixelRatio
 */
function onDprChange(callback) {
  let remove = null
  function updatePixelRatio() {
    if (remove !== null) {
      remove()
    }

    const mqString = `(resolution: ${window.devicePixelRatio}dppx)`;
    const media = matchMedia(mqString);
    media.addEventListener('change', updatePixelRatio)
    remove = () => {
      media.removeEventListener('change', updatePixelRatio)
    }
    callback?.(window.devicePixelRatio)
  }

  updatePixelRatio()
}

export { onDprChange }