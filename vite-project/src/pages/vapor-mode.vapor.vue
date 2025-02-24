<template>
  <h1>Vapor Mode</h1>
  <p>还在实验阶段，这里的例子并非实际的 Vapor Modes</p>
  <div v-for="i of Array.from('hello world')">
    <div>{{ i }}</div>
  </div>
</template>