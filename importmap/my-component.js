import { ref } from 'vue'

export default {
  name: 'MyComponent',
  setup() {
    const message = ref('hello Vue!')
    return { message }
  },
  template: `
    <div class="my-component">
      <div class="my-component__message">
        {{ message }}
      </div>
    </div>
  `
}
