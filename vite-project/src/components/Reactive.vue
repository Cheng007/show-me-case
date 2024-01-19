<script setup lang="ts">
import { ref, computed, watchEffect } from 'vue'
const props = defineProps({
  count:  {
    type: Number,
    required: true
  }
})

console.log('props:', props)

// case1
const doubleCount = ref(props.count * 2)
// 不变

// case2
// const doubleCount = computed(() => props.count * 2)
// 会变

// case 3
// const doubleCount = ref(0)
// watchEffect(() => {
//  doubleCount.value = props.count * 2
// })
// 会变

// case 4
// const useDouble = (count: number) => {
//   console.log('1count', count)
//   const doubleCount = ref(count * 2)
//   watchEffect(() => {
//     console.log('run?')
//     doubleCount.value = count * 2
//   })
//   return doubleCount
// }
// const doubleCount = useDouble(props.count)
// 不变

// case 5
// const useDouble = (props, key) => {
//   const doubleCount = ref(props[key] * 2)
//   watchEffect(() => {
//     console.log('run?')
//     doubleCount.value = props[key] * 2
//   })
//   return doubleCount
// }
// const doubleCount = useDouble(props, 'count')
// 会变


</script>

<template>
  <div>
    <h1>Reactive</h1>
    <div>props count: {{ props.count }}</div>
    <div>doubleCount: {{ doubleCount }}</div>
    <p>响应式本质：函数和数据进行关联</p>
    <p>vue3里的函数包括：render, computed, watchEffect, watch 等</p>
    <p>数据为：相应式数据且必须在函数中用到</p>
  </div>
</template>
