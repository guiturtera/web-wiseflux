import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from "./store"
import { FontAwesomeIcon } from './plugins/font-awesome'

import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

import setupInterceptors from './services/setupInterceptors'

import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"

const app = createApp(App)

setupInterceptors(store)

app.use(router)
app.use(store)
app.use(VueSweetalert2);

app.component("font-awesome-icon", FontAwesomeIcon)

app.mount('#app')
