<template>
    <main class="flex flex-col justify-center items-center py-16 px-4 mx-auto max-w-5xl pt-36">
      <button class="p-2 w-2/5 m-2 mb-12 px-5 bg-teal-700 hover:bg-teal-800 rounded-lg border-2 border-teal-700 hover:border-teal-800" v-if="!showCreateForm" @click="showCreateForm = !showCreateForm">Add new</button>
      <form class="space-y-4 w-full m-4 p-10 md:space-y-6 flex flex-col" @submit.prevent="create()" v-if="showCreateForm">
          <div>
              <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
              <input type="name"  name="name" id="name"
                  class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="name" required="" v-model="user.name">
          </div>
          <div>
              <label for="email"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
              <input type="email"  name="email" id="email"
                  placeholder="user@example.com"
                  class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required="" v-model="user.email">
          </div>
          <div>
              <label for="password"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
              <input type="password"  name="password" id="password"
                  placeholder="**********"
                  class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required="" v-model="user.password">
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
        <div v-for="(item, key)  in users.data" 
          class="w-full bg-white rounded-lg mb-3 text-center shadow dark:border md:mt-0 sm:max-w-6xl xl:p-3 dark:bg-gray-800 dark:border-gray-700">
          <div
              class="flex w-full text-center">
              <div class="flex w-5/6">
                <p class="text-white">{{ item.name }}</p>
                <p class="mx-1">-</p>
                <p class="text-white">{{ item.email }}</p>
              </div>
              <div class="flex w-1/6 ml-auto">
                <span class="ml-3 text-teal-500 cursor-pointer" @click="showUpdateUserForm(item.id)">Update</span>
                <span class="ml-3 text-red-500 cursor-pointer" @click="deleteUser(item.id)">Delete</span>
              </div>
              
          </div>
          <updateUserForm @update="updateUser" @close="cancelUpdateForm" :user="user" v-if="showUpdateForm === item.id"></updateUserForm>  
        </div>
      </div>
      
      <div class="flex w-full px-10 justify-between">
        <span class=" cursor-pointer hover:text-teal-700" @click="prevPage()">Prev</span>
        <span>{{ page }}/{{ users.last_page }}</span>
        <span class=" cursor-pointer hover:text-teal-700" @click="nextPage()">Next</span>
      </div>
    </main>
  </template>
  
  <script setup>
  import { onBeforeMount, ref } from 'vue';
  import { storeToRefs } from 'pinia';
  import { useToast } from "vue-toastification";
  import { useUserStore } from '@/store/user';
  import updateUserForm from '@/pages/form/updateUserForm.vue';

  const userStore = useUserStore();``
  const { users } = storeToRefs(userStore);
  const page = ref(1);
  const showCreateForm = ref(false);
  const showUpdateForm = ref(0);
  const user = ref({
    id: 0,
    name: '',
    email: '',
    password: '',
  });
  const toast = useToast();

  async function nextPage() {
      page.value = page.value + 1;
      await userStore.all(page.value);
  }
   
  async function prevPage() {
    if(page.value !== 1) {
      page.value = page.value - 1;
      await userStore.all(page.value);
    }
  }

  async function search(search) {
    await userStore.all(1, search);
  }

  async function create() {
    await userStore.create(user.value);

    toast.success(`User successfully created`);

    this.cancelCreateForm();

    setTimeout(async () => {
      await userStore.all(1);
    }, 2000)
  }

  function cancelCreateForm() {
    showCreateForm.value = !showCreateForm.value;
    user.value = {
      id: 0,
      name: '',
      email: '',
      password: '',
    }
  }

  function cancelUpdateForm() {
    showUpdateForm.value = !showUpdateForm.value;
    user.value = {
      id: 0,
      name: '',
      email: '',
      password: '',
    }
  }

  function showUpdateUserForm(id) {
    const updatedUser = users.value.data.filter(item => item.id === id);

    if(updatedUser.length) {
      user.value = {
        id: id,
        name: updatedUser[0].name,
        email: updatedUser[0].email,
      };
    }

    showUpdateForm.value = id;
  }

  async function updateUser(data) {
    await userStore.update(data.id, data);
    user.value = {
      id: 0,
      name: '',
      email: '',
      password: '',
    }
    showUpdateForm.value = 0;
    toast.success(`User successfully updated`);
    setTimeout(async () => {
      await userStore.all(page.value);
    }, 2000)
  }

  async function deleteUser(id) {
    await userStore.delete(id);

    toast.success(`User successfully removed`);

    setTimeout(async () => {
      await userStore.all(page.value);
    }, 2000)
  }

  onBeforeMount(async() => {
    await userStore.all(page.value);
  })
  </script>
  