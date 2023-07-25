<template>
  <div class="flex justify-center items-center p-4 mt-4 mb-8 w-1/2 h-8">
    <input
      :id="'radio-'+props.value"
      type="radio"
      name="answer"
      :value="props.value"
      class="hidden m-2 checked:bg-teal-700"
    >
    <label
      :for="'radio-'+props.value"
      :class="['p-2 rounded border-2 border-teal-700 cursor-pointer', parseInt(props.answer) === parseInt(props.value) ? 'bg-teal-700' : '']"
    >{{ props.name }}</label>
  </div>
</template>

<script setup>
import { defineProps } from 'vue';

const props = defineProps(['name', 'value', 'answer']);
</script>
