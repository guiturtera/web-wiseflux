<script setup>
import { RouterLink, RouterView } from 'vue-router'
import Header from './components/Header.vue'
import HelloWorld from './components/HelloWorld.vue'
import Login from './components/Login.vue'
</script>

<template>
  <header class="w-100">
    <Header />
  </header>
  <!-- <header>
    <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="125" height="125" />

    <div class="wrapper">
      <HelloWorld msg="Bem vindo ao WiseFlux!" />

      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
      </nav>
    </div>
  </header> -->
  <nav class="w-75">
    <RouterView />
  </nav>

</template>

<style scoped>

</style>
