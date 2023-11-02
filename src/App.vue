<script setup>
import { RouterView } from 'vue-router'
import Header from './components/Header.vue'
import Login from './components/Login.vue'
</script>

<template>
  <div id='app_div'>
    <header class="w-100">
      <Header />
    </header>
    <nav class="w-75">
      <RouterView />
    </nav>
  </div>

</template>

<style scoped>

#app_div {
  height: 100vh; /* Set the height to 100% of the viewport height */
  width: 100%;

  display: flex;
  flex-direction: column;
  align-items: flex-start; /* Align items at the top within #app */
  align-items: center;
  gap: 5vh;
}
</style>
