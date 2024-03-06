const content = document.querySelector('.content')
const infoWrap = document.createElement('div')
document.body.append(infoWrap)

function getWidthInfo() {
  const { offsetWidth, scrollWidth, clientWidth } = content
  return {
    offsetWidth,
    scrollWidth,
    clientWidth,
    computedWidth: getComputedStyle(content).width,
    styleWidth: content.style.width,
    boundingClientRectWidth: content.getBoundingClientRect().width
  }
}

function showWidthInfo() {
  const widthInfo = getWidthInfo()
  const widthHtml = Object.keys(widthInfo).reduce((prev, cur) => {
    return prev += `<p>${cur}: ${widthInfo[cur]}</p>`
  }, '')
  infoWrap.innerHTML = widthHtml
}

showWidthInfo()

addEventListener('resize', showWidthInfo)
