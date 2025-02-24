<script setup>
import Other from './components/other.vue'
</script>

<template>
  <div class="page-scoped-deep">
    <h1>待添加，多次 deep 后样式穿透问题</h1>
    <other />
  </div>
</template>

<style scoped>
.page-scoped-deep {
  /deep/ .van-button {
    color: red;
  }
}
</style>
