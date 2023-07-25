<template>
    <div>
        <form class="space-y-4 w-full m-4 p-10 md:space-y-6 flex flex-col" @submit.prevent="$emit('update', word)">
          <div>
              <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
              <input type="name"  name="name" id="name"
                  class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="name" required="" v-model="word.name">
          </div>
          <div>
              <label for="transcription"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Transcription</label>
              <input type="transcription"  name="transcription" id="transcription"
                  placeholder="[transcription]"
                  class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required="" v-model="word.transcription">
          </div>
          <div>
              <label for="translation"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Translation</label>
              <input type="translation"  name="translation" id="translation"
                  placeholder="translation"
                  class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required="" v-model="word.translation">
          </div>
          <div class="w-full flex">
          <button type="submit"
              class="w-2/5 mx-auto text-white bg-teal-700 hover:bg-teal-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
              Update
          </button>
          <button
              @click="$emit('close')"
              class="w-2/5 mx-auto text-white bg-gray-700 hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
              Cancel
          </button>
          </div>
      </form>
    </div>
</template>

<script setup>
import { defineProps } from 'vue';

const {word} = defineProps(['word']);
</script>