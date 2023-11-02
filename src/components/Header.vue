<script>
import { RouterLink } from 'vue-router'

export default {
  name: 'Header',
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
  },
  methods: {
    handleRegister() {
      this.$store.dispatch("auth/logout").then(() => this.$router.push('/'))
    },
  }
};
</script>


<template>
    <nav class="navbar navbar-expand-lg navbar-light bg-light w-100">
        <div class="container-fluid">
            <RouterLink to="/" class="nav-link active font-weight-bold">WiseFlux</RouterLink>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            </ul>
            <ul v-if="!currentUser" class="d-flex navbar-nav">
                <li class="nav-item">
                    <RouterLink to="/login" class="nav-link active">Login</RouterLink>
                </li>
                <li class="nav-item">
                    <RouterLink to="/cadastrar" class="nav-link active">Cadastrar</RouterLink>
                </li>
            </ul>
            <ul v-if="currentUser" class="d-flex navbar-nav">
                <li class="nav-item">
                    <RouterLink to="/perfil" class="nav-link active">Perfil</RouterLink>
                </li>
                <li class="nav-item">
                    <RouterLink to="/sensores" class="nav-link active">Sensores</RouterLink>
                </li>
                <li class="nav-item">
                    <a @click="handleRegister" class="nav-link active">Sair</a>
                </li>
            </ul>
            </div>
        </div>
    </nav>
</template>