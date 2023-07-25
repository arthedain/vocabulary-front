<template>
    <main class="flex flex-col justify-center items-center py-16 px-4 mx-auto max-w-5xl pt-36">
      <button class="p-2 w-2/5 m-2 mb-12 px-5 bg-teal-700 hover:bg-teal-800 rounded-lg border-2 border-teal-700 hover:border-teal-800" v-if="!showCreateForm" @click="showCreateForm = !showCreateForm">Add new</button>
      <form class="space-y-4 w-full m-4 p-10 md:space-y-6 flex flex-col" @submit.prevent="create()" v-if="showCreateForm">
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
                Create
            </button>
            <button @click="cancelCreateForm()"
                class="w-2/5 mx-auto text-white bg-gray-700 hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                Cancel
            </button>
          </div>
      </form>
      <div class="w-full px-6 py-4">
        <input name="search" id="search"
                  v-debounce:300="search"
                  placeholder="Search"
                  class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  >
      </div>
      <div class="flex flex-col min-w-full text-white bg-indigo-1000 px-6">
        <div v-for="(item, key)  in words.data" 
          class="w-full bg-white rounded-lg mb-3 text-center shadow dark:border md:mt-0 sm:max-w-6xl xl:p-3 dark:bg-gray-800 dark:border-gray-700">
          <div
              class="flex w-full text-center">
              <div class="flex w-5/6">
                <p class="text-white">{{ item.name }}</p>
                <p class="mx-1">-</p>
                <p class="text-white">{{ item.translation }}</p>
              </div>
              <div class="flex w-1/6 ml-auto">
                <span class="ml-3 text-teal-500 cursor-pointer" @click="showUpdateWordForm(item.id)">Update</span>
                <span class="ml-3 text-red-500 cursor-pointer" @click="deleteWord(item.id)">Delete</span>
              </div>
              
          </div>
          <updateWordForm @update="updateWord" @close="cancelUpdateForm" :word="word" v-if="showUpdateForm === item.id"></updateWordForm>  
        </div>
      </div>
      
      <div class="flex w-full px-10 justify-between">
        <span class=" cursor-pointer hover:text-teal-700" @click="prevPage()">Prev</span>
        <span>{{ page }}/{{ words.last_page }}</span>
        <span class=" cursor-pointer hover:text-teal-700" @click="nextPage()">Next</span>
      </div>
    </main>
  </template>
  
  <script setup>
  import { onBeforeMount, ref } from 'vue';
  import { useWordStore } from '@/store/word';
  import { storeToRefs } from 'pinia';
  import { useToast } from "vue-toastification";
  import updateWordForm from '@/pages/form/updateWordForm.vue';

  const wordStore = useWordStore();
  const { words } = storeToRefs(wordStore);
  const page = ref(1);
  const showCreateForm = ref(false);
  const showUpdateForm = ref(0);
  const word = ref({
    id: 0,
    name: '',
    transcription: '',
    translation: '',
  });
  const toast = useToast();

  async function nextPage() {
      page.value = page.value + 1;
      await wordStore.getAll(page.value);
  }
   
  async function prevPage() {
    if(page.value !== 1) {
      page.value = page.value - 1;
      await wordStore.getAll(page.value);
    }
  }

  async function search(search) {
    await wordStore.getAll(1, search);
  }

  async function create() {
    await wordStore.create(word.value);

    toast.success(`Word successfully created`);

    setTimeout(async () => {
      await wordStore.getAll(1);
    }, 2000)
  }

  function cancelCreateForm() {
    showCreateForm.value = !showCreateForm.value;
    word.value = {
      id: 0,
      name: '',
      transcription: '',
      translation: '',
    }
  }

  function cancelUpdateForm() {
    showUpdateForm.value = !showUpdateForm.value;
    word.value = {
      id: 0,
      name: '',
      transcription: '',
      translation: '',
    }
  }

  function showUpdateWordForm(id) {
    const updatedWord = words.value.data.filter(item => item.id === id);

    if(updatedWord.length) {
      word.value = {
        id: id,
        name: updatedWord[0].name,
        transcription: updatedWord[0].transcription,
        translation: updatedWord[0].translation,
      };
    }

    showUpdateForm.value = id;
  }

  async function updateWord(data) {
    await wordStore.update(data.id, data);
    word.value = {
      id: 0,
      name: '',
      transcription: '',
      translation: '',
    }
    showUpdateForm.value = 0;
    toast.success(`Word successfully updated`);
    setTimeout(async () => {
      await wordStore.getAll(page.value);
    }, 2000)
  }

  async function deleteWord(id) {
    await wordStore.delete(id);

    toast.success(`Word successfully removed`);

    setTimeout(async () => {
      await wordStore.getAll(page.value);
    }, 2000)
  }

  onBeforeMount(async() => {
    await wordStore.getAll(page.value);
  })
  </script>
  