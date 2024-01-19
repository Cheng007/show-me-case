<script setup lang="ts">
const start = new Date().valueOf()
// 阻塞 500ms
while(new Date().valueOf() - start < 200) {}
console.log('重型组件渲染完毕')
</script>

<template>
  <div>模拟重型组件</div>
</template>

<style scoped>
div {
  height: 60vh;
  line-height: 60vh;
  color: #fff;
  background: olive;
}
</style>
