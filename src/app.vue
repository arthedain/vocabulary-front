<template>
  <header class="flex absolute items-center p-4 dark:bg-gray-800 dark:border-gray-700 w-full h-20">
    <router-link class="m-2" :to="{name:'index'}">Home</router-link>
    <div class="flex w-full" v-if="isAuth">
      <router-link class="m-1" :to="{name:'vocabulary'}">Vocabulary</router-link>
      <router-link class="m-1" :to="{name:'user'}">Users</router-link>
      <div class="ml-auto flex">
        <p class="m-1 text-gray-500">{{ user.name }}</p>
        <p class="m-1 cursor-pointer" @click="logout">Logout</p>
      </div>
    </div>
    <div class="ml-auto" v-if="!isAuth">
      <router-link class="" :to="{name:'login'}">Sign in</router-link>
      <span class="m-1">/</span>
      <router-link class="" :to="{name:'registration'}">Sign up</router-link>
    </div>


  </header>
  <router-view class="dark"/>
</template>

<script setup>
import { onMounted, ref, watch   } from 'vue';
import { initTheme } from '@/composables/theme';
import { useAuthStore } from './store/auth';
import { storeToRefs } from 'pinia';
import { useRouter } from 'vue-router';

const authStore = useAuthStore();
const {user, token} = storeToRefs(authStore);
const isAuth = ref(false);
const router = useRouter();

function logout() {
  authStore.logout();
  router.go({name: 'login'});
}

onMounted(async () => {
  initTheme();

  isAuth.value = authStore.isAuth();

  await authStore.getUser();
});

watch(token, async () => {
  isAuth.value = authStore.isAuth();
  await authStore.getUser();
})
</script>