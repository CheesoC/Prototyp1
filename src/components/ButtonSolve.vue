<script setup>
import { ref } from 'vue'

const emit = defineEmits(['checkSolution'])
const isDisabled = ref(false)

function handleClick() {
  if (isDisabled.value) return

  isDisabled.value = true
  emit('checkSolution')

  setTimeout(() => {
    isDisabled.value = false
  }, 2000) // Adjust the debounce time as needed
}
</script>

<template>
  <button
    @click="handleClick"
    :disabled="isDisabled"
    class="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
  >
    Solve
  </button>
</template>
