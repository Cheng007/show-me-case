import { update } from './render.js'

export class Ref {
  #defaultValue = null
  #value = null
  deps = new Set()
  constructor(defaultValue) {
    this.#defaultValue = defaultValue
    this.#value = defaultValue
  }

  get value() {
    return this.#value
  }

  set value(newValue) {
    this.#value = newValue
    update(this)
  }

  $reset() {
    this.value = this.#defaultValue
  }
}