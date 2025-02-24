<script setup lang="ts">
import { onMounted } from 'vue'
import MyForm from '../components/MyForm.vue';
import { useCompRef } from '../util/useCompRef';


const formRef = useCompRef(MyForm)
// 等价于下面
// const formRef = ref<InstanceType<typeof MyForm>>()

onMounted(() => {
  formRef.value?.getName()
})
</script>

<template>
  <h1>拿到组建实例的TS类型</h1>
</template>

<style scoped>
</style>
