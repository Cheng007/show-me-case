<template>
  <div>
    <button @click="add">count + 1</button>
    <div>count: {{ count }}</div>
  </div>
</template>
<script>
export default {
  name: 'LifeCase',
  data() {
    return {
      count: 0,
    }
  },
  methods: {
    add() {
      this.count += 1
    }
  },
  beforeUpdate() {
    console.log('beforeUpdate')
    // 在 befoerUpdate 里设置值，不会重新触发 beforeUpdate 和 updated 生命周期
    // this.count = 100
  },
  updated() {
    console.log('udated')
    // 在 updated 里设置值，会重新触发 beforeUpdate 和 updated 生命周期
    this.count = 100
  },
}
</script>