<script>
import EventBus from "../common/EventBus";
import TokenService from "../services/token.service";
import Notification from "../components/Notification.vue"

export default {
  name: 'Header',
  components: {
    Notification
  },
  computed: {
    currentUser() {
      return TokenService.getUser(this.$store);
    },
  },
  methods: {
    handleRegister() {
      EventBus.dispatch('logout')
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
            <ul v-if="currentUser" class="d-flex navbar-nav ">
                <li class="nav-item mx-2 my-auto">
                  <Notification class="nav-link active" />
                </li>
                <li class="nav-item mx-2">
                    <RouterLink to="/perfil" class="nav-link active">Perfil</RouterLink>
                </li>
                <li class="nav-item mx-2">
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
