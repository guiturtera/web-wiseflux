<script setup>
import { RouterLink } from 'vue-router'
</script>


<template>
    <nav class="navbar navbar-expand-lg navbar-light bg-light w-100">
        <div class="container-fluid">
            <a class="navbar-brand" href="#">WiseFlux</a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                <li class="nav-item">
                <RouterLink to="/" class="nav-link active">Home</RouterLink>
                </li>
                <li class="nav-item">
                <RouterLink to="/login" class="nav-link active">Login</RouterLink>
                </li>
                <li class="nav-item">
                <RouterLink to="/cadastrar" class="nav-link active">Cadastrar</RouterLink>
                </li>
                <!-- <li class="nav-item">
                <a class="nav-link disabled" href="#" tabindex="-1" aria-disabled="true">Disabled</a>
                </li> -->
            </ul>
            </div>
        </div>
    </nav>
</template>