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

// case2
// const doubleCount1 = computed(() => props.count * 2)

// case 3
// const doubleCount = ref(0)
// watchEffect(() => {
//  doubleCount.value = props.count * 2
// })

// case 4
// const useDouble = (count) => {
//   const doubleCount = ref(count * 2)
//   watchEffect(() => {
//     console.log('run?')
//     doubleCount.value = count * 2
//   })
//   return doubleCount
// }
// const doubleCount = useDouble(props.count)

// case 5
// const useDouble = (props, key) => {
//   const doubleCount = ref(props[key] * 2)
//   watchEffect(() => {
//     console.log('run?')
//     doubleCount.value = props[key] * 2
//   })
//   return doubleCount
// }
// const doubleCount = useDouble(props, 'key')


</script>

<template>
  <div>
    <h1>Reactive</h1>
    <div>props count: {{ props.count }}</div>
    <div>doubleCount: {{ doubleCount }}</div>
  </div>
</template>
