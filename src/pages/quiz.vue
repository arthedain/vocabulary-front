<template>
    <div class="flex flex-col min-w-full min-h-screen text-white bg-indigo-1000 items-center justify-center px-6 py-8">
        <div
            class="flex relative flex-col w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-3xl xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <h3 class="mt-10 text-3xl font-bold text-center">
                <!-- {{ questionWord.name + ' ' + questionWord.transcription ?? '' }} -->

                {{ type === 'eng-ua' ? questionWord.name : questionWord.translation }}
            </h3>
            <p class="absolute p-3 right-0 text-gray-400">{{ questionNumber }}/{{ limit }}</p>
            <form action="" class=" flex flex-wrap justify-center self-center content-start mt-20 mb-20">
                <Radio v-for="word in list" :key="word.id" :name="type === 'eng-ua' ? word.translation : word.name" :value="word.id" :answer="answer"
                    @click="answer = word.id" />
            </form>
            <button
                class="mt-5 mb-5 w-1/6 border-2 self-center border-teal-700 text-white bg-teal-700 hover:bg-teal-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                @click="refresh">
                Next
            </button>
        </div>
    </div>
</template>
  
<script setup>
import { onMounted, ref } from 'vue';
import Radio from '@/pages/form/radio.vue';
import { useWordStore } from '@/store/word';
import { storeToRefs } from 'pinia';
import { useRouter, useRoute } from 'vue-router';

const wordStore = useWordStore();
const router = useRouter();
const route = useRoute();

const questionWord = ref({});
const answer = ref(0);
const tryHash = ref(Date.now());
const limit = ref(20);
const questionNumber = ref(0);
const type = ref('');

const { list } = storeToRefs(wordStore);

async function fetchRandom() {
    await wordStore.fetchRandomWords(4);
    questionNumber.value = questionNumber.value + 1;
}

function getRandom() {
    return list.value[Math.floor(Math.random() * list.value.length)];
}

function setRandomWord() {
    questionWord.value = getRandom();
}

async function refresh() {
    if (answer.value !== 0) {
        await saveAnswer(questionWord.value.id, answer.value, tryHash.value);
        if (questionNumber.value < limit.value) {
            await fetchRandom();
            setRandomWord();
        } else {
            router.push({name: 'quiz-result', params: {hash: tryHash.value}})
        }
        answer.value = 0;
    }
}

async function saveAnswer(questionId, answerId, hash) {
    await wordStore.saveQuizAnswer(questionId, answerId, hash);
}

onMounted(async () => {
    await fetchRandom();
    setRandomWord();
    type.value = route.params.type;
});
</script>
  