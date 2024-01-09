<template>
  <div>
    <h1>Composition 合成事件</h1>
    <p>v-model 默认已经处理了合成事件</p>
    <input v-model="inputModel" @input="handleInput" />
    <p>v-model: {{ inputModel }}</p>
    <p>@input: {{ inputEventValue }}</p>
  </div>
</template>
<script>
export default {
  name: 'CompositionCase',
  data() {
    return {
      inputModel: '',
      inputEventValue: ''
    }
  },
  methods: {
    handleInput(e) {
      this.inputEventValue = e.target.value
    }
  },
}
</script>