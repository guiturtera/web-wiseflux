<script>
import Header from './components/Header.vue'
import Login from './components/Login.vue'

import EventBus from "./common/EventBus";

export default {
  components: {
    Header, Login
  },
  methods: {
    logOut() {
      this.$store.dispatch('auth/logout');
      this.$router.push('/login');
    }
  },
  mounted() {
    EventBus.on("logout", () => {
      this.logOut();
    });

    EventBus.on("tokenExpired", () => {
      alert("Token expirado. Você deve logar novamente!")
      this.logOut();
    })
  },
  beforeDestroy() {
    EventBus.remove("logout");
  }
};
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
