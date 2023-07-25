<template>
    <div class="flex flex-col min-w-full min-h-screen text-white bg-indigo-1000 items-center justify-center px-6 py-8">
        <div
            class="flex relative flex-col w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-3xl xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <h3 class="mt-10 text-3xl font-bold text-center">
                {{ type === 'eng-ua' ? questionWord.name : questionWord.translation }}
            </h3>
            <p v-if="showTranslation" class="text-center absolute w-full text-gray-400">{{ type === 'eng-ua' ? questionWord.translation : questionWord.name }}</p>
            <p @click="showTranslation = !showTranslation" v-if="!showTranslation" class="text-center absolute right-0 m-2 cursor-pointer text-gray-400">
                <svg style="color: #9ca3af;" class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 14">
                <g stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2">
                <path d="M10 10a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"/>
                <path d="M10 13c4.97 0 9-2.686 9-6s-4.03-6-9-6-9 2.686-9 6 4.03 6 9 6Z"/>
                </g>
                </svg>
            </p>
            <p @click="showTranslation = !showTranslation" v-if="showTranslation" class="text-center absolute right-0 m-2 cursor-pointer text-gray-400">
                <svg style="color: #9ca3af;" class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 18">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1.933 10.909A4.357 4.357 0 0 1 1 9c0-1 4-6 9-6m7.6 3.8A5.068 5.068 0 0 1 19 9c0 1-3 6-9 6-.314 0-.62-.014-.918-.04M2 17 18 1m-5 8a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"/>
                </svg>
            </p>
            <form action="" class=" flex flex-wrap w-10/12 justify-center self-center content-start mt-16 mb-20">
                <input type="text" id="answer" name="answer" placeholder="Answer" v-model="answer" required=""
                    :class="[answerCheck == 'full' ? 'border-green-600 ' : answerCheck == 'half' ? 'border-yellow-400' : answerCheck == 'none' ? 'border-red-400' : 'border-gray-800' , 'border text-gray-900 sm:text-sm rounded-lg  block w-full p-2.5 dark:bg-gray-700 dark:placeholder-gray-400 dark:text-white']" />
            </form>
            <div class="w-full flex justify-center">
                <button
                    class="mt-5 mb-5 w-1/6 mx-4 border-2 self-center border-teal-700 text-white bg-teal-700 hover:bg-teal-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                    @click="check">
                    Check
                </button>
                <button
                    class="mt-5 mb-5 w-1/6 mx-4 text-white bg-gray-700 hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                    @click="refresh">
                    Refresh
                </button>
            </div>
        </div>
    </div>
</template>
  
<script setup>
import { onMounted, ref } from 'vue';
import { useWordStore } from '@/store/word';
import { storeToRefs } from 'pinia';
import { useRoute } from 'vue-router';

const wordStore = useWordStore();
const route = useRoute();

const questionWord = ref({});
const answer = ref('');
const answerCheck = ref('');
const type = ref('');
const showTranslation = ref(false);

const { list } = storeToRefs(wordStore);

async function fetchRandom() {
    await wordStore.fetchRandomWords(1);
}


function setWord() {
    questionWord.value = list.value[0];
}

async function refresh() {
    await fetchRandom();
    setWord();
    answer.value = '';
    answerCheck.value = '';
}

function check() {
    console.log(answer.value);
    if(answer.value != '') {
        if(type.value === 'eng-ua') {
            const data = questionWord.value.translation.split(',');
            const fullAnswer = data.filter(item => {
                return item == answer.value
            })
            console.log(data);
            if(fullAnswer.length) {
                answerCheck.value = 'full';
            } else {
                const halfAnswer = data.filter(item => {
                    return item.includes(answer.value);
                })

                if(halfAnswer.length) {
                    answerCheck.value = 'half';
                } else {
                    answerCheck.value = 'none';
                }
            }
        }

        if(type.value === 'ua-eng') {
            const data = questionWord.value.name;

            if(data == answer.value) {
                answerCheck.value = 'full';
            } else if(data.includes(answer.value)) {
                answerCheck.value = 'half';
            } else {
                answerCheck.value = 'none';
            }
        }
    }
}

onMounted(async () => {
    await fetchRandom();
    setWord();
    type.value = route.params.type;
});
</script>
  