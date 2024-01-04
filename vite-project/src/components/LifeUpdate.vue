<script setup lang="ts">
import { onBeforeUpdate, onUpdated, ref } from 'vue'

let num = ref(1)
setTimeout(() => {
  num.value += 3
}, 2000)
onBeforeUpdate(() => {
  // 在 befoerUpdate 里设置值，不会重新触发 beforeUpdate 和 updated 生命周期
  // num.value = 100
  console.log('beforeUpdate', num.value)
})
onUpdated(() => {
  // 在 updated 里设置值，会重新触发 beforeUpdate 和 updated 生命周期
  num.value = 100
  console.log('updated', num.value)
})
</script>

<template>
  <div>数字: {{ num }}</div>
</template>

<style scoped>
</style>
