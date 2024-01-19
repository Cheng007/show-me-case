<script setup lang="ts">
import { routes } from './router'
import { useRouter } from 'vue-router'
const router = useRouter()
// router.replace(routes[0].path)
</script>

<template>
  <div class="wrap">
    <aside>
      <router-link tag="div" v-for="i of routes" :to="i.path">{{ i.name }}</router-link>
    </aside>
    <main>
      <router-view />
    </main>
  </div>
</template>

<style scoped>
aside {
  display: flex;
  justify-content: space-evenly;
  border-bottom: 1px solid red;
  padding: 10px 0;
  margin: 10px;
}
</style>
