<template>
  <div class="flex flex-col min-w-full min-h-screen text-white bg-indigo-1000">
    <h3 class=" mt-10 text-center">
      <!--      {{ questionWord.name + ' ' + questionWord.transcription ?? '' }}-->
      {{ questionWord.name ?? '' }}
    </h3>
    <form
      action=""
      class=" flex flex-wrap justify-center content-start mt-20"
    >
      <Radio
        v-for="word in list"
        :key="word.id"
        :name="word.translation"
        :value="word.id"
        :answer="answer"
        @click="checkAnswer(word.id)"
      />
    </form>
    <button
      class="mt-6 rounded border-2 border-teal-700"
      @click="refresh"
    >
      Refresh
    </button>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import Radio from '@/pages/form/radio.vue';
import { useWordStore } from '@/store/word';
import { storeToRefs } from 'pinia';

const wordStore = useWordStore();

const questionWord = ref({});
const answer = ref(0);

const { list } = storeToRefs(wordStore);

async function fetchRandom() {
  await wordStore.fetchRandomWords();
}

function getRandom() {
  return list.value[Math.floor(Math.random() * list.value.length)];
}

function checkAnswer(id) {
  if (parseInt(questionWord.value.id, 10) === parseInt(id, 10)) {
    answer.value = parseInt(id, 10);
  } else {
    answer.value = questionWord.value.id;
  }
}

function setRandomWord() {
  questionWord.value = getRandom();
}

async function refresh() {
  await fetchRandom();
  setRandomWord();
  answer.value = 0;
}

onMounted(async () => {
  await fetchRandom();
  setRandomWord();
});
</script>
