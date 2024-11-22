<!-- ButtonSolve.vue -->
<script setup>
const emit = defineEmits(['checkSolution'])

function handleClick() {
  emit('checkSolution')
}
</script>

<template>
  <button
    @click="handleClick"
    class="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
  >
    Solve
  </button>
</template>
