<template>
  <main class="flex flex-col justify-center items-center py-16 px-4 mx-auto max-w-3xl pt-40">
    <!-- <h1 class="pb-20 text-6xl text-center text-gray-700 dark:text-gray-100 transition-colors">
      Start
    </h1> -->
    <div class="flex justify-center min-w-full h-36 bg-indigo-1000 px-6 ">
      <router-link
        :to="{name: 'quiz', params: {type: 'eng-ua'}}"
        class="p-2 m-2 px-5 w-60 flex justify-center flex-col text-center bg-teal-700 hover:bg-teal-800 rounded-lg border-2 border-teal-700 hover:border-teal-800"
      >
        <p class="text-center">Quiz</p>
        <p class="text-center">Eng-Ua</p>
      </router-link>
      <router-link
        :to="{name: 'quiz', params: {type: 'ua-eng'}}"
        class="p-2 m-2 px-5 bg-teal-700 w-60 flex justify-center flex-col hover:bg-teal-800 rounded-lg border-2 border-teal-700 hover:border-teal-800"
      >
        <p class="text-center">Quiz</p>
        <p class="text-center">Ua-Eng</p>
      </router-link>
    </div>
    <div class="flex justify-center min-w-full h-36 bg-indigo-1000 px-6 ">
      <router-link
        :to="{name: 'testing', params: {type: 'ua-eng'}}"
        class="p-2 m-2 px-5 w-60 flex justify-center flex-col bg-teal-700 hover:bg-teal-800 rounded-lg border-2 border-teal-700 hover:border-teal-800"
      >
        <p class="text-center">Testing</p>
        <p class="text-center">Ua-Eng</p>
      </router-link>
      <router-link
        :to="{name: 'testing', params: {type: 'eng-ua'}}"
        class="p-2 m-2 px-5 w-60 flex justify-center flex-col bg-teal-700 hover:bg-teal-800 rounded-lg border-2 border-teal-700 hover:border-teal-800"
      >
        <p class="text-center">Testing </p>
        <p class="text-center">Eng-Ua</p>
      </router-link>
    </div>
    <div class="flex flex-col min-w-full text-white bg-indigo-1000 mt-10 px-6 py-8">
        <p class="text-center mb-4 text-xl text-gray-700 dark:text-gray-100">Quiz results</p>
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
