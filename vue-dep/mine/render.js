export function render(refs) {
  for (let key in refs) {
    const ref = refs[key]
    // 更新内容
    update(ref)
  }
}

// 遍历deps里的元素，并设置其内容为当前的值
export function update({ deps, value }) {
  // 遍历deps里的元素，并设置其内容为当前的值
  deps.forEach(el => {
    el.textContent = value
  })
}
