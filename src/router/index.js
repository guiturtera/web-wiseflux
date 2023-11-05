import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue')
    },
    {
      path: '/cadastrar',
      name: 'signup',
      component: () => import('../views/SignupView.vue')
    },
    {
      path: '/perfil',
      name: 'profile',
      component: () => import('../views/ProfileView.vue')
    },
    {
      path: '/sensores',
      name: 'sensores',
      component: () => import('../views/SensorsView.vue')
    },
    {
      path: '/sensores/:sensorId',
      name: 'sensor',
      component: () => import('../views/SensorView.vue')
    }
  ]
})

export default router
