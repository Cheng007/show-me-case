<template>
  <div id="app">
    <LifeCase />
    <CompositionCase />
  </div>
</template>

<script>
import LifeCase from './components/LifeCase.vue'
import CompositionCase from './components/CompositionCase.vue'

export default {
  name: 'App',
  components: {
    LifeCase,
    CompositionCase
  },
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
