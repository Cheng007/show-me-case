<script setup lang="ts">
import { onBeforeMount, onBeforeUpdate, onMounted, onUpdated, ref } from 'vue'
import Reactive from './components/Reactive.vue'

let count = ref(1)
const name = ref(10)
const onClick = () => {
  count.value += 1
}
setTimeout(() => {
  count.value += 12
}, 2000)
onBeforeUpdate(() => {
  console.log('beforeUpdate', name.value)
  name.value += 12
})
onUpdated(() => {
  console.log('updated', name.value)
})
onMounted(() => {
  console.log('mounted', name.value)  
})
</script>

<template>
  响应式demo
  <div>name:{{ name }}</div>
  <button @click="onClick">Count 加 1</button>
  <Reactive :count="count" />
</template>

<style scoped>
</style>
