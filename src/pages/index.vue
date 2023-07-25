<template>
  <main class="flex flex-col justify-center items-center py-16 px-4 mx-auto max-w-3xl pt-60">
    <h1 class="pb-20 text-6xl text-center text-gray-700 dark:text-gray-100 transition-colors">
      Choose what you want
    </h1>
    <div class="m-4">
      <router-link
        :to="{name: 'quiz', params: {type: 'eng-ua'}}"
        class="p-2 m-2 px-5 bg-teal-700 hover:bg-teal-800 rounded-lg border-2 border-teal-700 hover:border-teal-800"
      >
        Quiz eng-ua
      </router-link>
      <router-link
        :to="{name: 'quiz', params: {type: 'ua-eng'}}"
        class="p-2 m-2 px-5 bg-teal-700 hover:bg-teal-800 rounded-lg border-2 border-teal-700 hover:border-teal-800"
      >
        Quiz ua-eng
      </router-link>
    </div>
    <div class="m-4">
      <router-link
        :to="{name: 'testing', params: {type: 'ua-eng'}}"
        class="p-2 m-2 px-5 bg-teal-700 hover:bg-teal-800 rounded-lg border-2 border-teal-700 hover:border-teal-800"
      >
        Testing ua-eng
      </router-link>
      <router-link
        :to="{name: 'testing', params: {type: 'eng-ua'}}"
        class="p-2 m-2 px-5 bg-teal-700 hover:bg-teal-800 rounded-lg border-2 border-teal-700 hover:border-teal-800"
      >
        Testing eng-ua
      </router-link>
    </div>
    <div class="flex flex-col min-w-full text-white bg-indigo-1000 mt-10 px-6 py-8">
        <div v-for="(item, key)  in results.list"
            class="flex w-full bg-white rounded-lg mb-3 shadow dark:border md:mt-0 sm:max-w-6xl xl:p-3 dark:bg-gray-800 dark:border-gray-700">
            
            <p class="text-green-600">{{ item.correct }}</p>
            <p class="mx-1">/</p>
            <p class="text-red-600">{{ item.wrong }}</p>
            <p class="ml-auto text-gray-500">{{ (new Date(parseInt(key))).toLocaleDateString() }}</p>
            <router-link class="ml-3" :to="{name:'quiz-result', params:{hash:key}}">See result</router-link>
        </div>
    </div>
  </main>
</template>

<script setup>
import { onBeforeMount } from 'vue';
import { useWordStore } from '@/store/word';
import { storeToRefs } from 'pinia';
const wordStore = useWordStore();
const { results } = storeToRefs(wordStore);

onBeforeMount(async() => {
  await wordStore.fetchResults();
})
</script>

<style>
body {
  @apply dark:bg-gray-900 dark:text-gray-50;
}
</style>
