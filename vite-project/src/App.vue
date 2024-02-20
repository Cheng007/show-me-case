<script setup lang="ts">
import { routes } from './router'
import { useRouter } from 'vue-router'
const router = useRouter()
// router.replace(routes[0].path)
</script>

<template>
  <div class="wrap">
    <aside>
      <router-link
        custom
        v-slot="{ navigate, isActive }"
        v-for="i of routes" :to="i.path"
      >
        <div @click="navigate" :class="isActive ? 'active' : ''">{{ i.name }}</div>
      </router-link>
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
  flex-wrap: wrap;
  gap: 10px;
  border-bottom: 1px solid red;
  padding: 10px 0;
  margin: 10px;
  cursor: default;
  > .active {
    color: red;
  }
}
</style>
