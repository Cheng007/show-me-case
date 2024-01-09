<script setup lang="ts">
import { ref } from 'vue'

let inputValue = ref('')
let inputEventValue = ref('')

const handleInput = (e: Event) => {
  const target = e.target as HTMLInputElement
  inputEventValue.value = target.value
}

</script>

<template>
  <h1>Composition</h1>
  <p>v-model 默认已经处理了合成事件</p>
  <input v-model="inputValue" @input="handleInput" />
  <p>v-model：{{ inputValue }}</p>
  <p>input 事件：{{ inputEventValue }}</p>
</template>

<style scoped>
</style>
