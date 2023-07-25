<template>
    <div class="flex flex-col min-w-full min-h-screen text-white bg-indigo-1000 items-center justify-center px-6 py-8">
        <div
            class="flex flex-col w-full bg-white rounded-lg shadow dark:border md:mt-14 sm:max-w-6xl xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <h3 class="mt-4 text-5xl font-bold text-center">
                {{ result.correct }} / {{ result.wrong }}
            </h3>
            <div class="flex p-2 pb-6">
                <div class="flex justify-start items-center flex-col w-1/2">
                    <p class="text-xl font-bold">Correct</p>
                    <hr class=" bg-green-600 border-green-600 w-3/5 m-2 h-0.5">
                    <p class="p-1 text-l" v-for="word in result.correct_words">{{ word.name }} - {{ word.translation }}</p>
                </div>
                <div class="flex justify-start items-center flex-col w-1/2">
                    <p class="text-xl font-bold">Wrong</p>
                    <hr class=" bg-red-600 border-red-600 w-3/5 m-2 h-0.5">
                    <p class="p-1 text-l" v-for="word in result.wrong_words">{{ word.name }} - {{ word.translation }}</p>
                </div>
            </div>
            <p class="text-center text-gray-500">Date: {{ (new Date(parseInt(route.params.hash))).toLocaleDateString() }}</p>
        </div>
    </div>
</template>
  
<script setup>
import { onBeforeMount, ref } from 'vue';
import { useWordStore } from '@/store/word';
import { storeToRefs } from 'pinia';
import { useRoute } from 'vue-router';

const wordStore = useWordStore();
const route = useRoute();


const { result } = storeToRefs(wordStore);


async function fetchResult() {
    await wordStore.fetchResult(route.params.hash)
}

onBeforeMount(async () => {
    await fetchResult();
});
</script>
  