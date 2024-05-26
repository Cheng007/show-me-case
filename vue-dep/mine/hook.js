import { Ref } from './ref.js'

const regexpVar = /\{\{(.+)\}\}/

export function ref(defaultValue) {
  return new Ref(defaultValue)
}

export function addRefDeps(refs, nodes) {
  nodes.forEach(node => {
    if (regexpVar.test(node.textContent)) {
      const refKey = node.textContent.match(regexpVar)?.[1]?.trim()
      refs[refKey].deps.add(node)
    }
  })

  return refs
}

