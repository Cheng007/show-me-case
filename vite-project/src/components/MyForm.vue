<script setup lang="ts">
const getName = () => {
  return 'name'
}
const setName = (name: string) => {
  console.log('name', name)
}
defineExpose({
  getName,
  setName
})
</script>

<template>
  <div>My Form</div>
</template>