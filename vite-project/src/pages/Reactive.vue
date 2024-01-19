<script setup lang="ts">
import { ref } from 'vue'
import Reactive from '../components/Reactive.vue'

let count = ref(1)
const onClick = () => {
  count.value += 1
}
</script>

<template>
  响应式demo
  <button @click="onClick">Count 加 1</button>
  <Reactive :count="count" />
</template>

<style scoped>
</style>
