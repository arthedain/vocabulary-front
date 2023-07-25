import { createApp } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';
import '@/assets/styles/fonts.css';
import '@/assets/styles/main.css';
import '@/assets/styles/tailwind.css';
import '@/assets/styles/toastification.css';
import App from '@/app.vue';
import { routes } from '@/routes.js';
import { createPinia } from 'pinia';
import { vue3Debounce } from 'vue-debounce'
import Toast from "vue-toastification";

const pinia = createPinia();

const router = createRouter({
  history: createWebHistory(import.meta.env.VITE_BASE_PUBLIC_PATH),
  routes,
});

const app = createApp(App);
app.use(pinia);
app.use(router);
app.directive('debounce', vue3Debounce({ lock: true }))
app.use(Toast);
app.mount('#app');
