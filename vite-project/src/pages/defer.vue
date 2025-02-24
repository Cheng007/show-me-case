<script setup lang="ts">
  import { ref, watch } from 'vue'
  import { useRoute, useRouter } from 'vue-router'

  import { useDefer } from '../util/useDefer';

  const route = useRoute()
  const router = useRouter()

  const defer = useDefer()
  const checked = ref(route.query.checked === undefined ? true : route.query.checked === '1')

  watch(checked,
    (newV) => {
      router.replace({
        path: route.path,
        query: {
          checked: newV ? '1' : '0'
        }
      })
      
      setTimeout(() => {
        location.reload()
      })
    }
  )

</script>

<template>
  <h1>使用 defer 优化白屏时间</h1>
  <div>
    <input type="checkbox" v-model="checked" />
    是否使用defer（点击后对比效果）
  </div>
  
  <div v-for="i of 10">
    <HeavyComp v-if="checked ? defer(i) : true" style="margin-bottom: 10px;" />
  </div>
</template>

<style scoped>
</style>
